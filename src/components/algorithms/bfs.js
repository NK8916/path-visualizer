import { Queue } from "./queue";

export function bfs(grid, sourceNode, finishNode) {
  console.log("In bfs");
  const visitedNodes = [];
  let queue = new Queue();
  queue.enqueue(sourceNode);
  let sourceString = `${sourceNode.row}-${sourceNode.col}`;
  let exploredNodes = {};
  exploredNodes[sourceString] = true;
  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    if (node.isWall) continue;

    node.isVisited = true;
    visitedNodes.push(node);
    if (node === finishNode) return visitedNodes;

    let unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      let nodeString = `${neighbor.row}-${neighbor.col}`;
      if (!exploredNodes[nodeString]) {
        exploredNodes[nodeString] = true;
        neighbor.previousNode = node;
        queue.enqueue(neighbor);
      }
    }
  }
  return visitedNodes;
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
