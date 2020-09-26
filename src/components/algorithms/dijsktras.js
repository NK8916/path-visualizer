import { MinHeap } from "./heap";

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
