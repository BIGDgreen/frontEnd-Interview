/**
 * 实现整体步骤：
 *  1. 将函数设为对象的属性
 *  2. 执行该函数
 *  3. 删除该函数
 * 
 * 另外：
 *  1. call会将剩余的参数都传给要执行的函数
 *  2. 当this为null时，默认为window
 *  3. 函数可以有返回值
 * 
 * 说明：由于call是ES3中的方法，因此该实现不会用到ES6
 */
function myCall(context) {
    var context = context || window;    // 默认为window
    // 获取调用call的函数
    context.fn = this;
    // 保存参数
    var args = [];
    // 初始化参数数组
    for (var i = arguments.length - 1; i > 0; i--) {
        args.unshift('arguments[' + i + ']');   // 因为之后要用eval执行，所以用字符串包裹一下
    }
    // 执行函数，并保留执行结果
    var res = eval('context.fn(' + args + ')');    // 在这里，args会自动调用Array.toString()
    // 删除该函数
    delete context.fn;
    // 返回函数执行结果
    return res;
}

Function.prototype.myCall = myCall;

// 测试
var value = 2;

var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

bar.myCall(null); // 2

console.log(bar.myCall(obj, 'kevin', 18));  // 1 {age: 18,name: "kevin",value: 1}

