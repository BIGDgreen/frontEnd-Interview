// 使用 Object.defineProperty 监听数组
function defineReactive(data, key, value) {
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function defineGet() {
            console.log(`get key: ${key} value: ${value}`);
            return value;
        },
        set: function defineSet(newVal) {
            console.log(`set key: ${key} value: ${value}`);
            value = newVal;
        }
    })
}

function observe(data) {
    Object.keys(data).forEach(function (key) {
        defineReactive(data, key, data[key]);
    })
}

let arr1 = [1, 2, 3];
observe(arr1);
arr1.unshift(4);

// arr1.push(2);

