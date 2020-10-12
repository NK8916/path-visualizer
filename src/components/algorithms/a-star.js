import { PriorityQueue } from "./priority-queue";

export function aStar(grid, sourceNode, finishNode) {
  let visitedNodes = [];
  sourceNode.distance = 0;
  sourceNode.fScore = getScore(sourceNode, finishNode);
  sourceNode.direction = "up";
  let priorityQueue = new PriorityQueue("fScore");
  priorityQueue.insert(sourceNode);
  while (!priorityQueue.isEmpty()) {
    let node = priorityQueue.get();

    if(node.isWall) continue
    node.isVisited = true;
    visitedNodes.push(node);

    if (node === finishNode) return visitedNodes;
    updateUnvisitedNeighbour(node, grid, finishNode, priorityQueue);
  }
  return visitedNodes;
}

function updateUnvisitedNeighbour(node, grid, finishNode, priorityQueue) {
  let unvisitedNeighbour = getUnvisitedNeighbours(node, grid);
  for (const neighbor of unvisitedNeighbour) {
    let distance = getScore(node, neighbor);
    if (distance < neighbor.distance) {
      neighbor.previousNode = node;
      neighbor.distance = distance;
      neighbor.fScore = distance + getScore(neighbor, finishNode);
      if (!neighbor.isVisited) {
        priorityQueue.insert(neighbor);
      }
    }
  }
}

function getScore(nodeOne, nodeTwo) {
  const x1 = nodeOne.row;
  const y1 = nodeOne.col;
  const x2 = nodeTwo.row;
  const y2 = nodeTwo.col;

  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function getUnvisitedNeighbours(node, grid) {
  let neighbors = [];
  const { row, col } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors;
}
