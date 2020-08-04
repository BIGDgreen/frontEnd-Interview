<!--
 * @Author       : BigDgreen
 * @Date         : 2020-06-28 17:27:19
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2020-08-04 10:35:46
 * @FilePath     : \前端知识点总结\面试\Webpack\readme.md
--> 
# webpack作用、实现原理
依赖管理：方便引用第三方模块、让模块更容易复用、避免全局注入导致的冲突、避免重复加载或加载不需要的模块。

合并代码：把各个分散的模块集中打包成大文件，减少HTTP的请求链接数，配合UglifyJS可以减少、优化代码的体积。

各路插件：babel把ES6+转译成ES5-，eslint可以检查编译期的错误……

原理：最简单地说，就是分析代码，找到require、exports、define等“关键词”，并替换成对应模块的“引用“

webpack的理念就是一切皆模块，把一大堆的css,js在一个总入口文件require引入，剩下的事情，webpack会自动处理，包括所有模块的前后端依赖关系打包压缩合并成一个js，公共代码抽离另外生成为js，某些制定的js单独打包...

这些模块可以是css/js/image/fonts。

# babel原理
babel工作分为三大阶段：
1. 解析
将代码字符串解析为抽象语法树；
将整个代码分割成语法单元，进而再分析语法单元之间的关系；
这一步会验证语法的正确性，同时由字符串变为对象结构后更有利于精准地分析以及进行代码结构调整。
2. 转换
遍历抽象树，对抽象语法树进行再变换；这一步是babel或者其他编译器中最为复杂的过程。
3. 生成
递归变换后的抽象语法树再生成代码字符串。

# 常见loader和plugin
**常用loader：**
- 样式：style-loader、css-loader、less-loader、sass-loader等

- 文件：raw-loader、file-loader 、url-loader等

- 编译：babel-loader、coffee-loader 、ts-loader等

- 校验测试：mocha-loader、jshint-loader 、eslint-loader等

**常用plugin：**
- html-webpack-plugin
- extract-text-webpack-plugin
- UglifyJsPlugin（压缩和混淆代码）
- CommonsChunkPlugin（提高打包效率，将第三方库和业务代码分开打包）
- HotModuleReplacementPlugin（热更新）

# plugin和loader的区别
loader 用于加载某些资源文件。

因为 webpack 只能理解 JavaScript 和 JSON 文件，对于其他资源例如 css，图片，或者其他的语法集，比如 jsx， coffee，是没有办法加载的。 这就需要对应的loader将资源转化，加载进来。从字面意思也能看出，loader是用于加载的，它作用于一个个文件上。

plugin 用于扩展webpack的功能。

它直接作用于 webpack，扩展了它的功能。当然loader也是变相的扩展webpack，但是它只专注于转化文件（transform）这一个领域。而plugin的功能更加的丰富，而不仅局限于资源的加载。

# 提高webpack构建速度

# 优化打包/编译速度
dil

编译为什么会变慢？

# HMR原理

# 实现按需加载
