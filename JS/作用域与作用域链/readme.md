<!--
 * @Author       : BigDgreen
 * @Date         : 2020-07-30 08:58:23
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2020-07-30 11:21:01
 * @FilePath     : \前端知识点总结\JS\作用域与作用域链\readme.md
--> 

# 词法作用域
js采用的是词法作用域，也就是静态作用域，**函数的作用域在函数定义的时候就决定了**。

在动态作用域里，函数的作用域在函数调用的时候才决定。

函数执行时生成执行上下文。  

一个函数执行时有执行上下文。

多个函数执行有执行上下文栈（后进先出）。

# 执行过程
函数执行分两步。
1. 进入执行上下文
2. 代码执行

# 变量对象
对于每个执行上下文，都有三个重要属性：
- 变量对象（VO）
- 作用域链（Scope Chain）
- this

变量对象是执行上下文相关的数据作用域，存储了在上下文中定义的**变量和函数声明**。

## 全局上下文
全局上下文的变量对象就是全局对象。

## 函数上下文
在函数上下文中，用活动对象（`AO`）来表示表示变量对象。
  
`AO`和`VO`其实是一个东西，只是`VO`是在规范上或者说引擎上实现的，不能在`JavaScript`环境中访问，只有进行一个执行上下文中，这个执行上下文的变量对象被激活，它上面的各种属性才能被访问。

活动对象是在进入函数上下文是被创建的，它通过函数`arguments`属性初始化。`arguments`属性是`Arguments`对象。  

1. 全局上下文的变量对象初始化是全局对象

2. 函数上下文的变量对象初始化只包括`Arguments`对象

3. 在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值（在这里发生了**声明提升**）

4. 在代码执行阶段，会再次修改变量对象的属性值

# 作用域链 
- 查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。

- 函数作用域在函数定义的时候就决定了。

- 因为函数有一个引擎内部属性`[[scope]]`。函数创建的时候，就会保存所有父变量对象到其中，可以理解 `[[scope]]` 就是所有父变量对象的层级链，但是注意：`[[scope]]` 并不代表完整的作用域链！

# 函数激活
当函数激活时，进入函数上下文，创建 `VO/AO` 后，就会将活动对象添加到作用域的前端，这时候执行上下文的作用域链（`ScopeChain`）:

```js
ScopeChain = [AO].concat([[Scope]])
```


# 具体执行分析
```js
var scope = 'global scope';
function checkscope() {
    var scope = 'local scope';
    function() {
        return scope;
    }
    return fn();
}
checkscope();
```
1. 执行全局代码，创建全局执行上下文，全局上下文被压入执行上下文栈：
    ```js
    ECStack = {
        globalContext
    };
    ```
2. 初始化全局上下文：
   ```js
   globalContext = {
       VO: [global],
       Scope: [globalContext.VO],
       this: globalContext.VO
   }
   ```
3. 在初始化全局上下文的**同时**，`checkscope`函数被创建，保存作用域链到函数内部属性`[[scope]]`：
    ```js
    checkscope.[[scope]] = [globalContext.VO]
    ````
4. 执行`checkscope`函数，创建函数执行上下文，将函数执行上下文压入执行上下文栈：
   ```js
    ECStack = {
        checkscopeContext,
        globalContext
    };
   ```
5. 初始化`checkscope`函数执行上下文：
   
   1. 复制函数的`[[scope]]`属性创建作用域链
   2. 使用`arguments`创建`AO`
   3. 初始化`AO`，加入形参、变量声明、函数声明
   4. 将`AO`加入`checkscope`作用域链的顶端
   ```js
   checkscopeContext = {
       AO: {
           arguments: {
               length: 0
           },
           scope: undefined,
           f: reference to function f() {}
       },
       Scope: [AO, globalContext.VO],
       this: window // 严格模式下是undefined
   }
   ```
6. 初始化`checkscope`函数执行上下文的同时，f 函数被创建。保存作用域到 f 函数的内部属性`[[scope]]`：
   ```js
    f.[[scope]] = [checkscope.AO, globalContext.VO]
   ````
7. 执行 f 函数，创建函数执行上下文，将函数执行上下文压入执行上下文栈：
   ```js
    ECStack = {
        fContext,
        checkscopeContext,
        globalContext
    };
   ```
8. 初始化 f 函数执行上下文：
   
   1. 复制函数的`[[scope]]`属性创建作用域链
   2. 使用`arguments`创建`AO`
   3. 初始化`AO`，加入形参、变量声明、函数声明
   4. 将`AO`加入`f`作用域链的顶端
   ```js
   checkscopeContext = {
       AO: {
           arguments: {
               length: 0
           }
       },
       Scope: [AO ,checkscope.AO, globalContext.VO],
       this: window // 严格模式下是undefined
   }
   ```
    3、4、5与6、7、8完成操作相同，只是针对不同的函数。

9. f 函数执行，沿着作用域链查找`scope`变量的值，然后返回`scope`
10. f 函数执行完毕后，f 函数上下文从函数执行上下文栈中弹出。
   ```js
    ECStack = {
        checkscopeContext,
        globalContext
    };
   ```
11. `checkscope` 函数执行完毕后，`checkscope` 函数上下文从函数执行上下文栈中弹出。
   ```js
    ECStack = {
        globalContext
    };
   ```

# 关于闭包
当闭包函数中使用某一变量时，在闭包函数作用域中没有找到，就去`[[scope]]`上查找，`[[scope]]`上存储的有父级函数的`AO`，`AO`对象中有变量声明。如果父级AO上没有找到变量，就继续沿着作用域链找，直到找到全局作用域，如果最后没有找到，就抛出`ReferenceError`。

当外层函数执行完毕后，从执行栈中弹出，但内层函数的执行上下文维护了一个作用域链（Scope），作用域链中有对外层函数的引用，因此不会被当成垃圾回收。

