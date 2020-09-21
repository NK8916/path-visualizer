export function dijsktras(grid, sourceNode, finishNode) {
  let visitedNodes = [];
  sourceNode.distance = 0;
  let unvisitedNodes = getAllUnvisitedNodes(grid);
  console.log("un", unvisitedNodes);

  while (unvisitedNodes.length) {
    let heap = new MinHeap(unvisitedNodes);
    let closestNode = heap.remove();

    if (closestNode.isWall) continue;

    if (closestNode.distance === Infinity) return visitedNodes;
    closestNode.isVisited = true;
    visitedNodes.push(closestNode);

    if (closestNode === finishNode) return visitedNodes;
    updateUnvisitedNeighbour(closestNode, grid);
  }
}

function updateUnvisitedNeighbour(node, grid) {
  let unvisitedNeighbour = getUnvisitedNeighbours(node, grid);
  for (const neighbor of unvisitedNeighbour) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbours(node, grid) {
  let neighbors = [];
  const { row, col } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function getAllUnvisitedNodes(grid) {
  let nodes = [];
  for (let row of grid) {
    for (let node of row) {
      nodes.push(node);
    }
  }

  return nodes;
}

export function getShortestPathNodes(finishNode) {
  let currentNode = finishNode;
  let pathNodes = [];
  while (currentNode != null) {
    pathNodes.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return pathNodes;
}

class MinHeap {
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
