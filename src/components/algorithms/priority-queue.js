export class PriorityQueue {
  constructor() {
    this.nodes = new PriorityHeap();
  }

  isEmpty() {
    return this.nodes.heap.length === 0;
  }

  get() {
    return this.nodes.remove();
  }

  insert(value) {
    this.nodes.insert(value);
  }
}

class PriorityHeap {
  constructor() {
    this.heap = [];
  }

  siftDown(idx, endIdx, heap) {
    let firstParentIdx = idx * 2 + 1;
    let swapIdx = -1;
    while (firstParentIdx <= endIdx) {
      let secondChildIdx = idx * 2 + 2 <= endIdx ? idx * 2 + 2 : -1;
      if (
        secondChildIdx !== -1 &&
        heap[secondChildIdx].distance < heap[firstParentIdx].distance
      ) {
        swapIdx = secondChildIdx;
      } else {
        swapIdx = firstParentIdx;
      }
      if (heap[swapIdx].distance < heap[idx].distance) {
        this.swap(swapIdx, idx, heap);
      } else {
        return;
      }
    }
  }

  insert(value) {
    this.heap.push(value);
    this.siftUp(this.heap.length - 1, this.heap);
  }

  remove() {
    this.swap(0, this.heap.length - 1, this.heap);
    let value = this.heap.pop();
    this.siftDown(0, this.heap.length - 1, this.heap);
    return value;
  }

  siftUp(idx, heap) {
    let parentIdx = parseInt((idx - 1) / 2);
    while (idx >= 0 && heap[parentIdx].distance > heap[idx].distance) {
      this.swap(idx, parentIdx, heap);
      idx = parentIdx;
      parentIdx = parseInt(idx - 1) / 2;
    }
  }

  swap(i, j, array) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
