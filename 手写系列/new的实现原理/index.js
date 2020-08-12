/*
 * @Author       : BigDgreen
 * @Date         : 2020-07-17 11:01:05
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2020-08-04 21:27:40
 * @FilePath     : \前端知识点总结\手写系列\new的实现原理\index.js
 */
/**
 *
 *   使用new调用构造函数会经历如下过程：
 *   1. 创建一个对象
 *   2. 将构造函数的作用域赋给新对象
 *   3. 执行构造函数中的代码
 *   4. 返回新对象
 *
 * @returns
 */
function myNew() {
    let obj = new Object(); // 寄生对象
    let Constructor = Array.prototype.shift.call(arguments);    // 第一项参数，即构造函数
    obj.__proto__ = Constructor.prototype;  // 核心代码，确定实例与构造函数的关系，这样obj就可以访问到构造函数原型中的属性
    let res = Constructor.apply(obj, arguments);    // 执行构造函数中的内容，返回res。注意在这个地方将this绑定到了obj上
    return typeof res === 'object' ? res : obj; // 如果返回结果不是对象，就返回一个空对象
}


function Person(name, age) {
    this.name = name;
    this.age = age;
}

let person = myNew(Person, '张三', 15);