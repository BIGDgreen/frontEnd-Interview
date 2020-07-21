1.
```js
function test(m) {  // 函数形参传的是值（按值传递），形参与实参指向同一个地址
    m = {   // 形参被重新赋值，地址被改变，形参与实参独立开，没有任何关系
        a: 2
    }
}
var m = {
    b: 3
};
test(m);
console.log(m.a);   // undefined
```




