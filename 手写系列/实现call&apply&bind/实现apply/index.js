/**
 * 实现整体步骤：
 *  1. 将函数设为对象的属性
 *  2. 执行该函数
 *  3. 删除该函数
 * 
 * 另外：
 *  1. apply可以接收数组(或类数组对象)作为第二个参数，会将数组展开传给要执行的函数
 *  2. 当this为null时，默认为window
 *  3. 返回拥有指定this和参数的函数的执行结果
 * 
 * 说明：由于call是ES3中的方法，因此该实现不会用到ES6
 */
function myApply(context, arr) {
    var context = context || window;    // 默认为window
    // 获取调用apply的函数
    context.fn = this;
    var res
    if (!arr) {  // 不传参数
        res = context.fn();
    } else {
        // 初始化参数数组
        var args = [];
        for (var i = arr.length - 1; i >= 0; i--) {
            args.unshift('arr[' + i + ']');   // 因为之后要用eval执行，所以用字符串包裹一下
        }
        // 执行函数，并保留执行结果
        res = eval('context.fn(' + args + ')');    // 在这里，args会自动调用Array.toString()
    }

    // 删除该函数
    delete context.fn;
    // 返回函数执行结果
    return res;
}

Function.prototype.myApply = myApply;

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

bar.myApply(null); // 2

console.log(bar.myApply(obj, ['kevin', 18]));  // 1 {age: 18,name: "kevin",value: 1}

