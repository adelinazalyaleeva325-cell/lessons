const TASKS = [
  {
    id: 1,
    title: 'Сумма двух чисел',
    difficulty: 'легкая',
    description: 'Напишите функцию <code>sum(a, b)</code>, которая принимает два числа и возвращает их сумму.',
    example: 'sum(2, 3) → 5\nsum(-1, 5) → 4',
    starterCode: `function sum(a, b) {\n  // напишите код здесь\n}`,
    testCases: [
      { input: [2, 3], expected: 5 },
      { input: [-1, 5], expected: 4 },
      { input: [0, 0], expected: 0 },
      { input: [100, 200], expected: 300 }
    ]
  },
  {
    id: 2,
    title: 'Четное или нечетное',
    difficulty: 'легкая',
    description: 'Напишите функцию <code>isEven(n)</code>, которая возвращает <code>true</code>, если число четное, и <code>false</code>, если нечетное.',
    example: 'isEven(4) → true\nisEven(7) → false',
    starterCode: `function isEven(n) {\n  // напишите код здесь\n}`,
    testCases: [
      { input: [4], expected: true },
      { input: [7], expected: false },
      { input: [0], expected: true },
      { input: [-2], expected: true }
    ]
  },
  {
    id: 3,
    title: 'Факториал',
    difficulty: 'средняя',
    description: 'Напишите функцию <code>factorial(n)</code>, которая вычисляет факториал числа n (n!). Факториал 0 равен 1.',
    example: 'factorial(5) → 120\nfactorial(0) → 1',
    starterCode: `function factorial(n) {\n  // напишите код здесь\n}`,
    testCases: [
      { input: [5], expected: 120 },
      { input: [0], expected: 1 },
      { input: [1], expected: 1 },
      { input: [3], expected: 6 }
    ]
  },
  {
    id: 4,
    title: 'Перевернуть строку',
    difficulty: 'средняя',
    description: 'Напишите функцию <code>reverseString(str)</code>, которая возвращает строку в обратном порядке.',
    example: 'reverseString("hello") → "olleh"\nreverseString("abc") → "cba"',
    starterCode: `function reverseString(str) {\n  // напишите код здесь\n}`,
    testCases: [
      { input: ['hello'], expected: 'olleh' },
      { input: ['abc'], expected: 'cba' },
      { input: [''], expected: '' },
      { input: ['a'], expected: 'a' }
    ]
  },
  {
    id: 5,
    title: 'Поиск максимума в массиве',
    difficulty: 'средняя',
    description: 'Напишите функцию <code>findMax(arr)</code>, которая находит максимальное число в массиве.',
    example: 'findMax([1, 5, 3, 9, 2]) → 9\nfindMax([-1, -5, -3]) → -1',
    starterCode: `function findMax(arr) {\n  // напишите код здесь\n}`,
    testCases: [
      { input: [[1, 5, 3, 9, 2]], expected: 9 },
      { input: [[-1, -5, -3]], expected: -1 },
      { input: [[42]], expected: 42 },
      { input: [[0, 0, 0]], expected: 0 }
    ]
  },
  {
    id: 6,
    title: 'Числа Фибоначчи',
    difficulty: 'сложная',
    description: 'Напишите функцию <code>fibonacci(n)</code>, которая возвращает n-е число Фибоначчи. F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2).',
    example: 'fibonacci(0) → 0\nfibonacci(6) → 8',
    starterCode: `function fibonacci(n) {\n  // напишите код здесь\n}`,
    testCases: [
      { input: [0], expected: 0 },
      { input: [1], expected: 1 },
      { input: [6], expected: 8 },
      { input: [10], expected: 55 }
    ]
  }
];
