export class PriorityQueue {
  constructor(property) {
    this.heap = [];
    this.property = property;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  get() {
    return this.remove();
  }

  siftDown(idx, endIdx, heap) {
    let firstChildIdx = idx * 2 + 1;
    let swapIdx = -1;
    while (firstChildIdx <= endIdx) {
      let secondChildIdx = idx * 2 + 2 <= endIdx ? idx * 2 + 2 : -1;
      if (
        secondChildIdx !== -1 &&
        heap[secondChildIdx][this.property] < heap[firstChildIdx][this.property]
      ) {
        swapIdx = secondChildIdx;
      } else {
        swapIdx = firstChildIdx;
      }
      if (heap[swapIdx][this.property] < heap[idx][this.property]) {
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
    while (
      idx > 0 &&
      heap[parentIdx][this.property] > heap[idx][this.property]
    ) {
      this.swap(idx, parentIdx, heap);
      idx = parentIdx;
      parentIdx = parseInt((idx - 1) / 2);
    }
  }

  swap(i, j, array) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
