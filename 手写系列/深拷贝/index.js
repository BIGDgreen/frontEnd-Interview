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
        if (typeof curVal === 'object' && curVal !== null) {
            cloneObj[key] = deepClone(curVal, hash);
        } else {
            cloneObj[key] = curVal;
        }
    })

    return cloneObj;
}

module.exports = deepClone;
