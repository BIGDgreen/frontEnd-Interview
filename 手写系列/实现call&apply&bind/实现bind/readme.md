# 特点
- `bind()`会创建一个新的函数。
- 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的this值被忽略，同时调用时的参数被提供给模拟函数。
- bind()创建的函数没有prototype （ 箭头函数也没有）

this是动态的，在函数执行时确定。call apply bind。

ECMAthis规范

# mdn的polyfill
```js
// Does not work with `new (funcA.bind(thisArg, args))`
//  Yes, it does work with `new (funcA.bind(thisArg, args))`
if (!Function.prototype.bind) (function(){
  var ArrayPrototypeSlice = Array.prototype.slice;
  Function.prototype.bind = function(otherThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var baseArgs= ArrayPrototypeSlice.call(arguments, 1),
        baseArgsLength = baseArgs.length,
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          baseArgs.length = baseArgsLength; // reset to default base arguments
          baseArgs.push.apply(baseArgs, arguments);
          return fToBind.apply(
                 fNOP.prototype.isPrototypeOf(this) ? this : otherThis, baseArgs
          );
        };

    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype; 
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
})();
```

# 词法作用域
js采用的是词法作用域，也就是静态作用域，函数的作用域在函数定义的时候就决定了。

动态作用域里，函数的作用域在函数调用的时候才决定。

执行时生成执行上下文。  

一个函数执行时有执行上下文

多个函数执行有执行上下文栈（后进先出）。

# 执行过程
函数执行分两步。
## 进入执行上下文
## 代码执行

# 作用域链 
函数作用域在函数定义的时候就决定了！

因为函数有一个内部属性`[[scope]]`引擎内部的属性。 

# 函数激活
（函数能当对象用，存储变量 —— 《忍者秘籍》）

当函数激活时，进入函数上下文，创建 VO/AO 后，就会将活动对象添加到作用域的前端，这时候执行上下文的作用域链（ScopeChain）。

```
ScopeChain = [AO].concat([[Scope]])
```

活动对象和变量对象其实是一个东西，只是变量对象是规范上的或者说是引擎实现上的，不可在 JavaScript 环境中访问，只有到当进入一个执行上下文中，这个执行上下文的变量对象才会被激活，所以才叫 activation object 呐，而只有被激活的变量对象（AO），也就是活动对象上的各种属性才能被访问。

活动对象是在**进入函数上下文**时刻被创建的，它通过函数的 arguments 属性初始化。arguments 属性值是 Arguments 对象。


1. 全局上下文的变量对象初始化是全局对象

2. 函数上下文的变量对象初始化只包括 Arguments 对象

3. 在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值

4. 在代码执行阶段，会再次修改变量对象的属性值