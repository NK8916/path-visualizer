export class MinHeap {
  constructor(array) {
    this.heap = this.buildHeap(array);
  }

  buildHeap(array) {
    let firstParentIdx = parseInt((array.length - 1) / 2);
    for (let idx = firstParentIdx; idx >= 0; idx--) {
      this.siftDown(idx, array.length - 1, array);
    }
    return array;
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
