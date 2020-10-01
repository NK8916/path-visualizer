import { PriorityQueue } from "./priority-queue";

export function bestFirstSearch(grid, sourceNode, finishNode) {
  console.log("best first search");
  let visitedNodes = [];
  sourceNode.distance = 0;
  let priorityQueue = new PriorityQueue();

  priorityQueue.insert(sourceNode);

  while (!priorityQueue.isEmpty()) {
    const node = priorityQueue.get();
    if (node.isWall) continue;

    // if (node.distance === Infinity) return visitedNodes;
    node.isVisited = true;
    visitedNodes.push(node);

    if (node === finishNode) return visitedNodes;

    let unvisitedNodes = updateUnvisitedNeighbour(node, grid);

    for (let neighbor of unvisitedNodes) {
      if (!neighbor.isVisited) {
        neighbor.isVisited = true;
        priorityQueue.insert(neighbor);
      }
    }
  }

  return visitedNodes;
}

function updateUnvisitedNeighbour(node, grid) {
  let unvisitedNeighbour = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbour) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }

  return unvisitedNeighbour;
}

function getUnvisitedNeighbors(node, grid) {
  let neighbors = [];
  const { row, col } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter((neighbor) => !neighbor.isVisited);
}
