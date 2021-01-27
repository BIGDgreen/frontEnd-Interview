<!--
 * @Author       : BigDgreen
 * @Date         : 2020-06-24 20:26:22
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2020-09-16 09:53:22
 * @FilePath     : \前端知识点总结\ES6\箭头函数\readme.md
-->
# 箭头函数的特点
1. 更简洁的语法
2. 没有自己的this，无法调用call、apply绑定this。它的 this 是词法的，引用的是上下文的this
3. 没有 prototype，不能使用 new 当成构造函数调用
4. 不绑定 arguments，用rest参数...解决
5. 不能简单返回对象字面量，需要用小括号包起来
6. 箭头函数不能当做 Generator 函数,不能使用 yield 关键字

# 箭头函数为什么不能new
为了创建一个新对象，函数应该具有一个内部方法`[[construct]]`和`prototype`属性。箭头函数没有。

箭头函数用babel转义后有`prototype`属性，为什么它本身没有呢？

