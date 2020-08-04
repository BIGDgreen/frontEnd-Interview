<!--
 * @Author       : BigDgreen
 * @Date         : 2020-08-03 20:02:08
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2020-08-03 20:44:07
 * @FilePath     : \前端知识点总结\vue\simple-vue-router\readme.md
-->

# 前端路由和后端路由
 
# hash和history

# 路由原理

# 实现路由


vue 插件的原理：把一段逻辑注入到组件的生命周期

`Vue.use()`
- 方法直接执行
- 对象或其他变量，则先查找`install`属性，找到则执行

对于函数声明和表达式？？

在`install`中写入`Vue.mixin`。

```js
a.install = function() {
    vue.mixin({
        beforeCreate() {
            console.log(1);
        }
    })
}
Vue.use(a);
```
# 选项合并
