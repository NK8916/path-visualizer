import { Queue } from "./queue";

export function bfs(grid, sourceNode, finishNode) {
  const visitedNodes = [];
  sourceNode.distance = 0;
  let queue = new Queue();
  queue.append(sourceNode);

  while (queue.isEmpty()) {
    const node = queue.dequeue();
    if (node.isWall) continue;

    if (node.distance === Infinity) return visitedNodes;
    node.isVisited = true;
    visitedNodes.push(node);
    let unvisitedNeighbors = getUnvisitedNeighbours(node, grid);

    if (node === finishNode) return visitedNodes;

    for (const neighbor of unvisitedNeighbors) {
      queue.enqueue(neighbor);
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
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
