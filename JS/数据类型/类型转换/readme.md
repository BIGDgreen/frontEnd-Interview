<!--
 * @Author       : BigDgreen
 * @Date         : 2020-07-17 21:41:42
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2021-01-08 10:23:03
 * @FilePath     : \前端知识点总结\JS\数据类型\类型转换\readme.md
-->
## 装箱和拆箱

**装箱**：把基本类型转化为相应的对象。分为显式与隐式。

隐式装箱：
1. 读取基本类型的值，后台创建一个临时的该基本类型所对应的对象。
2. 对基本类型调用方法，实际是在该基本类型的对象上调用方法。
3. 执行方法后该对象立马销毁。

显式装箱：
用内置对象例如 `Number`、`Boolean`、`String`、`Object` 等对基本类型进行显式装箱。

**拆箱**：把引用类型转化为基本类型。

拆箱的本质是：
1. 如果 `val` 是 `object`，则会先执行 `valueOf()` 方法，如果结果为原始值，则返回此结果；
2. 否则再调用 `toString` 方法；如果得出结果为原始值，则返回结果，否则抛出异常

## 字符串转数组
let str = '213';

1. Array.from(str);
2. [...new Set(str)];
3. Array.prototype.slice.call(str)
4. str.split('');

## 类数组对象转数组
Arguments 对象就是一个类数组对象。在客户端 JavaScript 中，一些 DOM 方法(document.getElementsByTagName()等)也返回类数组对象。
```js
var arrayLike = {
    0: 'name',
    1: 'age',
    2: 'sex',
    length: 3
}
```

1. slice
```
Array.prototype.slice.call(arrayLike);
```

2. splice
```
Array.prototype.splice.call(arrayLike, 0); // ["name", "age", "sex"] 
```
3. ES6 Array.from
```
Array.from(arrayLike); // ["name", "age", "sex"]
```
4. apply
```
Array.prototype.concat.apply([], arrayLike)
```
5. ES6 ... 展开符
```
... arrayLike
```

### `Array.from()`与 `...` 展开符的区别
使用展开符，展开对象必须可迭代

## 转对象
创建对象的方式：
1. 字面量
2. 构造函数
3. `Object.create()`

创建空对象：`Object.create(null)`，不会创建`Object.prototype`这个委托，比`{}`更空。

## 对象转原始类型
对象在转换类型的时候，会调用内置的 `[[ToPrimitive]]` 函数，对于该函数来说，算法逻辑一般来说如下：

- 如果已经是原始类型了，那就不需要转换了
- 调用 x.valueOf()，如果转换为基础类型，就返回转换的值
- 调用 x.toString()，如果转换为基础类型，就返回转换的值
- 如果都没有返回原始类型，就会报错

