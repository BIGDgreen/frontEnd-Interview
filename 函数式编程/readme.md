# 几个概念
## 函数式编程
函数式编程是一种范式，我们能够以此创建**仅依赖输入**就可以完成自身逻辑的函数。这保证了**当函数被多次调用时仍然返回相同的结果**。函数**不会改变任何外部环境的变量**，这将产生可缓存的、可测试的代码库。

## 引用透明性
引用透明性是指所有的函数对于相同的输入都将返回相同的值。

那么在调用这个函数的时候，我们不必关心函数内部的实现，只用结果就好。你可以储存这个结果，甚至直接用结果去替换函数的调用。

## 命令式和声明式
命令式就是告诉编译器如何做。

比如，遍历一个数组：
```js
const array = [1, 2, 3];
for(let i = 0; i < array.length; i++) {
    console.log(array[i]);
}
```
声明式是告诉编译器做什么。

同样是遍历一个数组：

```js
const array = [1, 2, 3];

array.forEach(item => {
    console.log(item);
})
```

在**命令式**中，我们写出了实际遍历的过程，比如`获得数组长度，循环数组，用索引获取每一个元素等`，从而告诉了编译器怎么遍历这个数组。

而在**声明式**中，我们用了一个抽象函数`forEach`，我们不关心它是怎么遍历的，而只是让他遍历了。

很明显，函数式编程主张声明式，以抽象的方式创建函数。这也使得代码更容易被复用。

## 纯函数
1. 如果给定相同的参数，则返回结果也相同
   返回结果只与参数有关，这就是说，对于一个函数，给定输入后，它的输出是可预期的。不依赖任何外部变量。

2. 无明显副作用
   不能修改其他作用域中的值。不改变任何外部变量。

以上也可以理解为，纯函数是独立的，与其他任何外部变量都无关。

在函数式编程中，我们写的函数往往都是纯函数。函数只做一件事情，通常我们通过函数名称就能知道它做的事情。

## 组合和管道
组合就是将上一个基础函数的输出作为下一个函数的输入。数据流从右向左。通过组合各个但功能函数可以得到一个多功能函数。

举个例子，现在要求取出一个数组中所有大于2的数，然后按从小到大的顺序排列：
```js
const moreThan2 = (arr) => arr.filter(item => item > 2)
const sortAsc = (arr) => arr.sort((a,b) => a - b)

const moreThan2Rounding = (arr) => sortAsc(moreThan2(arr))
```

管道与组合的数据流方向正好相反，他是从左向右。

对于管道和组合的函数封装，可以参看最下面的工具函数。

## 高阶函数
高阶函数是接收函数作为参数并且/或者返回函数作为输出的函数。

感觉就是套娃函数。

高级函数往往会用到闭包。

## 函子
函子可以看作是一个有`map`方法的类。`map`方法的主要作用是将当前函数中的值映射到另一个函数。

比如：
```js
class Functor {
    constructor(val) {
        this.val = val;
    }
    
    /**
     *生成函子的实例
     *
     * @param {*} val
     * @returns
     * @memberof Functor
     */
    of(val) {
        return new Functor(val)
    } 

    /**
     *返回一个被fn处理过的函子
     *
     * @param {function} fn
     * @returns
     * @memberof Functor
     */
    map(fn) {
        return new Functor(fn(this.val));
    }
}
```

以上就是一个函子。

特别的，还有处理空值的函子`Maybe函子`，处理类似于条件运算的函子`Either`函子和扁平化函子取值的函子`Monad函子`。

### Maybe函子
```js
class Maybe extends Functor {
  map(f) {
    return this.val ? Maybe.of(f(this.val)) : Maybe.of(null);
  }
}
```
使用这个函子时，处理空值就不会出错了。
### Either函子
Either函子有左值和右值，map会根据不同的条件生成不同的实例。
```js
class Either extends Functor {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  map(f) {
    return this.right ? 
      Either.of(this.left, f(this.right)) :
      Either.of(f(this.left), this.right);
  }
}

Either.of = function (left, right) {
return new Either(left, right);
};
```
### Monad函子
Monad函子总是返回一个单层的函子。这避免了`val`为函子时的嵌套。
```js
class Monad extends Functor {
  join() {
    return this.val;
  }
  flatMap(f) {
    return this.map(f).join();
  }
}
```

