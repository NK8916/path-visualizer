export class Queue {
  constructor() {
    this.front = null;
    this.tail = null;
    this.length = 0;
  }
  enqueue(value) {
    const node = new LinkedList(value);
    if (!this.front) {
      this.front = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length += 1;
  }

  dequeueFront() {
    if (this.front) {
      let temp = this.front;
      this.front = this.front.next;
      temp.next = null;
      this.length -= 1;
      return temp.value;
    }
  }

  dequeueRear() {
    if (this.front) {
      let current = this.front;
      let prev = null;
      console.log(this.front, current);

      while (current !== null) {
        prev = current;
        current = current.next;
      }

      let temp = this.tail;
      prev.next = null;
      this.tail = prev;
      this.length -= 1;
      return temp.value;
    }
  }

  peek() {
    if (this.front) {
      return this.front.value;
    }
    return null;
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
