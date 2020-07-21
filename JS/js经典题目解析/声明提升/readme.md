**规则：**
1. 函数提升 变量提升 函数提升优先于变量提升
2. 当函数名与变量名相同时，如果变量没有被赋值，函数生效，否则变量生效
3. `var s = function g(){}` g只读，只能在函数内部访问

**题目：**
1.
```js
console.log(a); // function
a();    // 10
var a = 3;
function a() {
    console.log(10);
}
console.log(a); // 3
a = 6;
a();    // 报错
```

实际执行顺序：
```js
function a() {
    console.log(10);
}
var a;  // 当函数名与变量名相同时，如果变量没有被赋值，函数生效
console.log(a);   // function a(){console.log(10);}
a();    // 10
a = 3;
console.log(a); // 3
a = 6;
a();    // TypeError: a is not a function
```

最终结果：
```
ƒ a() {
    console.log(10);
}
10
3
Uncaught TypeError: a is not a function
```

扩展：
2.
```js
var a = function fn(num) {
    fn = num;
    console.log(typeof fn); // function fn只读，不能被修改
}
a(1);
```

3.
```js
var a = function fn(num) {
    fn = num;
    console.log(typeof fn);
    return 1;
}
a(1);
console.log(typeof fn());   // 报错，fn只能内部访问
console.log(typeof a());   // number
```

4.
```js
function test(){
    console.log(1);
}
(function(){
    if(false) {
        function test(){
            console.log(2);
        }
    }
    test();
})();
```
在老版浏览器，函数内`test`函数声明提升到函数作用域的最顶端，最后打印出2。

在现代浏览器，函数内`test`**变量声明**提升到函数作用域的最顶端，即`var test;`，最后test为`undefined`，报错。
如果没有if块，`function test`函数体全部提升，如果有if块，只提升`var test`，当if块内执行后，test被赋值为函数。
