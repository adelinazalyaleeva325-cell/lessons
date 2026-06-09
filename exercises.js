const EXERCISES = [
  {
    id: 1,
    title: "Hello, World!",
    description: 'Напишите функцию hello(), которая возвращает строку "Hello, World!"',
    difficulty: "beginner",
    starterCode: "function hello() {\n  // ваш код здесь\n}",
    hints: [
      "Используйте оператор return для возврата значения",
      "Не забудьте кавычки вокруг строки",
    ],
    tests: [
      {
        name: "Функция существует",
        check: (code) => /function\s+hello\s*\(/.test(code),
        message: "Функция hello() не найдена. Убедитесь, что вы объявили функцию с именем hello.",
      },
      {
        name: "Возвращает строку",
        check: (code) =>
          /return\s+["']Hello,?\s*World!?["']/i.test(code) ||
          /return\s+`Hello,?\s*World!?`/i.test(code),
        message: 'Функция должна возвращать строку "Hello, World!"',
      },
    ],
    aiPrompt:
      "Проверь код ученика. Функция hello() должна возвращать строку 'Hello, World!'. Если есть ошибки — объясни их на русском языке просто и понятно. Если код верный — похвали и предложи улучшение.",
  },
  {
    id: 2,
    title: "Сумма двух чисел",
    description: "Напишите функцию sum(a, b), которая возвращает сумму двух чисел",
    difficulty: "beginner",
    starterCode: "function sum(a, b) {\n  // ваш код здесь\n}",
    hints: [
      "Используйте оператор + для сложения",
      "Не забудьте вернуть результат через return",
    ],
    tests: [
      {
        name: "Функция существует",
        check: (code) => /function\s+sum\s*\(/.test(code),
        message: "Функция sum() не найдена.",
      },
      {
        name: "Использует return и +",
        check: (code) =>
          /return\s+.*\+/.test(code),
        message: "Функция должна использовать return и оператор + для сложения.",
      },
    ],
    aiPrompt:
      "Проверь код ученика. Функция sum(a, b) должна возвращать сумму a + b. Если есть ошибки — объясни на русском. Если верно — похвали.",
  },
  {
    id: 3,
    title: "Чётное или нечётное",
    description:
      "Напишите функцию isEven(n), которая возвращает true, если число чётное, и false — если нечётное",
    difficulty: "beginner",
    starterCode: "function isEven(n) {\n  // ваш код здесь\n}",
    hints: [
      "Оператор % возвращает остаток от деления",
      "n % 2 === 0 означает, что число чётное",
    ],
    tests: [
      {
        name: "Функция существует",
        check: (code) => /function\s+isEven\s*\(/.test(code),
        message: "Функция isEven() не найдена.",
      },
      {
        name: "Использует % (остаток от деления)",
        check: (code) => /%\s*2/.test(code),
        message: "Используйте оператор % (остаток от деления) для проверки чётности.",
      },
      {
        name: "Возвращает true/false",
        check: (code) =>
          /return\s+/.test(code) &&
          (/true|false|===?\s*0/.test(code)),
        message: "Функция должна возвращать true или false.",
      },
    ],
    aiPrompt:
      "Проверь код ученика. Функция isEven(n) должна возвращать true если n чётное, иначе false. Объясни ошибки на русском.",
  },
  {
    id: 4,
    title: "Факториал",
    description:
      "Напишите функцию factorial(n), которая вычисляет факториал числа n (n! = 1 * 2 * ... * n). Факториал 0 равен 1.",
    difficulty: "intermediate",
    starterCode: "function factorial(n) {\n  // ваш код здесь\n}",
    hints: [
      "Факториал 0 и 1 равен 1",
      "Используйте цикл for или рекурсию",
      "for (let i = 2; i <= n; i++) — цикл от 2 до n",
    ],
    tests: [
      {
        name: "Функция существует",
        check: (code) => /function\s+factorial\s*\(/.test(code),
        message: "Функция factorial() не найдена.",
      },
      {
        name: "Есть цикл или рекурсия",
        check: (code) =>
          /for\s*\(/.test(code) ||
          /while\s*\(/.test(code) ||
          /factorial\s*\(/.test(code),
        message: "Используйте цикл (for/while) или рекурсию для вычисления факториала.",
      },
    ],
    aiPrompt:
      "Проверь код ученика. Функция factorial(n) должна вычислять факториал. factorial(0) = 1, factorial(5) = 120. Объясни ошибки на русском.",
  },
  {
    id: 5,
    title: "Переворот строки",
    description:
      "Напишите функцию reverseString(str), которая возвращает перевёрнутую строку",
    difficulty: "intermediate",
    starterCode: "function reverseString(str) {\n  // ваш код здесь\n}",
    hints: [
      "str.split('') разбивает строку на массив символов",
      "reverse() переворачивает массив",
      "join('') склеивает массив обратно в строку",
    ],
    tests: [
      {
        name: "Функция существует",
        check: (code) => /function\s+reverseString\s*\(/.test(code),
        message: "Функция reverseString() не найдена.",
      },
      {
        name: "Использует split/reverse/join или цикл",
        check: (code) =>
          /\.split/.test(code) ||
          /for\s*\(/.test(code) ||
          /while\s*\(/.test(code) ||
          /\[.*\]\.reverse/.test(code) ||
          /reduce/.test(code),
        message: "Попробуйте использовать split('').reverse().join('') или цикл.",
      },
    ],
    aiPrompt:
      "Проверь код ученика. Функция reverseString(str) должна возвращать перевёрнутую строку. Например: reverseString('abc') === 'cba'. Объясни ошибки на русском.",
  },
  {
    id: 6,
    title: "Массив без повторений",
    description:
      "Напишите функцию unique(arr), которая возвращает новый массив без повторяющихся элементов",
    difficulty: "intermediate",
    starterCode: "function unique(arr) {\n  // ваш код здесь\n}",
    hints: [
      "Set — коллекция уникальных значений",
      "new Set(arr) удалит дубликаты",
      "Array.from() или spread [...] превратит Set обратно в массив",
    ],
    tests: [
      {
        name: "Функция существует",
        check: (code) => /function\s+unique\s*\(/.test(code),
        message: "Функция unique() не найдена.",
      },
      {
        name: "Использует Set или filter",
        check: (code) =>
          /new\s+Set/.test(code) ||
          /\.filter/.test(code) ||
          /indexOf/.test(code) ||
          /includes/.test(code),
        message: "Попробуйте использовать new Set() или метод filter().",
      },
    ],
    aiPrompt:
      "Проверь код ученика. Функция unique(arr) должна убрать дубликаты из массива. unique([1,1,2,3,3]) === [1,2,3]. Объясни ошибки на русском.",
  },
];
