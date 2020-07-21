/**
 *被观察者，一个
 *
 * @class Object
 */
class Subject {
    constructor(name, state) {
        this.name = name;
        this.state = state || 'default';
        this.observers = [];
    }

    // 被观察者提供一个接收观察者的方法
    attach(...observers) {
        this.observers.push(...observers);
    }

    setState(state) {
        if (this.state !== state) {
            // 状态发生改变
            this.state = state;
            console.log('当前状态：', state);
        }
        // 通知每一个观察者，被观察者状态发生改变
        this.observers.forEach(ob => ob.update(state));
    }

}


/**
 *观察者，多个
 *
 * @class Observer
 */
class Observer {
    constructor(name) {
        this.name = name;
    }

    update(state) {
        console.log(`${this.name}: state is changed to ${state}`);
    }
}


const sub = new Subject('被观察者');
const o1 = new Observer('观察者A');
const o2 = new Observer('观察者B');
sub.attach(o1, o2);
sub.setState('changed')
