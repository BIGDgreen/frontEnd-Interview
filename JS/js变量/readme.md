<!--
 * @Author       : BigDgreen
 * @Date         : 2020-07-27 22:54:09
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2020-08-14 21:49:03
 * @FilePath     : \前端知识点总结\JS\js变量\readme.md
--> 
任何使用`var`声明的变量都会被标记为不可配置的(`configurable: false`)，因此不能被delete直接删除。

delete只会删除对象自身上的属性，不会查找原型链。

delete与释放内存无关。释放内存要解除引用。

块级作用域就是通过词法环境的栈结构来实现的，而变量提升是通过变量环境来实现，通过这两者的结合，JavaScript 引擎也就同时支持了变量提升和块级作用域了。

var的创建和初始化被提升，赋值不会被提升。
let的创建被提升，初始化和赋值不会被提升。
function的创建、初始化和赋值均会被提升。