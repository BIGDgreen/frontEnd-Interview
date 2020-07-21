/**
 * 特点：
 *  1. 返回一个函数
 *  2. 可以传入参数
 *  3. 执行返回的函数时依然能传入参数
 *  4. bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效
 * 
 * 说明：
 *  原生bind绑定后的函数没有prototype，但由于js本身的限制，该功能无法实现
 */
function myBind(context) {
    if (typeof this !== 'function') {
        throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
    }
    var self = this;    // 调用bind的函数
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () { };

    var fbound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        // 当作为构造函数时，this 指向实例，self 指向绑定函数，因为下面一句 `fbound.prototype = this.prototype;`，已经修改了 fbound.prototype 为 绑定函数的 prototype，此时结果为 true，当结果为 true 的时候，this 指向实例。
        // 当作为普通函数时，this 指向 window，self 指向绑定函数，此时结果为 false，当结果为 false 的时候，this 指向绑定的 context。
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }
    // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承函数的原型中的值
    fNOP.prototype = self.prototype;
    fbound.prototype = new fNOP();

    return fbound;
}

Function.prototype.myBind = myBind;

// 测试
var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.myBind(foo, 'daisy');
var obj = new bindFoo('18');

console.log(obj.habit);
console.log(obj.friend);

