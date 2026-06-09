const App = (() => {
  let currentTaskIndex = 0;
  let isChecking = false;

  const el = {
    title: document.getElementById('task-title'),
    difficulty: document.getElementById('task-difficulty'),
    description: document.getElementById('task-description'),
    example: document.getElementById('task-example'),
    codeInput: document.getElementById('code-input'),
    submitBtn: document.getElementById('submit-btn'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    taskCounter: document.getElementById('task-counter'),
    resultPanel: document.getElementById('result-panel'),
    resultContent: document.getElementById('result-content'),
    loadingOverlay: document.getElementById('loading-overlay'),
    testsSummary: document.getElementById('tests-summary'),
    clearBtn: document.getElementById('clear-btn'),
    resetBtn: document.getElementById('reset-btn'),
    apiKeyModal: document.getElementById('api-key-modal'),
    apiKeyInput: document.getElementById('api-key-input'),
    apiKeySaveBtn: document.getElementById('api-key-save')
  };

  function checkApiKey() {
    if (!CONFIG.OPENROUTER_API_KEY) {
      el.apiKeyModal.classList.remove('hidden');
      return false;
    }
    return true;
  }

  function loadTask(index) {
    const task = TASKS[index];
    if (!task) return;

    el.title.textContent = task.title;
    el.difficulty.textContent = task.difficulty;
    el.difficulty.className = `difficulty ${task.difficulty}`;
    el.description.innerHTML = task.description;
    el.example.textContent = task.example;
    el.codeInput.value = task.starterCode;
    el.taskCounter.textContent = `Задача ${index + 1} из ${TASKS.length}`;
    el.resultPanel.classList.add('hidden');
    el.submitBtn.disabled = false;
    el.submitBtn.textContent = 'Проверить';
    el.submitBtn.className = 'btn btn-primary';

    el.prevBtn.disabled = index === 0;
    el.nextBtn.disabled = index === TASKS.length - 1;

    autoResize();
  }

  function autoResize() {
    el.codeInput.style.height = 'auto';
    el.codeInput.style.height = el.codeInput.scrollHeight + 'px';
  }

  async function handleSubmit() {
    if (!checkApiKey()) return;

    const code = el.codeInput.value.trim();
    if (!code) {
      showResult('warning', 'Пожалуйста, напишите код перед проверкой.');
      return;
    }

    const syntaxError = AI.validateCode(code);
    if (syntaxError) {
      showResult('error', syntaxError);
      return;
    }

    isChecking = true;
    el.loadingOverlay.classList.remove('hidden');
    el.submitBtn.disabled = true;
    el.submitBtn.textContent = 'Проверяем...';

    try {
      const task = TASKS[currentTaskIndex];
      const result = await AI.checkSolution(task, code);
      displayResults(result);
    } catch (err) {
      showResult('error', `Ошибка при проверке: ${err.message}`);
    } finally {
      isChecking = false;
      el.loadingOverlay.classList.add('hidden');
      el.submitBtn.disabled = false;
      el.submitBtn.textContent = 'Проверить';
    }
  }

  function displayResults(result) {
    const allPassed = result.passed;

    let html = '<div class="tests-grid">';
    result.testResults.forEach((r, i) => {
      const icon = r.passed ? '+' : 'x';
      const inputStr = Array.isArray(r.input)
        ? r.input.map(v => JSON.stringify(v)).join(', ')
        : r.input;
      html += `
        <div class="test-row ${r.passed ? 'pass' : 'fail'}">
          <span class="test-icon">${icon}</span>
          <span class="test-desc">Тест ${i + 1}: (${inputStr}) = ${JSON.stringify(r.expected)}</span>
          <span class="test-result ${r.passed ? 'pass' : 'fail'}">
            ${r.passed ? 'OK' : 'Получено: ' + JSON.stringify(r.actual)}
          </span>
        </div>`;
    });
    html += '</div>';

    el.testsSummary.innerHTML = html;
    el.resultContent.innerHTML = marked.parse(result.feedback);
    el.resultPanel.classList.remove('hidden');

    el.submitBtn.textContent = allPassed ? 'Всё верно!' : 'Есть ошибки';
    el.submitBtn.className = allPassed ? 'btn btn-success' : 'btn btn-danger';
  }

  function showResult(type, message) {
    el.testsSummary.innerHTML = '';
    const cls = type === 'error' ? 'feedback-error' : 'feedback-warning';
    el.resultContent.innerHTML = `<div class="${cls}">${message}</div>`;
    el.resultPanel.classList.remove('hidden');
  }

  function navigate(delta) {
    const next = currentTaskIndex + delta;
    if (next >= 0 && next < TASKS.length) {
      currentTaskIndex = next;
      loadTask(currentTaskIndex);
    }
  }

  function init() {
    loadTask(0);

    el.submitBtn.addEventListener('click', handleSubmit);
    el.prevBtn.addEventListener('click', () => navigate(-1));
    el.nextBtn.addEventListener('click', () => navigate(1));
    el.codeInput.addEventListener('input', autoResize);

    el.clearBtn.addEventListener('click', () => {
      loadTask(currentTaskIndex);
    });

    el.resetBtn.addEventListener('click', () => {
      currentTaskIndex = 0;
      loadTask(0);
    });

    el.apiKeySaveBtn.addEventListener('click', () => {
      const key = el.apiKeyInput.value.trim();
      if (key) {
        CONFIG.OPENROUTER_API_KEY = key;
        el.apiKeyModal.classList.add('hidden');
      }
    });

    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!isChecking) handleSubmit();
      }
    });
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => App.init());
