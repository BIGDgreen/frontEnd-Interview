<!--
 * @Author       : BigDgreen
 * @Date         : 2020-07-27 22:54:09
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2020-07-30 08:55:26
 * @FilePath     : \前端知识点总结\JS\js变量\readme.md
--> 
任何使用`var`声明的变量都会被标记为不可配置的(`configurable: false`)，因此不能被delete直接删除。

delete只会删除对象自身上的属性，不会查找原型链。

delete与释放内存无关。释放内存要解除引用。
