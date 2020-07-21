对于普通函数：
1. `new`绑定：this指向构造函数调用中的this上，即this指向新创建的对象。
2. 显式绑定：使用`bind`、`call`、`apply`，this指向函数中的第一个参数。如果第一个参数不是对象，会先用`ToObject`操作将其转换为对象（装箱）。当第一个参数为`null`时，使用默认绑定。
3. 隐式绑定：谁调用指向谁。
4. 默认绑定：函数体处于严格模式this被绑定到undefined，否则，this被绑定到window。

以上规则，从上往下优先级依次降低。

对于箭头函数：
- this指向父级作用域，并始终保持不变。
- 在箭头函数中，通过 call() 或 apply() 方法调用一个函数时，只能传递参数，他们的第一个参数会被忽略。

另外要注意的是：箭头函数不能用作构造器，和 new 一起用会抛出错误。

作为一个DOM事件处理函数：
- this指向触发事件的元素，也就是始事件处理程序所绑定到的DOM节点。
  
题目：

1.
```js
function Foo() {
    getName = function () { alert (1); };
    return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);}

//请写出以下输出结果：
Foo.getName();  // 2
getName();  // 4 函数声明提升和变量声明提升，函数声明提升优先，之后变量赋值覆盖函数声明
Foo().getName();    // 1 相当于window.getName() Foo()执行时改变了getName
getName();  // 1 还是window.getName()
new Foo.getName();  // 2 .运算符优先级大于new，实际上是 new (Foo.getName)()
new Foo().getName();    // 3  相当于(new Foo()).getName()
new new Foo().getName(); // 3 
```
2.
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

person1.show2() // window
person1.show2.call(person2) // window

person1.show3()()   // window
person1.show3().call(person2)   // person2
person1.show3.call(person2)()   // window

person1.show4()()   // person1
person1.show4().call(person2) // person1
person1.show4.call(person2)() // window
```

3.
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
