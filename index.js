/*
 * @Author       : BigDgreen
 * @Date         : 2020-08-05 03:17:53
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2020-08-09 15:19:25
 * @FilePath     : \前端知识点总结\index.js
 */
function myNew() {
    let obj = new Object();
    let Constructor = Array.prototype.shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    let res = Constructor.apply(obj, arguments);
    return typeof res === 'object' ? res : obj;
}

function myCall(context) {
    context = context || window;
    context.fn = this;
    var args = [];
    for (let i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }
    var res = eval('context.fn(' + args + ')');
    delete context.fn;
    return res;
}

Function.prototype.myCall = myCall;

function myApply(context, arr) {
    context = context || window;
    context.fn = this;
    var res;
    if (!arr) {
        res = context.fn();
    } else {
        var args = [];
        for (let i = 1, len = arguments.length; i < len; i++) {
            args.push('arguments[' + i + ']');
        }
        res = eval('context.fn(' + args + ')');
    }
    delete context.fn;
    return res;
}

Function.prototype.myApply = myApply;

function myBind(context) {
    if (typeof context !== 'function') {
        throw new Error('Function.prototype.bind - what is trying to be bound is not callable');
    }
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () { }
    var fbound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }
    fNOP.prototype = self.prototype;
    fbound.prototype = new fNOP();

    return fbound;
}

Function.prototype.myBind = myBind;

function deepClone(obj, hash = new WeakMap()) {
    if (hash.has(obj)) return obj;
    let types = [Date, RegExp, Map, Set, WeakMap, WeakSet];
    let Obj = obj.constructor;
    if (types.includes(Obj)) return new Obj(obj);
    let allDes = Object.getOwnPropertyDescriptors(obj);
    let cloneObj = Object.create(Object.getPrototypeOf(obj), allDes);
    hash.set(obj, cloneObj);

    Reflect.ownKeys(obj).forEach(key => {
        let curVal = obj[key];
        cloneObj[key] = (typeof curVal === 'object' && curVal !== null) ? deepClone(curVal, hash) : curVal;
    })
    return cloneObj;
}


