<!--
 * @Author       : BigDgreen
 * @Date         : 2020-06-28 17:27:19
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2020-08-04 09:44:20
 * @FilePath     : \前端知识点总结\面试\TypeScript\readme.md
--> 
# TypeScript是什么
`TypeScript` 是微软开发一款开源的编程语言，它是 `JavaScript` 的一个**超集**，本质上是**为 `JavaScript` 增加了静态类型声明**。任何的 `JavaScript` 代码都可以在其中使用，不会有任何问题。`TypeScript` 最终也会被编译成 `JavaScript`，使其在浏览器、`Node` 中等环境中使用。

静态类型语言和动态类型语言得核心区别在于，静态类型语言（statically-typed languages）会在编译时（compile time）进行类型检查，而动态语言（dynamically-typed）则是在运行时进行类型检查（runtime）。

# TypeScript的优点(为什么要使用ts)
- 更好的可维护性和可读性
- 引入了静态类型声明，不需要太多的注释和文档，大部分的函数看类型定义就知道如何使用了
- 在编译阶段就能发现大部分因为变量类型导致的错误
  
# TypeScript基本类型
- boolean
- number
- string
- void
- null
- undefined
- any
- array（类型+方括号、泛型）
- enum
  
类(Classes)、泛型(Generics)、接口(Interfaces)

# TypeScript的泛型
设计泛型的关键目的是在成员之间提供有意义的约束，这些成员可以是：

- 类的实例成员
- 类的方法
- 函数参数
- 函数返回值

类型断言


# never类型
never 类型是 TypeScript 中的底层类型。它自然被分配的一些例子：

- 一个从来不会有返回值的函数（如：如果函数内含有 `while(true) {}`）；
- 一个总是会抛出错误的函数（如：`function foo() { throw new Error('Not Implemented') }`，foo 的返回类型是 never）；

`never` 类型仅能被赋值给另外一个 `never`

# interface
## 使用场景
为后端返回的数据做类型声明。
# d.ts是什么
typescript的描述文件（声明文件）

# TypeScript是如何编译的

# namespace / module
