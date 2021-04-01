let fibonacci = function (n) {
    let i = 0
    let pre = 0n
    let next = 1n
    if (n === 0) {
        return pre
    } else if (n === 1) {
        return next
    }
    while (i < n) {
        i = i + 1
        let m = BigInt(next)
        next = BigInt(m) + BigInt(pre)
        pre = BigInt(m)
    }
    return pre
}

let fibonacciSumFunc = function (a, b) {
    let result = 0n
    while (a <= b) {
        result += BigInt(fibonacci(a))
        a++
    }
    return result
}

let fibonacciSumFunc2 = function (a, b) {
    let i = 0
    let pre = 0n
    let next = 1n
    let result = 0n
    b = b || a
    if (b === 0) {
        return pre
    } else if (b === 1) {
        return next
    }
    while (i < b) {
        i = i + 1
        let m = BigInt(next)
        next = BigInt(m) + BigInt(pre)
        pre = BigInt(m)
        if (a <= i) {
            result += pre
        }
    }
    return result

}

let getDivisibleNumber = function (a, b, d = 2) {
    b = b || a
    // let result = BigInt(fibonacciSumFunc(a, b))
    let result = BigInt(fibonacciSumFunc2(a, b))
    let bool = result % BigInt(d) === 0n
    // console.log(a, b, d, result, bool)
    let str = bool ? `F_${a} + ... + F_${b} is divisible by ${d}` : `F_${a} + ... + F_${b} is NOT divisible by ${d}`
    console.log(str)
}

getDivisibleNumber(20, 100)

module.exports = {
    fibonacci, fibonacciSumFunc, getDivisibleNumber
}