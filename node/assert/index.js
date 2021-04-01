/**
 * TODO assert.CallTracker类 
 */

// 传统模式
const assert = require('assert')
// 严格模式
const assertStrict = assert.strict

// assertStrict.deepEqual([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5])

// 抽象的相等性比较：
// assert.deepEqual(/a/gi, new Date())
// assert.deepStrictEqual(/a/gi, new Date())
// assert.deepStrictEqual(undefined, null)
// assertStrict.deepEqual(undefined, null)
// assertStrict.deepEqual(1, '1')
// assertStrict.deepEqual(1, '1')

/**
 * 传统的断言模式中:
 * assert.deepEqual()
 * assert.equal()
 * assert.notDeepEqual()
 * assert.notEqual()
 * 使用抽象的相等性比较，与==一样会进行类型转换
 * 尽量使用严格的断言模式
 */


{
    /**
     * @param message
     * @param actual
     * @param expected
     * @param operator
     * @param stackStartFn 如果提供，则生成的堆栈跟踪将移除所有帧直到提供的函数。
     * @returns actual <any> 设置方法的 actual 参数，例如 assert.strictEqual()。
     * ******** expected <any> 设置方法的 expected 参数，例如 assert.strictEqual()。
     * ******** generatedMessage <boolean> 表明消息是否是自动生成的。
     * ******** code <string> 始终设置为字符串 ERR_ASSERTION 以表明错误实际上是断言错误。
     * ******** operator <string> 设置为传入的运算符值。
     */
    const { message } = new assert.AssertionError({
        actual: 1,
        expected: 2,
        operator: 'strictEqual'
    });

    try {
        assert.strictEqual(1, 2);
    } catch (err) {
        assert(err instanceof assert.AssertionError);
        assert.strictEqual(err.message, message);
        assert.strictEqual(err.name, 'AssertionError');
        assert.strictEqual(err.actual, 1);
        assert.strictEqual(err.expected, 2);
        assert.strictEqual(err.code, 'ERR_ASSERTION');
        assert.strictEqual(err.operator, 'strictEqual');
        assert.strictEqual(err.generatedMessage, true);
    }
}

/**
 * STUB assert.notDeepEqual(actual, expected[, message])
 * STUB assert.deepEqual()说明：
 * @deprecated 用deepStrictEqual()代替
 * - 除 NaN 之外，使用抽象的相等性比较（==）来比较原始值。如果双方均为 NaN，则视为相同。
 * - 对象的类型标签应该相同。
 * - 只考虑可枚举的自身属性。
 * - 始终比较 Error 的名称和消息，即使这些不是可枚举的属性。
 * - 对象封装器作为对象和解封装后的值都进行比较。
 * - Object 属性的比较是无序的。
 * - Map 键名与 Set 子项的比较是无序的。
 * - 当两边的值不相同或遇到循环引用时，递归停止。
 * - 不测试对象的 [[Prototype]]。
 * - 可枚举的自身 Symbol 属性也会比较。
 * - WeakMap 和 WeakSet 的比较不依赖于它们的值。
 */


/**
 * STUB assert.notDeepStrictEqual(actual, expected[, message])
 * STUB assert.deepStrictEqual(actual, expected[, message])
 * 说明:
 * 使用 SameValue比较（使用 Object.is()）来比较原始值。
 * 对象的类型标签应该相同。
 * 使用严格相等比较来比较对象的原型。
 * 只考虑可枚举的自身属性。
 * 始终比较 Error 的名称和消息，即使这些不是可枚举的属性。
 * 可枚举的自身 Symbol 属性也会比较。
 * 对象封装器作为对象和解封装后的值都进行比较。
 * Object 属性的比较是无序的。
 * Map 键名与 Set 子项的比较是无序的。
 * 当两边的值不相同或遇到循环引用时，递归停止。
 * WeakMap 和 WeakSet 的比较不依赖于它们的值。
 */
const date = new Date();
const object = {};
const fakeDate = {};
Object.setPrototypeOf(fakeDate, Date.prototype);
// assert.deepStrictEqual(object, fakeDate); // 不通过，原型不同
// assert.deepStrictEqual(date, fakeDate); // 不通过，类型标签不同
assert.deepStrictEqual(NaN, NaN); // 通过, 使用SameValue比较(Object.is())
// assert.deepStrictEqual(new Number(1), new Number(2)); // 不通过, 值不同
assert.deepStrictEqual(new String('foo'), Object('foo')); // 通过, 字符串相同
assert.deepStrictEqual(-0, -0); // 通过，值相同
// NOTE
// assert.deepStrictEqual(0, -0); // 不通过

const weakMap1 = new WeakMap();
const weakMap2 = new WeakMap([[{}, {}]]);
const weakMap3 = new WeakMap();
weakMap3.unequal = true;

assert.deepStrictEqual(weakMap1, weakMap2); //通过，因为无法比较条目
// assert.deepStrictEqual(weakMap1, weakMap3); // 不通过，weakMap3有一个unequal属性

/**
 * assert.doesNotMatch(string, regexp[, message])
 * assert.match(string, regexp[, message])
 */
// assertStrict.doesNotMatch('I will fail', /fail/);
assertStrict.match('I will fail', /fail/);
assertStrict.doesNotMatch('123', /pass/);
// assertStrict.match(123, /pass/);
assertStrict.doesNotMatch('I will pass', /different/);
// assertStrict.match('I will pass', /different/);

/**
 * STUB assert.rejects(asyncFn[, error][, message])
 * STUB assert.doesNotReject(asyncFn[, error][, message])
 * 说明：
 * 等待 asyncFn Promise，或者，如果 asyncFn 是一个函数，则立即调用该函数并等待返回的 Promise 完成。 然后它将检查 Promise 是否被拒绝。
 */

{
    (async () => {
        await assert.rejects(
            async () => {
                throw new TypeError('错误值');
            },
            {
                name: 'TypeError',
                message: '错误值'
            }
        );
    })();

    (async () => {
        await assert.rejects(
            async () => {
                throw new TypeError('错误值');
            },
            (err) => {
                assert.strictEqual(err.name, 'TypeError');
                assert.strictEqual(err.message, '错误值');
                return true;
            }
        );
    })();
}


/**
 * STUB assert.throws(fn[, error][, message])
 * STUB assert.doesNotThrow(fn[, error][, message])
 */

/**
 * STUB assert.fail([message])
 */
// assert.fail('失败')
// assertStrict.fail('失败')
// assertStrict.fail(new TypeError('需要数组'))

/**
 * STUB assert.ifError(value)
 * 说明：
 * 如果 value 不为 undefined 或 null，则抛出 value。 在回调中测试 error 参数时，这很有用。 堆栈跟踪包含传递给 ifError() 的错误的所有帧，包括 ifError() 本身的潜在新帧。
 */

assertStrict.ifError(null);
// assertStrict.ifError(0);
// assertStrict.ifError(new Error());

/**
 * STUB assert.ok(value[, message])
 * 说明：
 * 测试 value 是否为真值。 等同于 assert.equal(!!value, true, message)。
 */
assertStrict.ok(true)
assertStrict.ok(1)
// assertStrict.ok(0)
// assertStrict.ok(typeof 123 === 'string');