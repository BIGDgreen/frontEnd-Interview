/**
 * 作为发布-订阅模式的中间人
 *
 * @class Event
 */
class Event {
    constructor() {
        this.subscribers = [];  // 订阅者
        this.messages = []; // 发布信息
    }

    publish(message) {
        this.messages.push(message);
        // 将所有发布信息传给订阅者
        this.subscribers.forEach(sub => sub(this.messages));
    }

    subscribe(fn) {
        this.subscribers.push(fn);
    }

}

const event = new Event();
event.subscribe((messages) => { console.log("1号订阅：" + messages); })
event.subscribe((messages) => { console.log("2号订阅：" + messages); })

event.publish('第一条信息');
event.publish('第二条信息');
