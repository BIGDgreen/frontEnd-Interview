# 页面生命周期
onLoad 监听页面加载

onShow 监听页面显示

onReady 监听页面初次渲染完成

onHide 监听页面隐藏

onUnload 监听页面卸载

# 组件生命周期
created 在组件实例刚刚被创建时执行

attached 在组件实例进入页面节点树时执行

ready 在组件在视图层布局完成后执行

moved 在组件实例被移动到节点树另一个位置时执行

detached 在组件实例被从页面节点树移除时执行

error 每当组件方法抛出错误时执行

## 组件所在页面的生命周期
show 组件所在的页面被展示时执行

hide 组件所在的页面被隐藏时执行

resize 组件所在的页面尺寸变化时执行

# 小程序实现机制

所有的小程序基本都最后都被打成下面的结构

1. WAService.js 框架JS库，提供逻辑层基础的API能力
2. WAWebview.js 框架JS库，提供视图层基础的API能力
3. WAConsole.js 框架JS库，控制台
4. app-config.js 小程序完整的配置，包含我们通过app.json里的所有配置，综合了默认配置型
5. app-service.js 我们自己的JS代码，全部打包到这个文件
6. page-frame.html 小程序视图的模板文件，所有的页面都使用此加载渲染，且所有的WXML都拆解为JS实现打包到这里
7. pages 所有的页面，这个不是我们之前的wxml文件了，主要是处理WXSS转换，使用js插入到header区域。