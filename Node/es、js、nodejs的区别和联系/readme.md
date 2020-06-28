@[TOC](目录)
# ECMAScript、JavaScript、nodejs的区别和联系

首先简单介绍一下：
## ECMAScript
- 定义了**语法**，这是写`JavaScript`和`nodejs`都必须遵守的
  - 语法包含变量定义、循环、判断、函数，原型和原型链、作用域和闭包、异步
- 不能操作`DOM`，不能监听`click`事件，不能发送`ajax`请求
- 不能处理`http`请求，不能操作文件
- ECMAScript仅仅是一个语法规范

## JavaScript
- 使用`ECMAScript`语法规范，外加`Web API`（使用W3C标准），缺一不可
- `Web API` 包含 `DOM` 操作，`BOM` 操作，事件绑定，`Ajax` 等
- 两者结合（es语法规范+web api），即可完成**浏览器端**的任何操作
- 基于js引擎，不同的浏览器有不同的js引擎

## Node.js
- 使用`ECMAScript`语法规范，外加`nodejs API`，缺一不可
- `nodejs API`包含`OS`（操作系统模块）、`file`（文件系统模块）、`net`（网络系统模块）、`database`（数据库模块）
- 两者结合（es语法规范+nodejs api），即可完成**服务端**的任何操作
- 基于Google的V8引擎，执行速度快，性能很好

## 联系
```
	nodejs = ECMAScript + nodejs API
	JavaScript = ECMAScript + Web API = ECMAScript + DOM + BOM
```
`Node.js`就是运行在服务端的`JavaScript`。`Node.js`是一个异步的（非阻塞I/O）事件驱动的`JavaScript`运行时。

## js与nodejs的区别
- 运行环境：
	- `JavaScript`运行在浏览器端
	- `nodejs`运行在服务端
- 全局对象
	- `JavaScript`全局对象为`window`
	- `nodejs`全局对象为`global`
- 全局属性
	- `JavaScript`中定义的全局变量可以通过`window`访问
	- `nodejs`中定义的全局属性不能通过`global`访问（因为在`nodejs`中定义的变量是模块中的对象，而并不是`global`全局变量）
- 模块化
	- `JavaScript`的模块化经历如下过程：CommonJS规范-->AMD规范-->CMD规范-->ES6模块化
	- `nodejs`采用的是`CommonJs`规范，使用`require module.exports`的写法，不支持ES6中`import export`的写法
  
最后补充一下js引擎的相关知识：
# js引擎简单介绍

**Google**

 - V8，是 Chrome 浏览器的一部分，用 C++ 开发。V8引擎可以独立运行，也可以嵌入到 C++ 应用程序中。
  
**微软**

- Chakra（JScript引擎），用于Internet Explorer 9的32位版本。

**Mozilla**

- SpiderMonkey，第一款JavaScript引擎，用于Mozilla Firefox 1.0～3.0版本。

- Rhino，由Mozilla基金会管理，开放源代码，完全以Java编写。

- TraceMonkey，基于实时编译的引擎，其中部份代码取自Tamarin引擎，用于Mozilla Firefox 3.5～3.6版本。

- JaegerMonkey，结合追踪和组合码技术大幅提高性能，部分技术借凿了V8、JavaScriptCore、WebKit，用于Mozilla Firefox 4.0以上版本。

**Opera**
- Linear A，用于Opera 4.0～6.1版本。
- Linear B，用于Opera 7.0～9.2版本。
- Futhark，用于Opera 9.5～10.2版本。
- Carakan，由Opera软件公司编写，自Opera10.50版本开始使用。

**其它**
- KJS，KDE的ECMAScript/JavaScript引擎，最初由Harri Porten开发，用于KDE项目的Konqueror网页浏览器中。
- Narcissus，开放源代码，由Brendan Eich编写（他也参与编写了第一个SpiderMonkey）。
- Tamarin，由Adobe Labs编写，Flash Player 9所使用的引擎。
- Nitro（原名SquirrelFish），为Safari 4编写。

以上来自百度百科[javascript引擎](https://baike.baidu.com/item/javascript%E5%BC%95%E6%93%8E/5356108?fr=aladdin)