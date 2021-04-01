const { fibonacci, fibonacciSumFunc } = require('./codingame')

test('Fibonacci No.0 should be 0', () => {
    expect(fibonacci(0)).toBe(0n)
})

test('Fibonacci No.1 should be 1', () => {
    expect(fibonacci(1)).toBe(1n)
})

test('Fibonacci No.2 should be 1', () => {
    expect(fibonacci(2)).toBe(1n)
})

test('Fibonacci No.3 should be 2', () => {
    expect(fibonacci(3)).toBe(2n)
})


test('Fibonacci No.4 should be 3', () => {
    expect(fibonacci(4)).toBe(3n)
})


test('Fibonacci No.10 should be 55', () => {
    expect(fibonacci(10)).toBe(55n)
})

test('Fibonacci sum NO.10 to No.12 should be 288', () => {
    expect(fibonacciSumFunc(10, 12)).toBe(288n)
})
