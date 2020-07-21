function myNew() {
    let obj = new Object();
    let Constructor = Array.prototype.shift.call(arguments);    // 第一项参数
    obj.__proto__ = Constructor.prototype;  // 核心代码，确定实例与构造函数的关系，这样obj就可以访问到构造函数原型中的属性
    let res = Constructor.apply(obj, arguments);    // 执行构造函数中的内容，返回res。注意在这个地方将this绑定到了apply上
    return typeof res === 'object' ? res : obj; // 如果返回结果不是对象，就返回一个空对象
}

function Person(name, age) {
    this.name = name;
    this.age = age;
}

let person = myNew(Person, '张三', 15);