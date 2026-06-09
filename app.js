class ProgrammingTutor {
  constructor() {
    this.currentExercise = null;
    this.currentExerciseIndex = 0;
    this.solvedExercises = new Set();
    this.isChecking = false;
    this.hintIndex = {};
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

    document.getElementById("grandma").addEventListener("click", () => {
      this.grandmaHint();
    });

    document.getElementById("codeInput").addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        this.checkCode();
      }
      if (e.key === "Tab") {
        e.preventDefault();
        const ta = e.target;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        ta.value =
          ta.value.substring(0, start) + "    " + ta.value.substring(end);
        ta.selectionStart = ta.selectionEnd = start + 4;
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
          <div class="exercise-difficulty ${exercise.difficulty}">${this.diffLabel(exercise.difficulty)}</div>
        </div>
        ${solved ? '<span class="exercise-solved">&#10003;</span>' : ""}
      `;

      item.addEventListener("click", () => this.loadExercise(index));
      list.appendChild(item);
    });

    this.updateProgress();
  }

  diffLabel(d) {
    const m = { beginner: "Начальный", intermediate: "Средний", advanced: "Сложный" };
    return m[d] || d;
  }

  updateProgress() {
    const total = EXERCISES.length;
    const done = this.solvedExercises.size;
    const pct = (done / total) * 100;
    document.getElementById("progressFill").style.width = pct + "%";
    document.getElementById("progressText").textContent = `${done} / ${total}`;
  }

  loadExercise(index) {
    this.currentExerciseIndex = index;
    this.currentExercise = EXERCISES[index];

    document.getElementById("exerciseTitle").textContent =
      this.currentExercise.title;
    document.getElementById("exerciseBadge").textContent =
      this.currentExercise.id;
    document.getElementById("exerciseDescription").textContent =
      this.currentExercise.description;

    const diffEl = document.getElementById("exerciseDifficulty");
    diffEl.textContent = this.diffLabel(this.currentExercise.difficulty);
    diffEl.className = "exercise-difficulty " + this.currentExercise.difficulty;

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
    const orig = btn.innerHTML;
    btn.innerHTML = '<span class="btn-icon">&#8987;</span> Проверяю...';
    btn.disabled = true;
    this.setGrandmaState("checking");

    try {
      const result = await aiService.checkCode(code, this.currentExercise);

      if (result.correct) {
        this.solvedExercises.add(this.currentExercise.id);
        this.renderExerciseList();
        this.showResult("success", result.message);
        this.setGrandmaState("happy");

        if (this.currentExerciseIndex + 1 < EXERCISES.length) {
          setTimeout(() => {
            if (confirm("Молодец! Перейти к следующему заданию?")) {
              this.loadExercise(this.currentExerciseIndex + 1);
            }
          }, 600);
        } else {
          this.showResult(
            "success",
            result.message + "\n\nТы решил все задачи! Бабуля тобой гордится!"
          );
        }
      } else {
        let msg = result.message;
        if (result.hint) msg += "\n\nПодсказка: " + result.hint;
        this.showResult("error", msg);
        this.setGrandmaState("worried");
      }
    } catch (err) {
      this.showResult("error", "Ошибка проверки: " + err.message);
      this.setGrandmaState("worried");
    } finally {
      this.isChecking = false;
      btn.innerHTML = orig;
      btn.disabled = false;
      setTimeout(() => this.setGrandmaState("idle"), 1500);
    }
  }

  showHint() {
    if (
      !this.currentExercise.hints ||
      this.currentExercise.hints.length === 0
    ) {
      this.showResult("info", "Подсказки пока недоступны.");
      return;
    }

    const id = this.currentExercise.id;
    if (!this.hintIndex[id]) this.hintIndex[id] = 0;

    const hints = this.currentExercise.hints;
    const hint = hints[this.hintIndex[id] % hints.length];
    this.hintIndex[id]++;

    this.showResult("info", "Подсказка: " + hint);
    this.grandmaBounce();
  }

  grandmaHint() {
    this.showHint();
  }

  grandmaBounce() {
    const g = document.getElementById("grandma");
    g.classList.remove("bounce");
    void g.offsetWidth;
    g.classList.add("bounce");
    setTimeout(() => g.classList.remove("bounce"), 500);
  }

  setGrandmaState(state) {
    const g = document.getElementById("grandma");
    g.classList.remove("happy", "worried", "checking");
    if (state !== "idle") g.classList.add(state);
  }

  showResult(type, message) {
    const el = document.getElementById("result");
    el.className = "result " + type;
    el.textContent = message;
    el.style.display = "block";
    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  hideResult() {
    document.getElementById("result").style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.tutor = new ProgrammingTutor();
});
