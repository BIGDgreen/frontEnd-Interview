# server端的攻击与预防
注意：本文所有解决方案的代码均用**node.js**编写！
# SQL注入：窃取数据库内容
最原始、最简单的攻击，从web2.0（允许用户发布信息）就有了。

## 攻击方式： 输入一个sql片段，拼接成一段攻击代码。

比如，登录时，后端往往会拼接sql语句：
```js
`select username from user where username='${username}' and \`password\`='${password}'`
```

如果用户输入的用户名为：
```sql
zhangsan' -- 
```
那么`sql`语句就变成了：
```sql
select username from user where username='zhangsan' -- ' and \`password\`='13545'
```
这时，不必输入密码就可以实现登录。

更严重时，用户输入
```sql
zhangsan';delete from user -- 
```

那么`sql`语句就变成了：
```sql
select username from user where username='zhangsan';delete from user -- ' and \`password\`='13545'
```
这段sql语句执行后，`user`表中的内容将被全部删除。

## 预防措施
使用mysql内置的`escape`函数处理输入内容。

将所有会放入sql语句中的变量用escape函数处理。如：
```js
username = mysql.escape(username);
```
对于对象中的每个属性，可以批量处理，封装一个函数：
```js
const isObject = o => Object.prototype.toString.call(o) === '[object Object]';

const escapeObject = (obj) => {
    if (!isObject(obj)) return;
    Object.keys(obj).forEach(key => {
        if (obj.hasOwnProperty(key)) {
            obj[key] = escape(obj[key]);
        }
    });
}
```

# XSS攻击：窃取前端的cookie内容
## 攻击方式
在页面展示内容中掺杂js代码，以获取网页信息。

## 预防方式
转换生成js的特殊字符
```
 & -> &amp;
 < -> &lt;
 > -> &gt;
 " -> &quot;
 ' -> &#x27;
 / -> &#x2F;
```

# 密码加密：保障用户信息安全
