/*
 * @Author       : BigDgreen
 * @Date         : 2020-07-28 20:43:55
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2020-07-28 20:54:13
 * @FilePath     : \前端知识点总结\面试\手写代码\深拷贝\终极版.js
 */
/**
 *递归实现对象深拷贝
 *
 * @param {Object || Array} source
 * @returns
 */
function deepClone(obj, hash = new WeakMap()) {
    if (hash.has(obj)) return obj;
    let types = [Date, RegExp, Set, Map, WeakMap, WeakSet];
    let Obj = obj.constructor;
    if (types.includes(Obj)) return new Obj(obj);

    const allDesc = Object.getOwnPropertyDescriptors(obj);
    let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);

    hash.set(obj, cloneObj);

    Reflect.ownKeys(obj).forEach(key => {
        let curVal = obj[key];
        cloneObj[key] = (typeof curVal === 'object' && curVal !== null) ? deepClone(curVal, hash) : curVal;
    })

    return cloneObj;
}