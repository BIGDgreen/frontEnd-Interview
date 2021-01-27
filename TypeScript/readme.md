<!--
 * @Author       : BigDgreen
 * @Date         : 2020-09-06 09:43:47
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2020-09-09 16:14:54
 * @FilePath     : \前端知识点总结\TypeScript\readme.md
-->
1. 基础的变量类型
2. 数组的一些基础的操作
3. 函数和类 ES 抽象方法 接口声明
4. 学一门后端语言 进一步掌握 TS
5. 类型推断 string | number
6. 泛型！！！`<T>()` redux文章 `<T<A>>` interface && type
7. interface接口 class实现 写库的时候一般就是声明interface
8. 装饰器 TS高级应用 AOP　IOC
9. 非空操作符 `! ? ??` ES2020
10. 实战技巧 `cretaRef<null>(null!)`
11. 代码提示和相关sdk的开发 d.ts的时候
12. this的关键小操作

性能相关：

保证传入参数的类型一致，提升 V8 编译性能。

如果一个函数被多次调用并且参数一直传入某一类型，那么 V8 会认为该段代码可以编译为 Machine Code，因为固定了类型，不需要再执行很多判断逻辑了。但是如果一旦我们传入的参数类型改变，那么 Machine Code 就会被 DeOptimized 为 Bytecode，这样就有性能上的一个损耗了。所以如果我们希望代码能多的编译为 Machine Code 并且 DeOptimized 的次数减少，就应该尽可能保证传入的类型一致。