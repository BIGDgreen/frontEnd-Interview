/**
 * 单链表的节点定义
 *
 * @class SingleListNode
 */
class SingleListNode {
    constructor(val) {
        this.val = val
        this.next = null
    }
}

class SingleList {
    constructor() {
        this.head = null
        this.length = 0
    }
    /**
     *获取索引为index的节点
     *
     * @param {number} index
     * @memberof SingleList
     * @return {number}
     */
    get(index) {
        if (this.length === 0 || index < 0 || index >= this.length) return null
        let curNode = this.head
        while (index) {
            index--
            curNode = curNode.next
        }
        return curNode
    }
    /**
     *添加值为val的头节点
     *
     * @param {string} val
     * @memberof SingleList
     */
    addAtHead(val) {
        const head = new SingleListNode(val)
        head.next = this.head || null
        this.head = head
        this.length++
    }
    /**
     *在尾部追加值为val的节点
     *
     * @param {number} val
     * @memberof SingleList
     */
    append(val) {
        if (this.length === 0) {
            this.head = new SingleListNode(val)
        } else {
            const oldTail = this.get(this.length - 1)
            const newTail = new SingleListNode(val)
            oldTail.next = newTail
        }
        this.length++
    }
    /**
     *在index位置处插入值为val的节点
     *
     * @param {string} val
     * @param {number} index
     * @memberof SingleList
     */
    insert(val, index) {
        if (index > this.length) return
        if (index <= 0) return this.addAtHead(val)
        if (index === this.length) return this.append(val)
        const node = new SingleListNode(val)
        const pre = this.get(index - 1)
        node.next = pre.next
        pre.next = node
        this.length++
    }
    /**
     *删除index位置处的节点
     *
     * @param {number} index
     * @memberof SingleList
     */
    delete(index) {
        if (this.length === 0 || index < 0 || index >= this.length) return
        if (index === 0) this.head = this.head.next
        if (index > 0 && index < this.length) {
            const pre = this.get(index - 1)
            pre.next = pre.next.next
        }
        this.length--
    }
    /**
    *判断链表是否为空
    *
    * @returns
    * @memberof SingleList
    */
    isEmpty() {
        return !this.length
    }
    /**
     *获取链表长度
     *
     * @returns {number}
     * @memberof SingleList
     */
    size() {
        return this.length
    }
    /**
     *链表的toString方法
     *
     * @returns {string}
     * @memberof SingleList
     */
    toString() {
        let curNode = this.head
        let arr = []
        while (curNode) {
            arr.push(curNode.val)
            curNode = curNode.next
        }
        return arr.toString()
    }
}

/**
 * Example
 */
let linkedList = new SingleList()
linkedList.append(1)
linkedList.append(2)
linkedList.addAtHead(0)
console.log(linkedList.toString())  // 0,1,2
console.log(linkedList.get(0)) // 0
linkedList.delete(0)
console.log(linkedList.get(0)) // 1
console.log(linkedList.toString()) // 1,2