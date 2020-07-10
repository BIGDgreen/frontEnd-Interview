const _errors = Symbol();
const _initValidate = Symbol();
const _validateRule = Symbol();
const _ruleMsg = Symbol();
const _initMsgs = Symbol();
const _handleRes = Symbol();
const _toArray = Symbol();

class Validate {
    constructor(args) {
        // 错误数组
        this[_errors] = [];
        // 规则与错误信息的映射
        this[_ruleMsg] = {
            'required': '该项必填',
            'phone': '手机号不合法',
            'email': '邮箱不合法',
            'number': '所填项必须为有效数字',
            'numberRange': '数字必须在正确的范围内',
            'customize': '对于自定义校验函数，请输入自定义的错误信息'
        }
        if (args) {
            args = this[_toArray](args);
            args.forEach(item => {
                // 初始化每一条规则
                this[_initValidate](item);
                // 校验每一条规则，当遇到错误时，结束其他的校验
                if (!this[_validateRule](item)) {
                    return;
                }
            })
        }
    }

    /**
    * 判空及初始化错误信息
    *
    * @param {object} item
    * @memberof Validate
    */
    [_initValidate](item) {
        // console.log("初始化校验规则中……", item);
        let { value = '', rules = [], msgs = [] } = item;
        // 判空
        if (value === undefined) {
            throw Error('当前没有要校验的值，请确保初始化构造函数时value不为空！');
        }
        if (!rules || rules.length === 0) {
            throw Error('请添加校验规则');
        } else if (rules) {
            rules = this[_toArray](rules);
            rules.forEach(rule => {
                if (!rule) {
                    throw Error('校验规则不能为空！');
                }
            })
        }
        msgs = this[_toArray](msgs);
        // 初始化msgs
        item.msgs = this[_initMsgs](msgs, rules);
    }

    /**
     * 开始校验，当出现一个错误时停止剩下的校验
     *
     * @param {object} item
     * @memberof Validate
     */
    [_validateRule](item) {
        let { value, rules, msgs } = item;
        rules = this[_toArray](rules);
        msgs = this[_toArray](msgs);
        rules.forEach((rule, index) => {
            const curMsg = msgs[index];
            if (typeof rule === 'string') {
                // 使用内置校验规则
                // 拼接函数名称
                let funSuffix = rule[0].toUpperCase() + rule.substring(1);
                // 函数执行结果
                let res = this[`test${funSuffix}`](value, curMsg).res;
                // 遇到一个错误即返回false
                if (!res) return false;
            } else if (rule.toString() === '[object Object]') {
                // 内置校验规则，遇到多项规则叠加
                if (rule.type === 'number') {
                    let res = this.testNumberRange(value, curMsg, rule).res;
                    if (!res) return false;
                }
            } else if (typeof rule === 'function') {
                // 自定义校验规则
                let res = this[_handleRes](rule(value), 'customize', curMsg).res;
                if (!res) return false;
            }
        })

    }

    /**
     * 初始化错误信息，将用户没有定义的值赋为初始值
     *
     * @param {*} msgs
     * @param {*} rules
     * @returns
     * @memberof Validate
     */
    [_initMsgs](msgs, rules) {
        // 将msgs长度与rules长度对齐，不够的补为空字符串
        if (msgs.length < rules.length) {
            rules.forEach((rule, index) => {
                if (msgs[index] === undefined) msgs[index] = '';
            })
        }
        let res = msgs;

        // 判断msgs每一项是否为空，将为空的项赋值为初始值
        msgs.forEach((msg, index) => {
            if (!msg) {
                const rule = rules[index];
                if (typeof rule === 'string') {
                    if (!this[_ruleMsg][rule]) {
                        throw Error('该校验规则不存在')
                    } else {
                        res[index] = this[_ruleMsg][rule];
                    }
                }
            }
        })
        return res;
    }

    /**
     * 校验结果函数
     *
     * @returns {Promise}
     * @memberof Validate
     */
    res() {
        return new Promise((resolve, reject) => {
            if (this[_errors].length === 0) {
                resolve('');
            } else {
                // 校验失败，返回第一个错误
                resolve(this[_errors][0]);
            }
        })
    }

    /**
     * 手机号验证
     *
     * @param {*} value
     * @param {string} msg
     * @returns
     * @memberof Validate
     */
    testPhone(value, msg) {
        const phoneRexp = /^1[3456789]\d{9}$/;
        const res = phoneRexp.test(value);
        return this[_handleRes](res, 'phone', msg);
    }

    /**
     * 邮箱验证
     *
     * @param {*} value
     * @param {string} msg
     * @returns
     * @memberof Validate
     */
    testEmail(value, msg) {
        const emailRexp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        const res = emailRexp.test(value);
        return this[_handleRes](res, 'email', msg);
    }

    /**
     * 非空校验
     *
     * @param {*} value
     * @param {string} msg
     * @returns
     * @memberof Validate
     */
    testRequired(value, msg) {
        const res = value && value.length > 0;
        return this[_handleRes](res, 'required', msg);
    }


    /**
     *数字类型校验
     *
     * @param {*} value
     * @param {string} msg
     * @returns
     * @memberof Validate
     */
    testNumber(value, msg) {
        const numberRexp = /^[0-9]+$/;
        const res = numberRexp.test(value);
        return this[_handleRes](res, 'number', msg);
    }

    /**
     * 校验数字范围
     *
     * @param {*} value
     * @param {*} msg
     * @param {*} rule
     * @returns
     * @memberof Validate
     */
    testNumberRange(value, msg, rule) {
        const numberTest = this.testNumber(value, msg);
        // 非数字
        if (!numberTest.res) return numberTest;
        const { max, min } = rule;
        let res;
        if (!max && !min) return numberTest;
        else if (!max) {
            // 只定义了最小值
            res = Number(value) >= min;
            msg = msg || '该项必须大于' + min;
        } else if (!min) {
            // 只定义了最大值
            res = Number(value) <= max;
            msg = msg || '该项必须小于' + max;
        } else {
            // 最大值，最小值都有
            res = Number(value) >= min && Number(value) <= max;
            msg = msg || `该项必须在${min}~${max}范围内`;
        }
        return this[_handleRes](res, 'numberRange', msg)
    }

    /**
     *处理验证结果，返回统一的格式
     *
     * @param {boolean} judgeRes
     * @param {*} rule
     * @param {string} msg
     * @returns {res: boolean, msg: string}
     * @memberof Validate
     */
    [_handleRes](judgeRes, rule, msg) {
        if (!judgeRes) {
            // 校验失败
            let errorMsg = msg || this[_ruleMsg][rule] || '';
            this[_errors].push(errorMsg);
            return {
                res: false,
                msg: errorMsg
            }
        } else {
            // 校验成功
            return {
                res: true,
                msg: 'success'
            }
        }
    }

    /**
     * 将非数组转为数组
     *
     * @param {*} value
     * @returns
     * @memberof Validate
     */
    [_toArray](value) {
        return Array.isArray(value) ? value : [value];
    }
}

module.exports = Validate;
