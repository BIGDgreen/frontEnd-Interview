**规则：**
1. `this`谁调用指向谁，默认为`window`
2. 当函数使用`new`的时候，`this`指向当前函数的实例
3. es6简写的简单的函数声明（包括箭头函数）不能被`new`（第6题）
4. 对象和闭包不能在一起，必须有分号

**题目：**
1.
```js
this.a = 20;
var test = {
    a: 40,
    init: function() {
        console.log(this.a);
    }
};
// test.init();    // 40
var fn = test.init;
fn();   // 20;
```

2.
```js
this.a = 20;
var test = {
    a: 40,
    init: function() {
        function go() {
            console.log(this.a);
        }
        go();   // 没有指定this，默认为window
    }
};
test.init();    // 20
```

3.
```js
function test(a) {
    this.a = a;
}
test.prototype.a = 20;
test.prototype.init = function() {
    console.log(this.a);
}
var s = new test(30);   // 构造函数优先于原型链
s.init();   // 30
```

4.
```js
this.a = 20;
var test = {
    a: 40,
    init: function() {
        console.log(this.a);
    }
}   // 缺少分号，整个都被当成函数体
(function() {
    var fn = test.init;
    fn();
})()
```
报错：
```
 TypeError: {(intermediate value)(intermediate value)} is not a function
```
加上分号后得到 20。原因跟上面那个题一样。

5.
```js
this.a = 20;
var test = {
    a: 40,
    init: () => {   // 箭头函数绑定作用域到父级
        console.log(this.a);
    }
};
test.init();    // 20
```

ES5绑定：bind硬绑定。可以实现与上面箭头函数一样的效果。

```js
this.a = 20;
var test = {
    a: 40,
    init: function() {
        console.log(this.a);
    }
};
let s = test.init.bind(this); 
s();   // 20
```

下面4道与`new`有关。
6.
```js
var s = {
    a: function() {
        console.log(1);
    },
    b() {   // es6简写，不能new
        console.log(2);
    },
    c: () => {  // 不能new
        console.log(3);
    }
};
var p = s.a.bind(this);
new p();    // 1
var q = s.b.bind(this);
new q;  // 报错
var r = s.c;
new r(); // 报错
```

7.
```js
var test = 11;
var s = {
    a: function() {
        console.log(1 + this.test); // 使用new将this绑定到实例，this.test为undefined
    }
};
var p = s.a.bind(this);
new p();    // NAN
```

8.
```js
function a(test) {
    this.test = test;
}
function b(test) {
    if(test) this.test = test;
}
function c(test) {
    this.test = test || 'cTest';
}
a.prototype.test = 1;
b.prototype.test = 2;
c.prototype.test = 3;
console.log(new a().test);  // undefined
console.log(new b().test);  // 2
console.log(new c().test);  // cTest
```

9.
```js
function test() {}
test.prototype.a = 10;
console.log(test.a);    // undefined，只有new的时候才会去原型链上找
```

10.暂时性死区 TDZ
```js
var a = 1;
function test() {
    console.log(a); // 报错
    let a = 2;
}
test();
```

11.
```js
function fn() {
    console.log(this.length);
}
var test = {
    length: 5,
    method: function(fn) {
        fn();   // 没有对象调用fn，this默认指向window，window.length = iframe的个数
        arguments[0](); // 依然是调用fn，但此时fn中的this指向arguments，结果为2
    }
};
test.method(fn,1);
```



