<!--
 * @Author       : BigDgreen
 * @Date         : 2020-07-16 15:18:31
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2020-08-28 14:43:53
 * @FilePath     : \前端知识点总结\手写系列\实现call&apply&bind\实现bind\readme.md
--> 
# 特点
- `bind()`会创建一个新的函数。
- 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的`this`值被忽略，同时调用时的参数被提供给模拟函数。
- `bind()`创建的函数没有`prototype` （ 箭头函数也没有）

this是动态的，在函数执行时确定。call apply bind。

ECMAScript规范

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

