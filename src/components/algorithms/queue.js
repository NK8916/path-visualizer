export class Queue {
  constructor() {
    this.front = null;
    this.tail = null;
    this.length = 0;
  }
  enqueue(value) {
    const node = LinkedList(value);
    if (!this.front) {
      this.front = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length += 1;
  }

  dequeue() {
    if (this.front) {
      let temp = this.front;
      this.front = this.front.next;
      temp.next = null;
      this.length -= 1;
      return temp.value;
    }
  }

  isEmpty() {
    return this.length === 0;
  }
}

class LinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
