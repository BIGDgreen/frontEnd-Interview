# 箭头函数为什么不能new
为了创建一个新对象，函数应该具有一个内部方法`[[construct]]`和`prototype`属性。箭头函数没有。

箭头函数用babel转义后有`property`属性，为什么它本身没有呢？