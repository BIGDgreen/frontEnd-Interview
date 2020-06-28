/**
 * 多元函数柯里化
 * @param {function} binaryFn 
 */
export const curry = (fn) => {
    if (typeof fn !== 'function') {
        throw new Error('No function provided')
    }
    return function curriedFn(...args) {
        // fn.length为fn函数的参数个数
        if (args.length < fn.length) {
            // 递归调用curriedFn
            return function (...innerArgs) {
                return curriedFn.apply(null, args.concat(innerArgs))
            }
        }
        return fn.apply(null, args)
    };
};

/**
 * 将函数变成偏函数
 * 在particalArgs处传入全部参数，未知参数用undefined代替。
 * 在下一个函数调用中传入剩余参数，该参数实际将被放到上面留的undefined位置。
 * @param {function} fn 
 * @param  {array} particalArgs 
 */
export const partical = function (fn, ...particalArgs) {
    let args = particalArgs;
    return function (...fullArguments) {
        let arg = 0;
        for (let i = 0; i < args.length && arg < fullArguments.length; i++) {
            if (args[i] === undefined) {
                args[i] = fullArguments[arg++];
            }
        }
        return fn.apply(null, args);
    };
};

/**
 * 将后一个函数的返回值传给前一个函数，实现函数组合
 * @param {array} fns 
 * @returns {function}
 */
export const compose = (...fns) =>
    (value) =>
        reduce(fns.reverse(), (acc, fn) => fn(acc), value)

/**
 * 将前一个函数的返回值传给后一个函数，实现函数管道
 * @param {array} fns 
 * @returns {function}
 */
export const pipe = (...fns) =>
    (value) =>
        reduce(fns, (acc, fn) => fn(acc), value)