# 关于Object.defineProperty()
`Object.defineProperty()`用于修改对象**属性**默认的特性。

这些特性包括：
1. 数据属性
```
configurable
enumerable
writable
value
```
2. 访问器属性
```
configurable
enumerable
get
set
```
# 对对象的处理
defineReactive
```js
this.walk(value)

walk(obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
        defineReactive(obj, keys[i])
    }
}
```
直接递归遍历对象的每一个`key`，为每一个`key`加上访问器属性（监听每一个`key`）。
监听对象新增的属性需要用到 $set，手动触发`defineReactive()`。

# 对数组的处理
observe
1. 重写数组
   - 如果有原型链属性，重写原型链 `value.__proto__ = Object.create(Array.prototype)`(value为当前数组)
   - 如果没有原型链属性，遍历当前数组，把当前数组上所有属性的值都定义为新对象上相应属性的值，新对象就是`Object.create(Array.prototype)`
2. 遍历重写的数组，为数组中的每一项增加`observer`实例，如果又遇到数组就递归遍历
3. 重写所有需要改变数组值和索引的方法
    - 直接重写原型链上的某一个方法：执行原始方法，拦截新增，遍历递归，代理新增数组（嵌套数组、对象），为新增属性添加observer，手动触发一次set要做的事情
    - 这些方法有`push`,`pop`,`shift`,`unshift`,`splice`,`sort`,`reverse`

重写数组之后的代理方法，**一开始就要递归遍历**。


# Vue3 Proxy
可以直接监听data的所有域值
懒代理：只有在获取的时候才会递归
