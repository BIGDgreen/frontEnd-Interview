/**
 * 当三个异步函数全部执行完成时，才会执行fn函数
 * 订阅-发布模式
 */


/**
 *订阅发布模式中的中间人
 *
 * @class Event
 */
class Event {
    constructor() {
        this.callbacks = [];
        this.results = [];
    }

    /**
     *订阅
     *
     * @param {function} fn
     * @memberof Event
     */
    subscribe(fn) {
        this.callbacks.push(fn);
    }

    /**
     *发布
     *
     * @param {*} data
     * @memberof Event
     */
    publish(data) {
        this.results.push(data);
        // 遍历执行订阅者订阅的每一个回调函数
        this.callbacks.forEach(callback => callback(this.results));
    }
}

const event = new Event();

event.subscribe((results) => {
    if (results.length === 3) {
        console.log(results);
    }
})

setTimeout(() => {
    event.publish('fn1 is called');
}, 1000);

setTimeout(() => {
    event.publish('fn2 is called');
}, 500);

setTimeout(() => {
    event.publish('fn3 is called');
}, 2000);



