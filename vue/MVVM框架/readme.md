# 解释MVVM框架


# 实现
1. observe(数据劫持) -> 数据代理(this.data -> this)
2. complie(模板编译) 递归寻找文本节点、正则表达式匹配 {{}} -> val
3. 发布订阅模式
4. 