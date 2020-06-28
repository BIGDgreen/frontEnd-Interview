/**
 * 观察者模式
 */

 // 观察者接口
interface Observer {
    // 卖报纸，报纸来了之后更新通知
    update(version:number): void;
}

interface Subject {
    // 添加观察者
    addObersver(key: string, obj: Observer): void;
    // 移除观察者
    deleteObserver(key: string): void;
    // 通知所有观察者
    notifyObserver(): void;
}

// 通知者实例
class MagazineSubject implements Subject {
    private version: number = 0;
    // 存放全部订阅者
    private observers: Map<string, Observer> = new Map<string, Observer>();
    public addObersver(key: string, obj: Observer):void {
        this.observers.set(key, obj);
    }
    public deleteObserver(key: string):void {
        if(this.observers.has(key)) {
            this.observers.delete(key);
        } else {
            throw new Error(`observser对象上不存在${key}`);
        }
    }
    public notifyObserver():void {
        for(const item of this.observers) {
            const o:Observer = item[1];
            o.update(this.version);
        }
    }
    // 最终的告知方法
    public publish() {
        this.version ++;
        this.notifyObserver();
    }
}

// 实现具体的订阅者类
class CustomerObserver implements Observer {
    // 订阅者 给自己起名
    private name: string;
    private version: number;
    constructor(name) {
        this.name = name;
    }
    public update(version: number): void {
        this.version = version;
        console.log(`该杂志出新版了`);
    }
    public buy(): void {
        console.log(`${this.name}买了第${this.version}期的杂志`)
    }
}

// 创建主题（被观察者）
const magazine: MagazineSubject = new MagazineSubject();
// 创建三个不同的观察者
const a: CustomerObserver = new CustomerObserver("A");
const b: CustomerObserver = new CustomerObserver("B");
const c: CustomerObserver = new CustomerObserver("C");

// 将观察者注册到主题中
magazine.addObersver("a", a);
magazine.addObersver("b", b);
magazine.addObersver("c", c);

// 发布消息
magazine.publish();
