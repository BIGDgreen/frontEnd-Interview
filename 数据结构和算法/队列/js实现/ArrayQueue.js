/**
 *数组实现顺序队列
 *
 * @class Queue
 */
class Queue {
    constructor(arr) {
        this.arr = arr || []
    }
    // 入队(入队尾)
    push(ele) {
        this.arr.push(ele)
        return true
    }
    // 出队(出队首)，返回弹出元素
    pop() {
        if (this.isEmpty()) {
            return false
        }
        return this.arr.shift()
    }
    // 获取队列长度
    size() {
        return this.arr.length
    }
    // 获取队首
    head() {
        return this.arr[0]
    }
    // 获取队尾
    tail() {
        return this.arr[this.size() - 1]
    }
    // 判空
    isEmpty() {
        return !this.arr.length
    }
    // 清空队列
    clear() {
        this.arr = []
    }
    // 打印队列
    print() {
        console.log(this.arr.toString())
    }
}

/**
 * Example
 */
const queue = new Queue()
console.log(queue.isEmpty())
queue.push(1)
queue.push(2)
queue.pop()
console.log(queue.isEmpty())
console.log(queue.tail())
queue.clear()
console.log(queue.size())
console.log(queue.head())
queue.push(2)
queue.print()