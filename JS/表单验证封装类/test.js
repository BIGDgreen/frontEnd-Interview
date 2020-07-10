const Validate = require('./validate');

let phone = '17157527818';
let number = '0';
let email = '4548@sad.com'
let customize = '12';

const validation = new Validate();
const res = validation.testPhone(phone);
console.log(res);

const validate = new Validate([
    {
        value: phone,
        rules: ['required', 'phone'],
        msgs: ['手机号不能为空', '手机号错误']
    }
    , {
        value: number,
        rules: ['required', { type: 'number', max: 50, min: 1 }],
        msgs: ['数字不能为空', '']
    }
    , {
        value: email,
        rules: 'email'
    }, {
        value: customize,
        rules: (value) => value.startsWith('0'),
        msgs: '该项必须以0开头'
    }
]);

validate.res().then((err) => {
    if (!err) console.log('成功');
    else console.log('失败', err);
})

