// 判断复杂数据类型
const isComplexDataType = obj => typeof obj === 'object' && (obj !== null)

const deepClone = function (obj, hash = new WeakMap()) {
    // 解决循环引用的深拷贝
    if (hash.has(obj)) return hash.get(obj);

    // 特殊类型
    let type = [Date, RegExp, Set, Map, WeakMap, WeakSet];
    let Obj = obj.constructor;
    if (type.includes(Obj)) return new Obj(obj);

    let allDesc = Object.getOwnPropertyDescriptors(obj);    // 获取对象上的所有属性
    let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);

    hash.set(obj, cloneObj);

    Reflect.ownKeys(obj).forEach(key => {   // Reflect.ownKeys(obj)相当于Object.getOwnProperyNames(obj).concat(Object.getOwnProperySymbols(obj))
        let curVal = obj[key];
        cloneObj[key] = (isComplexDataType(curVal) ? deepClone(curVal, hash) : curVal);
    })

    return cloneObj;
}

module.exports = deepClone
