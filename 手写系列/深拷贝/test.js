let deepClone = require('./index')

let obj = {
    bigInt: BigInt(12312),
    set: new Set([2]),
    map: new Map([['a', 22], ['b', 33]]),
    num: 0,
    str: '',
    boolean: false,
    unf: undefined,
    nul: null,
    obj: {
        name: 'this is an object',
        id: 1
    },
    func: function () {
        console.log('this is a function');
    },
    [Symbol('1')]: 1,
    date: new Date(0),
    reg: new RegExp('/abD/ig')
}

// 定义一个不可枚举的属性
Object.defineProperty(obj, 'innumerable', {
    enumerable: false,
    value: 'innumberable'
})
obj = Object.create(obj, Object.getOwnPropertyDescriptors(obj));
// 设置循环引用
obj.loop = obj;
// 开始深拷贝
let obj1 = deepClone(obj);
console.log(obj);
console.log(obj1);
Object.keys(obj1).forEach(key => {
    let val = obj[key];
    let cloneVal = obj1[key];
    if (typeof val === 'object' || typeof val === 'function') {
        console.log(`${key}相同吗`, val === cloneVal);
    }
})

console.log(obj.loop === obj);
console.log(obj1.loop === obj1);
