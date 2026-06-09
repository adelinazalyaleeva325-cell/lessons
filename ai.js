class AIService {
  constructor() {
    this.config = typeof AI_CONFIG !== "undefined" ? AI_CONFIG : null;
  }

  isConfigured() {
    return (
      this.config &&
      this.config.apiKey &&
      this.config.apiKey !== "YOUR_OPENROUTER_API_KEY"
    );
  }

  async checkCode(userCode, exercise) {
    if (this.isConfigured()) {
      try {
        return await this.checkWithAI(userCode, exercise);
      } catch (error) {
        console.warn("AI check failed, using fallback:", error.message);
        return this.checkLocally(userCode, exercise);
      }
    }
    return this.checkLocally(userCode, exercise);
  }

  async checkWithAI(userCode, exercise) {
    const prompt = `${exercise.aiPrompt}\n\nКод ученика:\n\`\`\`javascript\n${userCode}\n\`\`\`\n\nОтветь ТОЛЬКО в формате JSON:\n{"correct": true/false, "message": "сообщение на русском", "hint": "подсказка если есть ошибки"}`;

    const response = await fetch(this.config.apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
        "X-Title": "Programming Tutor",
      },
      body: JSON.stringify({
        model: this.config.model,
        messages: [
          {
            role: "system",
            content:
              "Ты — дружелюбный тьютор по программированию на JavaScript. Отвечай на русском языке. Всегда отвечай строго в формате JSON без markdown.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content.trim();

    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      // JSON parse failed
    }

    return {
      correct: false,
      message: content,
      hint: "Попробуйте исправить ошибки в коде.",
    };
  }

  checkLocally(userCode, exercise) {
    const results = [];
    let allPassed = true;

    for (const test of exercise.tests) {
      const passed = test.check(userCode);
      results.push({ name: test.name, passed, message: test.message });
      if (!passed) allPassed = false;
    }

    const failedTests = results.filter((r) => !r.passed);

    if (allPassed) {
      return {
        correct: true,
        message: "Отлично! Все проверки пройдены!",
        hint: null,
      };
    }

    const messages = failedTests.map((t) => `- ${t.message}`).join("\n");
    const hint =
      exercise.hints && exercise.hints.length > 0
        ? exercise.hints[Math.floor(Math.random() * exercise.hints.length)]
        : null;

    return {
      correct: false,
      message: `Найдены проблемы:\n${messages}`,
      hint: hint,
    };
  }

  async explainError(userCode, exercise, errorMsg) {
    if (this.isConfigured()) {
      try {
        return await this.explainWithAI(userCode, exercise, errorMsg);
      } catch (error) {
        return this.explainLocally(exercise, errorMsg);
      }
    }
    return this.explainLocally(exercise, errorMsg);
  }

  async explainWithAI(userCode, exercise, errorMsg) {
    const prompt = `Ученик решает задачу: "${exercise.description}"\nЕго код:\n\`\`\`javascript\n${userCode}\n\`\`\`\nОшибка: ${errorMsg}\n\nОбъясни подробно на русском языке, в чём ошибка и как её исправить. Дай пример правильного кода если возможно.`;

    const response = await fetch(this.config.apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
        "X-Title": "Programming Tutor",
      },
      body: JSON.stringify({
        model: this.config.model,
        messages: [
          {
            role: "system",
            content:
              "Ты — дружелюбный тьютор по программированию. Объясняй ошибки просто и понятно на русском языке. Приводи примеры кода.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  }

  explainLocally(exercise, errorMsg) {
    let explanation = `Ошибка: ${errorMsg}\n\n`;
    explanation += `Подсказки к задаче "${exercise.title}":\n`;
    if (exercise.hints) {
      exercise.hints.forEach((h, i) => {
        explanation += `${i + 1}. ${h}\n`;
      });
    }
    return explanation;
  }
}

const aiService = new AIService();
