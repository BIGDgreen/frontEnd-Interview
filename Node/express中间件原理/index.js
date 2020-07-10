const app = require('./MiniExpress')();

app.use((req, res, next) => {
    console.log('请求开始...', req.method, req.url)
    next();
})

app.use((req, res, next) => {
    // 假设在处理 cookie
    console.log('处理 cookie ...')
    req.cookie = {
        userId: 'abc123'
    }
    next();
})

app.use('/api', (req, res, next) => {
    console.log('处理 /api 路由')
    next();
})

app.get('/api', (req, res, next) => {
    console.log('get /api 路由')
    next();
})

// 模拟登录验证
function loginCheck(req, res, next) {
    setTimeout(() => {
        console.log('模拟登录成功')
        next()
    }, 1000);
}

// 添加中间件
app.get('/api/user/info', loginCheck, (req, res, next) => {
    console.log('get /api/user/info')
    res.json({
        errno: 0,
        data: req.cookie
    })
})

app.use((req, res, next) => {
    res.json({
        errno: 404,
        msg: 'not found'
    })
})

app.listen(5000, () => {
    console.log('server is running on port 5000')
})
