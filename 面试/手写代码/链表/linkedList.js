/**
 *js实现一个链表
 */
function LinkedList() {
  let Node = function(ele) {
    this.ele = ele; // 当前元素
    this.next = null; // 指向下一个节点的指针
  };
  let length = 0;
  let head = null;

  // 结尾追加元素
  this.append = function(ele) {
    let node = new Node(ele);
    if(head === null) {
      // 头节点
      head = node;
    } else {
      // 找到最后一个节点
      current = head;
      while(current.next) {
        current = current.next();
      }
      current.next = node;
    }
    length ++;
  }
  // 删除指定位置的元素
  this.removeAt = function(pos) {
    if(pos < -1 || pos > length) return null;    
    let index = 0;
    let current = head;
    let previous;
    if(pos === 0) {
      // 删除第一个元素，直接改变head
      head = current.next;
    } else {
      while(index < pos) {
        // 确立previous与current的关系，并使current为要删除的节点
        previous = current;
        current = current.next;
        index++;
      }
      // 删除current
      previous.next = current.next;
    }
    length --;
    return current.ele; //返回被删除的元素
  }
  // 在指定位置插入元素
  this.insertAt = function(pos, ele) {
    if(pos < -1 || pos > length) return false;  // 添加失败
    let index = 0;
    let current = head;
    let previous;
    const node = new Node(ele);
    if(pos === 0) {
      // 添加到头节点
      node.next = current;
      head = node;
    } else {
      while(index < pos) {
        // 确立previous与current的关系
        previous = current;
        current = current.next;
        index++;
      }
      // 插入node
      previous.next = node;
      node.next = current;
    }
    length ++;
  }
  // 获取指定元素的位置
  this.indexOf = function(ele) {
    let current = head;
    let index = -1;
    while(current) {
      index++;
      if(current.ele === ele) {
        return index;
      }
      current = current.next;
    }
    return index;
  }
  // 将链表中的值转化为字符串，便于显示
  this.toString = function() {
    let current = head;
    let string = '';
    while(current) {
      string += current.ele + ' -> ';
      current = current.next;
    }
    return string;
  }
}

let list = new LinkedList()
list.append(1)
list.append(2)
console.log(list.toString()) // 1 2
list.insertAt(0, 'hello')
list.insertAt(1, 'world')
console.log(list.toString()) // hello world 1 2
list.removeAt(2)
list.removeAt(2)
console.log(list.toString()) // hello world 
console.log(list.indexOf('world'))
