class ProgrammingTutor {
  constructor() {
    this.currentExercise = null;
    this.currentExerciseIndex = 0;
    this.solvedExercises = new Set();
    this.isChecking = false;
    this.init();
  }

  init() {
    this.renderExerciseList();
    this.loadExercise(0);
    this.bindEvents();
  }

  bindEvents() {
    document.getElementById("checkBtn").addEventListener("click", () => {
      this.checkCode();
    });

    document.getElementById("hintBtn").addEventListener("click", () => {
      this.showHint();
    });

    document.getElementById("clearBtn").addEventListener("click", () => {
      document.getElementById("codeInput").value =
        this.currentExercise.starterCode || "";
      this.hideResult();
    });

    document.getElementById("codeInput").addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        this.checkCode();
      }
      if (e.key === "Tab") {
        e.preventDefault();
        const textarea = e.target;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        textarea.value =
          textarea.value.substring(0, start) +
          "  " +
          textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }
    });
  }

  renderExerciseList() {
    const list = document.getElementById("exerciseList");
    list.innerHTML = "";

    EXERCISES.forEach((exercise, index) => {
      const item = document.createElement("div");
      item.className = "exercise-item";
      item.dataset.index = index;

      const solved = this.solvedExercises.has(exercise.id);
      item.innerHTML = `
        <span class="exercise-number">${exercise.id}</span>
        <div class="exercise-info">
          <div class="exercise-title">${exercise.title}</div>
          <div class="exercise-difficulty ${exercise.difficulty}">${this.difficultyLabel(exercise.difficulty)}</div>
        </div>
        ${solved ? '<span class="exercise-solved">&#10003;</span>' : ""}
      `;

      item.addEventListener("click", () => {
        this.loadExercise(index);
      });

      list.appendChild(item);
    });
  }

  difficultyLabel(d) {
    const labels = { beginner: "Начальный", intermediate: "Средний", advanced: "Продвинутый" };
    return labels[d] || d;
  }

  loadExercise(index) {
    this.currentExerciseIndex = index;
    this.currentExercise = EXERCISES[index];

    document.getElementById("exerciseTitle").textContent =
      this.currentExercise.title;
    document.getElementById("exerciseDescription").textContent =
      this.currentExercise.description;
    document.getElementById("exerciseDifficulty").textContent =
      this.difficultyLabel(this.currentExercise.difficulty);
    document.getElementById("exerciseDifficulty").className =
      "exercise-difficulty " + this.currentExercise.difficulty;

    document.getElementById("codeInput").value =
      this.currentExercise.starterCode || "";
    this.hideResult();

    document.querySelectorAll(".exercise-item").forEach((item, i) => {
      item.classList.toggle("active", i === index);
    });
  }

  async checkCode() {
    if (this.isChecking) return;

    const code = document.getElementById("codeInput").value.trim();
    if (!code) {
      this.showResult("error", "Введите код для проверки.");
      return;
    }

    this.isChecking = true;
    const btn = document.getElementById("checkBtn");
    const originalText = btn.textContent;
    btn.textContent = "Проверяю...";
    btn.disabled = true;

    try {
      const result = await aiService.checkCode(code, this.currentExercise);

      if (result.correct) {
        this.solvedExercises.add(this.currentExercise.id);
        this.renderExerciseList();
        this.showResult("success", result.message);

        const nextIndex = this.currentExerciseIndex + 1;
        if (nextIndex < EXERCISES.length) {
          setTimeout(() => {
            if (confirm("Задача решена! Перейти к следующей?")) {
              this.loadExercise(nextIndex);
            }
          }, 500);
        } else {
          this.showResult(
            "success",
            result.message + "\n\nВы решили все задачи! Поздравляем!"
          );
        }
      } else {
        let message = result.message;
        if (result.hint) {
          message += "\n\nПодсказка: " + result.hint;
        }
        this.showResult("error", message);
      }
    } catch (error) {
      this.showResult(
        "error",
        "Произошла ошибка при проверке. Попробуйте ещё раз.\n" + error.message
      );
    } finally {
      this.isChecking = false;
      btn.textContent = originalText;
      btn.disabled = false;
    }
  }

  showHint() {
    if (!this.currentExercise.hints || this.currentExercise.hints.length === 0) {
      this.showResult("info", "Подсказки пока недоступны для этой задачи.");
      return;
    }

    const hints = this.currentExercise.hints;
    const randomHint = hints[Math.floor(Math.random() * hints.length)];
    this.showResult("info", "Подсказка: " + randomHint);
  }

  showResult(type, message) {
    const resultEl = document.getElementById("result");
    resultEl.className = `result ${type}`;
    resultEl.textContent = message;
    resultEl.style.display = "block";

    resultEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  hideResult() {
    document.getElementById("result").style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.tutor = new ProgrammingTutor();
});
