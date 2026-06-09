const EXERCISES = [
  {
    id: 1,
    title: "Привет, мир!",
    description: 'Напишите функцию hello(), которая возвращает строку "Hello, World!"',
    difficulty: "beginner",
    starterCode: "def hello():\n    # ваш код здесь\n    pass",
    hints: [
      "Используйте ключевое слово return для возврата значения",
      "Не забудьте кавычки вокруг строки: 'Hello, World!'",
      "Строка — это текст, заключённый в кавычки",
    ],
    tests: [
      {
        name: "Функция определена",
        check: (code) => /def\s+hello\s*\(/.test(code),
        message: "Функция hello() не найдена. Используйте def hello():",
      },
      {
        name: "Есть return",
        check: (code) => /return/.test(code),
        message: "Добавьте return, чтобы вернуть значение из функции",
      },
      {
        name: "Возвращает Hello, World!",
        check: (code) =>
          /return\s+["']Hello,?\s*World!?["']/i.test(code),
        message: 'Убедитесь, что return возвращает строку "Hello, World!"',
      },
    ],
    aiPrompt:
      "Проверь код ученика на Python. Функция hello() должна возвращать строку 'Hello, World!'. Если есть ошибки — объясни их на русском языке просто и понятно. Если код верный — похвали.",
  },
  {
    id: 2,
    title: "Сумма двух чисел",
    description: "Напишите функцию sum_numbers(a, b), которая возвращает сумму двух чисел",
    difficulty: "beginner",
    starterCode: "def sum_numbers(a, b):\n    # ваш код здесь\n    pass",
    hints: [
      "Используйте оператор + для сложения",
      "Не забудьте вернуть результат через return",
      "Например: return a + b",
    ],
    tests: [
      {
        name: "Функция определена",
        check: (code) => /def\s+sum_numbers\s*\(/.test(code),
        message: "Функция sum_numbers() не найдена. Используйте def sum_numbers(a, b):",
      },
      {
        name: "Есть return с +",
        check: (code) => /return\s+.*\+/.test(code),
        message: "Добавьте return a + b, чтобы вернуть сумму",
      },
    ],
    aiPrompt:
      "Проверь код ученика на Python. Функция sum_numbers(a, b) должна возвращать a + b. Объясни ошибки на русском.",
  },
  {
    id: 3,
    title: "Чётное или нечётное",
    description:
      "Напишите функцию is_even(n), которая возвращает True, если число чётное, и False — если нечётное",
    difficulty: "beginner",
    starterCode: "def is_even(n):\n    # ваш код здесь\n    pass",
    hints: [
      "Оператор % возвращает остаток от деления",
      "n % 2 == 0 означает, что число чётное",
      "В Python True и False с заглавной буквы",
    ],
    tests: [
      {
        name: "Функция определена",
        check: (code) => /def\s+is_even\s*\(/.test(code),
        message: "Функция is_even() не найдена. Используйте def is_even(n):",
      },
      {
        name: "Использует % (остаток от деления)",
        check: (code) => /%\s*2/.test(code),
        message: "Используйте оператор % для проверки остатка от деления на 2",
      },
      {
        name: "Сравнивает с 0",
        check: (code) => /==\s*0|!=\s*0/.test(code),
        message: "Сравните результат с нулем: n % 2 == 0",
      },
    ],
    aiPrompt:
      "Проверь код ученика на Python. Функция is_even(n) должна возвращать True если n чётное, иначе False. Объясни ошибки на русском.",
  },
  {
    id: 4,
    title: "Факториал",
    description:
      "Напишите функцию factorial(n), которая вычисляет факториал числа n. Факториал 0 равен 1.",
    difficulty: "intermediate",
    starterCode: "def factorial(n):\n    # ваш код здесь\n    pass",
    hints: [
      "Факториал 0 и 1 равен 1",
      "Используйте цикл for или рекурсию",
      "Для цикла: result = 1, затем result *= i для i от 2 до n",
    ],
    tests: [
      {
        name: "Функция определена",
        check: (code) => /def\s+factorial\s*\(/.test(code),
        message: "Функция factorial() не найдена. Используйте def factorial(n):",
      },
      {
        name: "Есть return",
        check: (code) => /return/.test(code),
        message: "Добавьте return, чтобы вернуть результат",
      },
      {
        name: "Есть цикл или рекурсия",
        check: (code) =>
          /for\s+\w+\s+in/.test(code) ||
          /while\s+/.test(code) ||
          /factorial\s*\(/.test(code) ||
          /math\.factorial/.test(code),
        message: "Используйте цикл for/while или рекурсию для вычисления факториала",
      },
    ],
    aiPrompt:
      "Проверь код ученика на Python. Функция factorial(n) должна вычислять факториал. factorial(0) = 1, factorial(5) = 120. Объясни ошибки на русском.",
  },
  {
    id: 5,
    title: "Переворот строки",
    description:
      "Напишите функцию reverse_string(str), которая возвращает перевёрнутую строку",
    difficulty: "intermediate",
    starterCode: "def reverse_string(s):\n    # ваш код здесь\n    pass",
    hints: [
      "Срез [::-1] переворачивает строку",
      "Это самый питоничный способ: s[::-1]",
      "Также можно использовать цикл или reversed()",
    ],
    tests: [
      {
        name: "Функция определена",
        check: (code) => /def\s+reverse_string\s*\(/.test(code),
        message: "Функция reverse_string() не найдена. Используйте def reverse_string(s):",
      },
      {
        name: "Есть return",
        check: (code) => /return/.test(code),
        message: "Добавьте return, чтобы вернуть перевёрнутую строку",
      },
      {
        name: "Использует срез или reversed",
        check: (code) =>
          /\[::-1\]/.test(code) ||
          /reversed/.test(code) ||
          /for\s+\w+\s+in/.test(code) ||
          /join/.test(code),
        message: "Попробуйте срез s[::-1] или цикл с reversed()",
      },
    ],
    aiPrompt:
      "Проверь код ученика на Python. Функция reverse_string(s) должна возвращать перевёрнутую строку. reverse_string('abc') == 'cba'. Объясни ошибки на русском.",
  },
  {
    id: 6,
    title: "Палиндром",
    description:
      "Напишите функцию is_palindrome(s), которая проверяет, является ли строка палиндромом (читается одинаково в обе стороны)",
    difficulty: "intermediate",
    starterCode: "def is_palindrome(s):\n    # ваш код здесь\n    pass",
    hints: [
      "Палиндром читается одинаково в обе стороны: 'мадам', 'racecar'",
      "Сравните строку с её перевёрнутой версией: s == s[::-1]",
      "Для регистрации можно привести к нижнему регистру: s.lower()",
    ],
    tests: [
      {
        name: "Функция определена",
        check: (code) => /def\s+is_palindrome\s*\(/.test(code),
        message: "Функция is_palindrome() не найдена. Используйте def is_palindrome(s):",
      },
      {
        name: "Есть return",
        check: (code) => /return/.test(code),
        message: "Добавьте return, чтобы вернуть результат",
      },
      {
        name: "Сравнивает строку с перевёрнутой",
        check: (code) =>
          /\[::-1\]/.test(code) ||
          /==/.test(code) ||
          /reversed/.test(code),
        message: "Сравните строку с её перевёрнутой версией через == и срез [::-1]",
      },
    ],
    aiPrompt:
      "Проверь код ученика на Python. Функция is_palindrome(s) должна возвращать True если строка палиндром. is_palindrome('мадам') == True. Объясни ошибки на русском.",
  },
];
