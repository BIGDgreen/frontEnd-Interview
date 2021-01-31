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

# TypeScript

- TS相比于JS多了...?
  - 类型系统
  - 预实现的ES提案语法, 如可选链与空值合并

- type 与 interface 的异同

- Class 增强 -> 关键字

- 类型编程

  > 推荐阅读: [TypeScript 类型编程初探](https://linbudu.top/posts/2020/05/30/ts%E7%B1%BB%E5%9E%8B%E7%BC%96%E7%A8%8B%E5%88%9D%E6%8E%A2.html)
  >
  > 深入点: [TypeScript的另一面: 类型编程](https://linbudu.top/posts/2020/10/19/typescript%E7%B1%BB%E5%9E%8B%E7%BC%96%E7%A8%8B.html)

  - 泛型
  - 条件类型
    - 分布式有条件类型
  - 映射类型
  - 索引类型
  - 类型守卫 & is 关键字
  - infer
  - 工具类型
    - Partical PowerPartical(深层 Partical)
    - Exclude
    - Pick
    - 扩展: 自定义工具类型, 见上面的博客链接

- 装饰器 / IoC 体系

- 声明文件
