# Promise有哪些优缺点？
优点：
- 可以解决异步嵌套
    - 可以解决多个异步并发问题

缺点：
- 内部是基于回调的
    - 本身无法终止异步
  
# Promise的特点
promise是一个类，
- 三个状态：pending（默认状态） resolved  rejected。到成功或失败状态后就不能再改变。
  - 执行器内的函数立即执行
  - 调用resolve后，状态变为成功态
  - 调用reject后，状态变为失败态
- 每个promise实例都有一个then方法，then方法中有成功和失败回调两个参数
- 如果new Promise的时候报错，会变成失败态
  - 调用reject或报错都会走失败回调
- then 可以链式调用，上一个函数的返回的promise会作为下一个函数的输入。如果返回的是一个普通值，那么会将这个普通值作为下一次成功的结果
  - 可以返回一个pending的promise来中断promise `return new Promise(() => {})`
- 每次执行promise的时候，都会返回一个新的promise实例
  
```js
let promise = new Promise((resolve, reject) => {  // executor执行器
    console.log(1);
    throw new Error('失败');
    resolve(4);
}).then(data => {
    console.log(data);
},err => {
    console.log('err', err);
})

```
## 关于es9中的promise.resolve()
1. 如果参数是普通值，则将其包装成promise
2. 如果放的是promise，会等待这个promise执行完后再继续执行
