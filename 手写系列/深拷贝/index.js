/*
 * @Author       : BigDgreen
 * @Date         : 2020-07-13 18:06:23
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2020-08-09 15:19:10
 * @FilePath     : \前端知识点总结\手写系列\深拷贝\index.js
 */
/**
 * 深拷贝终极版
 * @param {object} obj 
 * @param {WeakMap} hash 
 */
function deepClone(obj, hash = new WeakMap()) {
    if (hash.has(obj)) return obj;
    let types = [Date, RegExp, Set, Map, WeakMap, WeakSet];
    let Obj = obj.constructor;
    if (types.includes(Obj)) return new Obj(obj);

    let allDesc = Object.getOwnPropertyDescriptors(obj);
    let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);

    hash.set(obj, cloneObj);

    Reflect.ownKeys(obj).forEach(key => {
        let curVal = obj[key];
        cloneObj[key] = (typeof curVal === 'object' && curVal !== null) ? deepClone(curVal, hash) : curVal;
    })

    return cloneObj;
}

module.exports = deepClone;
