# 8种基本数据类型
- `number`
- `string`
- `boolean`
- `null`
- `undefined`
- `symbol`
- `bigint`
- `object`

# 基本类型和引用类型
前7种为基本类型，最后一种为引用类型。

其中，引用类型中包括
- `array数组`
- `object对象`
- `function函数`
- 特殊对象：`Date`、`RegExp`
- ES6新增类型`set`、`map`、`weakSet`、`weakMap`等。

关于数组可以这么理解：数组的键是按顺序排列的索引，值就是当前值，因此可以看作是一种特殊的对象。

## 基本类型和引用类型的区别
- 基本类型按值访问，引用类型按引用访问
- 基本类型按值存储在栈内存中
- 引用类型按引用存储，指针存在栈内存中，指针指向的具体内容存储在堆内存
- 基本类型不能动态添加属性

# 栈内存和堆内存
放上《高程3》上的图。

**基本类型的值复制：**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200729192517965.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)
**引用类型的值复制：**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200729192545613.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)


先忽略复制后的变量对象，从图中可以看到基本类型和引用类型的存储方式。对于引用类型的那个图中，左边就是栈内存，右边是堆内存。基本类型直接将值存储在栈内存中，引用类型将指针存储在栈内存中。

然后在考虑一下复制问题，从图中可以看到：
- 基本类型的复制是另开一个空间，存储与被复制值相同的值
- 引用类型的复制也在栈内存中另开了一个空间，但两个对象的指针指向堆内存中的同一个值

# 深拷贝
由上面引用类型的复制问题可以知道，当`obj2`中的值发生变化时，`obj1`也会变化。因为`obj2`值的变化实际上是堆内存中的对象发生变化，而`obj1`和`obj2`指向同一个对象，因此他们的变化是同步的。

```js
let obj1= {a:1, b:2};
let obj2 = obj1;
console.log(obj1) // {a: 1, b: 2}
console.log(obj2) // {a: 1, b: 2}
obj1.a = 2;
console.log(obj1) // {a: 2, b: 2}
console.log(obj2) // {a: 2, b: 2}
```

对于深拷贝，有三种解决方案：
**1. 简陋版：用json的内置方法：**
这种方法在业务中最常见。
```js
/**
 *json实现对象深拷贝
 *
 * @param {Object || Array} source
 * @returns
 */
function deepClone(source) {
  return JSON.parse(JSON.stringify(source));
}
```

**2. 普通版：递归实现：**
```js
/**
 *递归实现对象深拷贝
 *
 * @param {Object || Array} source
 * @returns
 */
function deepClone(source) {
  if(typeof source !== "object") return source; // 浅拷贝
  let target = source instanceof Array ? [] : {};
  for(let key in source) {
    // 数组索引，对象键值
    target[key] = typeof source[key] === 'object' ? deepClone(source[key]) : source[key];
  }
  return target;
}
```
缺点：无法深拷贝正则、拷贝函数和存在循环引用。

**3. 终极版**

考虑Date、RegExp、Symbol、BigInt等一切属性的拷贝和循环引用。

```js
const deepClone = (obj, hash = new WeakMap) => {
    if(hash.has(obj)) return obj;
    let types = [Date, RegExp, Map, WeakMap, Set, WeakSet];
    let Obj = obj.constructor;
    if(types.includes(Obj)) return new Obj(obj);

    const allDes = Object.getOwnPropertyDescriptors(obj);
    let cloneObj = Object.create(Object.getPrototypeOf(obj), allDes);

    hash.set(obj, cloneObj);

    Reflect.ownKeys(obj).forEach(key => {
        let curVal = obj[key];
        cloneObj[key] = (typeof curVal === 'object' && curVal !== null) ? deepClone(obj, hash) : curVal;
    })

    return cloneObj;
}
```

# 数据类型判断
三种方式：
1. `typeof`
   
   可以轻松判别除`null`外的基本类型（包括`bigint`和`symbol`）和`function`，对于引用类型和`null`，返回`object`。
2. `instanceof`
   
   这种方法通过原型链来识别。如果变量是给定引用类型的实例就返回`true`，否则返回`false`。

   缺点：当存在多个全局作用域（比如多个`frame`）时，就可能导致判断不准确。因为这时会存在多个`window`。比如：

   ```js
   var isArray = value instanceof Array;
   ```

   该函数要返回`true`，`value`必须是一个数组，并且与`Array`在同一个全局作用域，因为`Array`是`window`的属性。如果`value`是在另一个`frame`中定义的数
   组，那么就会返回`false`。

  
3. `Object.prototype.toString().call()`
   
   返回一个`[object NativeConstructor]`格式的字符串。这种方法是利用引擎内部实现的类的`[[Class]]`属性，找到要判断的值的构造函数。这种方法与全局作用域无关。

    得到的结果具体有：
    - `[object Undefined]`
    - `[object Null]`
    - `[object Map]`
    - `[object Set]`
    - `[object Array]`
    - `[object Object]`
    - `[object Arguments]`
    - `[object Boolean]`
    - `[object Date]`
    - `[object Number]`
    - `[object String]`
    - `[object Symbol]`
    - `[object Error]`
    - `[object RegExp]`
    - `[object Function]`

# 0.1 + 0.2 问题
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200729192646249.png)

从图中可以看到`0.1+0.2`与`0.3`是不相等的。

说明：这是基于`IEEE754`数值浮点计算的通病，并不是`ECMAScript`所特有。

## 原因
参考 [http://0.30000000000000004.com/](http://0.30000000000000004.com/) 上的解释：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200729192404822.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70#pic_center)
在十进制的世界中，我们可以准确地表示`1/2`，`1/4`，`1/5`，`1/8`，`1/10`，因为这些分母的质因子都包含在10的质因子（2，5）中。而当我们表示`1/3`，`1/6`，`1/7`时，就不能得到精确的答案。

而在二进制的世界里（也就是计算机世界），相应地，我们就只能准确表示分母是以2为质因子的分数，比如`1/2`，`1/4`，`1/8`。而其他的数，比如`1/5`和`1/10`转化为十进制的数时就会失真。也就是说，`1/5`和`1/10`在二进制的世界中是无限循环小数，64bit的空间是存储不下的，因此`IEEE754`编码会做一个近似运算，保留了一个余数，而这个余数在转换为十进制的时候依然存在。

## 解决方案
1. 将数字转化为字符串相加减
2. 将浮点数转化为整数相加，然后在除以10（的倍数）
3. 使用[math.js](https://mathjs.org/)或者其他的库函数