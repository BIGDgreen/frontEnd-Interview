<!--
 * @Author       : BigDgreen
 * @Date         : 2020-07-17 22:31:42
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2020-07-30 15:29:59
 * @FilePath     : \前端知识点总结\JS\原型和原型链\readme.md
--> 

# 原型、实例、构造函数的关系
在规范里，`prototype` 被定义为：给其它对象提供共享属性的对象。
# 继承

原型链经典图：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200730105920462.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)

# 例题
```js
function test() {}
console.dir(test.prototype.constructor.__proto__.__proto__.constructor.constructor.constructor) // Function
```
直接在上面的图上挨个查找即可。
