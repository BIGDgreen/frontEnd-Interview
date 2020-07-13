# 实现深拷贝的三种方法
**1. 简陋版：用json的内置方法：**
这种方法在业务中最常见。
```js
/**
 *json实现对象深拷贝
 *
 * @param {Object || Array} source
 * @returns
 */
function deepClone(source) {
  return JSON.parse(JSON.stringify(source));
}
```
缺点：无法深拷贝正则、拷贝函数和循环引用

***2. 普通版：递归实现：**
```js
/**
 *递归实现对象深拷贝
 *
 * @param {Object || Array} source
 * @returns
 */
function deepClone(source) {
  if(typeof source !== "object") return source; // 浅拷贝
  let target = source instanceof Array ? [] : {};
  for(let key in source) {
    // 数组索引，对象键值
    target[key] = typeof source[key] === 'object' ? deepClone(source[key]) : source[key];
  }
  return target;
}
```
***3. 终极版**
考虑Date、RegExp、Symbol、BigInt等一切属性的拷贝和循环引用。
```js
const deepClone = (obj, hash = new WeakMap) => {
    if(hash.has(obj)) return obj;
    let types = [Date, RegExp, Map, WeakMap, Set, WeakSet];
    let Obj = obj.constructor;
    if(types.includes(Obj)) return new Obj(obj);

    const allDes = Object.getOwnPropertyDescriptors(obj);
    let cloneObj = Object.create(Object.getPrototypeOf(obj), allDes);

    hash.set(obj, cloneObj);

    Reflect.ownKeys(obj).forEach(key => {
        let curVal = obj[key];
        cloneObj[key] = (typeof curVal === 'object' && curVal !== null) ? deepClone(obj, hash) : curVal;
    })

    return cloneObj;
}
```

# 测试文件
```js
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
```

