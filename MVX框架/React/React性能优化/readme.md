pureComponent shallowEqual
React.memo
分析问题: React Devtools 的Highlight Update与Profiler, Chrome 的Performance工具
阻止无意义的重渲染, 通常通过缓存/更新控制(useMemo/shouldComponentUpdate)
懒加载(React-Loadable & Suspense + React.lazy())
细粒度更新
谨慎使用 Context 或基于 Context 的数据流方案
不可变数据
ImmutableJS
ImmerJS(安利下IceStore)
减少不必要的重新计算, 如useCallback与Reselect
虚拟列表