# 实战
让我们试着将几个简单的函数用函数式编程的思想改造一下。
## 计税函数
**版本1：**
```js
const percentValue = 5;
const calculateTax = value => value / 100 * (100 + percentValue)
```
该函数的结果依赖于传入的参数`value`和全局变量`percentValue`。一旦全局变量发生变化，该函数的结果也会相应的改变。因此该函数与外部环境始终存在一个纽带，无法做到独立。这就不符合函数式编程中的确定性。

因此稍加改变：

**版本2：**
```js
const calculateTax = (percentValue, value) => value / 100 * (100 + percentValue)
```

将percentValue加到函数参数中，此时该函数就变成了纯函数。

但这样一来，我们就必须每次传入两个参数。在某一个参数长期不变的情况下这样是很不方便的。就比如说，如果`percentValue`在很长一段时间都是5，那每次在调用函数的时候都传入一个5，显然有些繁复。

于是，我们可以用柯里化，将该二元函数（双参数函数）转化成一元函数（单参数函数）。

**版本3：**
```js
const calculateTax = percentValue =>
    value =>
        value / 100 * (100 + percentValue);

```
这时，可以用`const fivePerTax = calculateTax(5);`保存`percentValue`为5时的函数。然后调用`fivePerTax`，传入`value`得到最后的结果：
```js
const fivePerTax = calculateTax(5);
console.log(fivePerTax(2)); // 2.1
```

# 几个在函数式编程中常用的工具函数
## 1. 将函数变成柯里化函数
   柯里化就是将多元函数通过闭包的方式转化成一个嵌套的一元函数。
   
   柯里化可以保存前面的参数，就比如上面计税函数的例子。在这个例子中，如果坚持将`percentValue`放在参数的第二个位置，就需要用到偏函数了。
```js
/**
 * 多元函数柯里化
 * @param {function} binaryFn 
 */
const curry = (fn) => {
    if (typeof fn !== 'function') {
        throw new Error('No function provided')
    }
    return function curriedFn(...args) {
        // fn.length为fn函数的参数个数
        if (args.length < fn.length) {
            // 递归调用curriedFn
            return function (...innerArgs) {
                return curriedFn.apply(null, args.concat(innerArgs))
            }
        }
        return fn.apply(null, args)
    };
};
```

## 2. 将函数变成偏函数
   柯里化函数其实可以说是偏函数的一种特殊实现，偏函数允许你固定任意位置的参数，而柯里化只能从左往右依次固定。
```js
/**
 * 将函数变成偏函数
 * 在particalArgs处传入全部参数，未知参数用undefined代替。
 * 在下一个函数调用中传入剩余参数，该参数实际将被放到上面留的undefined位置。
 * @param {function} fn 
 * @param  {array} particalArgs 
 */
const partical = function (fn, ...particalArgs) {
    let args = particalArgs;
    return function (...fullArguments) {
        let arg = 0;
        for (let i = 0; i < args.length && arg < fullArguments.length; i++) {
            if (args[i] === undefined) {
                args[i] = fullArguments[arg++];
            }
        }
        return fn.apply(null, args);
    };
};
```

**简单应用**
如果坚持在计税函数的第二个版本中将`percentValue`作为第二个参数，就可以用偏函数：
```js
const calculateTax = (value,percentValue) => value / 100 * (100 + percentValue);
const fivePerTax = partical(calculateTax, undefined, 5);
console.log(fivePerTax(2)); // 2.1
```
## 3. 组合函数
```js
/**
 * 将后一个函数的返回值传给前一个函数，实现函数组合
 * @param {array} fns 
 * @returns {function}
 */
const compose = (...fns) =>
    (value) =>
        reduce(fns.reverse(), (acc, fn) => fn(acc), value)
```
## 4. 管道函数
```js
/**
 * 将前一个函数的返回值传给后一个函数，实现函数管道
 * @param {array} fns 
 * @returns {function}
 */
const pipe = (...fns) =>
    (value) =>
        reduce(fns, (acc, fn) => fn(acc), value)
```
**注意：** 为了代码风格的统一，组合函数和管道函数建议直选一种使用。