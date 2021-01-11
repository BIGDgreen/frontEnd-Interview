# this指向
## 对于普通函数
1. `new`绑定：this指向构造函数调用中的this上，即this指向新创建的对象。
2. 显式绑定：使用`bind`、`call`、`apply`，this指向函数中的第一个参数。如果第一个参数不是对象，会先用`ToObject`操作将其转换为对象（装箱）。当第一个参数为`null`时，使用默认绑定。
3. 隐式绑定：谁调用指向谁。
4. 默认绑定：函数体处于严格模式this被绑定到undefined，否则，this被绑定到window。

以上规则，从上往下优先级依次降低。

### new绑定的优先级为什么那么高？
从[运算符的优先级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)中可以看到：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200729205256899.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)

`new`的优先级小于成员访问，函数先调用`call`或者其他成员函数，然后再被`new`。而`new`时又改变了函数的`this`。

使用`new`调用构造函数会经历如下过程：
1. 创建一个对象
2. 将构造函数的作用域赋给新对象
3. 执行构造函数中的代码
4. 返回新对象

关于`new`的实现机制，可以参考下面的代码：

```js
function myNew() {
    let obj = new Object(); // 寄生对象
    let Constructor = Array.prototype.shift.call(arguments);    // 第一项参数，即构造函数
    obj.__proto__ = Constructor.prototype;  // 核心代码，确定实例与构造函数的关系，这样obj就可以访问到构造函数原型中的属性
    let res = Constructor.apply(obj, arguments);    // 执行构造函数中的内容，返回res。注意在这个地方将this绑定到了obj上
    return typeof res === 'object' ? res : obj; // 如果返回结果不是对象，就返回一个空对象
}
```
关于`call/apply/bind`的实现原理，可以在[实现call&apply&bind](https://github.com/BIGDgreen/frontEnd-Interview/tree/master/%E6%89%8B%E5%86%99%E7%B3%BB%E5%88%97/%E5%AE%9E%E7%8E%B0call%26apply%26bind)上查看。

注意：当存在多个 `bind` 时，不管给函数 `bind` 几次，`fn` 中的 `this` 永远由第一次 `bind` 决定。

## 对于箭头函数
- `this` 来自作用域链，由于作用域链在函数进入上下文时就已经确定，因此 `this` 与函数执行时无关。箭头函数中的 `this` 只取决包裹箭头函数的第一个普通函数的 `this` 。
- 在箭头函数中，通过 `call()`或 `apply()` 方法调用一个函数时，只能传递参数，他们的第一个参数会被忽略。

另外要注意的是：**箭头函数不能用作构造器，和 new 一起用会抛出错误。**

## 作为一个DOM事件处理函数
- this指向触发事件的元素，也就是始事件处理程序所绑定到的DOM节点。
  
# 题目分析
结合几个题目具体分析一下：

1. 含new的情况
```js
function Foo() {
    getName = function () { console.log(1); };
    return this;
}
Foo.getName = function () { console.log(2);};
Foo.prototype.getName = function () { console.log(3);};
var getName = function () { console.log(4);};
function getName() { console.log(5);}

//请写出以下输出结果：
Foo.getName();  // 2
getName();  // 4 函数声明提升和变量声明提升，函数声明提升优先，之后变量赋值覆盖函数声明
Foo().getName();    // 1 相当于window.getName() Foo()执行时改变了getName
getName();  // 1 还是window.getName()
new Foo.getName();  // 2 .运算符优先级大于new，实际上是 new (Foo.getName)()
new Foo().getName();    // 3  相当于(new Foo()).getName()
new new Foo().getName(); // 3 
```

2. 含箭头函数和闭包的情况
```js
var name = 'window'

var person1 = {
  name: 'person1',
  show1: function () {
    console.log(this.name)
  },
  show2: () => console.log(this.name),
  show3: function () {
    return function () {
      console.log(this.name)
    }
  },
  show4: function () {
    return () => console.log(this.name)
  }
}
var person2 = { name: 'person2' }

person1.show1() // person1
person1.show1.call(person2) // person2

person1.show2() // window 箭头函数的this绑定在父级作用域
person1.show2.call(person2) // window

person1.show3()()   // window 可以理解为let foo1 = person1.show3(); foo1();
person1.show3().call(person2)   // person2 继续引用上面的foo1，这个可以理解为foo1.call(person2)
person1.show3.call(person2)()   // window let foo2 = person1.show3.call(person2); foo2();

person1.show4()()   // person1 let foo3 = person1.show4(); foo3(); 这时foo3是个箭头函数，this指向父级作用域，而父级函数被person1调用，因此this指向person1
person1.show4().call(person2) // person1 foo3箭头函数会忽略call的第一个参数
person1.show4.call(person2)() // person2 父级函数被绑定到了person2
```

3. 综合分析，这个就不给解释了
```js
var name = 'window'

function Person (name) {
  this.name = name;
  this.show1 = function () {
    console.log(this.name)
  }
  this.show2 = () => console.log(this.name)
  this.show3 = function () {
    return function () {
      console.log(this.name)
    }
  }
  this.show4 = function () {
    return () => console.log(this.name)
  }
}

var personA = new Person('personA')
var personB = new Person('personB')

personA.show1() // personA
personA.show1.call(personB) // personB

personA.show2() // personA
personA.show2.call(personB) // personA

personA.show3()() // window
personA.show3().call(personB) // personB
personA.show3.call(personB)() // window

personA.show4()()   // personA
personA.show4().call(personB) // personA
personA.show4.call(personB)() // personB
```
