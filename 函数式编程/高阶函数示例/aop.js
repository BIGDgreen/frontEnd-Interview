/**
 * 在某方法前执行某一方法，并可以传递参数
 */

function say(name) {
    console.log(name + " say hello");
}

Function.prototype.before = function (fn) {
    let that = this;
    return function () {
        fn();
        that(...arguments);
    }
}

let newFn = say.before(function () {
    console.log("before say");
})

newFn('me');

