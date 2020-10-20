export function getShortestPathNodes(finishNode) {
  let currentNode = finishNode;
  let pathNodes = [];
  while (currentNode != null) {
    pathNodes.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return pathNodes;
}
