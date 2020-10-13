
export function recursiveDivision(grid,sourceNode,finishNode, startRow, endRow, startCol, endCol,orientation,visitedNodes) {
  console.log("recursive maze");
  if (startRow> endRow || endCol<startCol) {
    return;
  }
  let nodes = getAllUnvisitedNodes(grid);
  if(orientation==="horizontal"){
    let rows = [];
    for (let row = startRow; row <= endRow; row += 2) {
      rows.push(row);
    }
  
    let rowIdx = Math.floor(Math.random() * rows.length);
    console.log("rowdIdx",rowIdx)
    let cols = [];
  
    for (let col = startCol-1; col <=endCol+1; col += 2) {
      cols.push(col);
    }
  
    let colIdx = Math.floor(Math.random() * cols.length);
    console.log("colIdx",colIdx)
    let currentRow=rows[rowIdx]
    let currentCol=cols[colIdx]
  
    for (let node of nodes) {
      if (
        node.row === currentRow &&
        node.col !== currentCol &&
        node.col >= startCol-1 &&
        node.col<=endCol+1 &&
        node!==sourceNode &&
        node!==finishNode
      ) {
       
        visitedNodes.push(node);
      }
    }
    if(currentRow-2-startRow>endCol-startCol){
      recursiveDivision(grid, sourceNode,finishNode,startRow, currentRow-2, startCol, endCol,orientation,visitedNodes);
    }
    else {
      recursiveDivision(grid,sourceNode,finishNode, startRow, currentRow - 2, startCol, endCol, "vertical",visitedNodes);
    }
    if(endRow-(currentRow+2)>endCol-startCol){
      recursiveDivision(grid,sourceNode,finishNode, currentRow + 2, startCol, endRow, endCol,orientation,visitedNodes);
    }else{
      recursiveDivision(grid,sourceNode,finishNode, currentRow + 2, endRow, startCol, endCol, "vertical",visitedNodes);
    }
   
  }
  else{
    let cols=[]
    for(let col=startCol;col<=endCol;col+=2){
      cols.push(col)
    }
    let colIdx = Math.floor(Math.random() * cols.length);

    let rows=[]
    for(let row=startRow-1;row<=endRow+1;row+=2){
      rows.push(row)
    }
    let rowIdx = Math.floor(Math.random() * rows.length);

    let currentCol=cols[colIdx]
    let currentRow=rows[rowIdx]

    for(let node of nodes){
      if(node.col===currentCol && node.row!==currentRow && node.row>=startRow-1 && node.row<=endRow+1  && node!==sourceNode && node!==finishNode){
         visitedNodes.push(node)
       
      }
    }
  if(endRow-startRow>currentCol-2-startCol){
    recursiveDivision(grid,sourceNode,finishNode,startRow,endRow,startCol,currentCol-2,"horizontal",visitedNodes)
}else{
  recursiveDivision(grid,sourceNode,finishNode, startRow, endRow, startCol, currentCol - 2, orientation,visitedNodes);
}

if(endRow-startRow>endCol-(currentCol+2)){
  recursiveDivision(grid,sourceNode,finishNode, startRow, endRow, currentCol+2, endCol, "horizontal",visitedNodes);
}else{
  recursiveDivision(grid,sourceNode,finishNode, startRow, endRow, currentCol+2, endCol, orientation,visitedNodes);
}

  }
 
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
