

export function recursiveDivision(nodes,horizontal,sourceNode,finishNode, startRow, endRow, startCol, endCol,visitedNodes) {
 console.log(horizontal)
  if(horizontal){
    if(endRow-startRow<2){
      return
    }
    let y=Math.floor(randomNumber(startCol,endCol)/2)*2
    let x=Math.floor(randomNumber(startRow,endRow)/2)*2+1
    addHorizontalWalls(nodes,startCol,endCol,x,y,sourceNode,finishNode,visitedNodes)

    if(x-2-startRow>endCol-startCol){
      recursiveDivision(nodes,true,sourceNode,finishNode,startRow,x-2,startCol,endCol,visitedNodes)
    }else{
      recursiveDivision(nodes,false,sourceNode,finishNode,startRow,x-2,startCol,endCol,visitedNodes)
    }

    if(endRow-(x+2)>endCol-startCol){
      recursiveDivision(nodes,true,sourceNode,finishNode,x+2,endRow,startCol,endCol,visitedNodes)
    }else{
      recursiveDivision(nodes,false,sourceNode,finishNode,x+2,endRow,startCol,endCol,visitedNodes)
    }
   
   
  }else{
    if(endCol-startCol<2){
      return
    }
    console.log("verticle")
    let x=Math.floor(randomNumber(startRow,endRow)/2)*2
    let y=Math.floor(randomNumber(startCol,endCol)/2)*2+1

    addVerticalWalls(nodes,startRow,endRow,x,y,sourceNode,finishNode,visitedNodes)

    if(endRow-startRow>y-2-startCol){
      recursiveDivision(nodes,true,sourceNode,finishNode,startRow,endRow,startCol,y-2,visitedNodes)
    }else{
      recursiveDivision(nodes,false,sourceNode,finishNode,startRow,endRow,startCol,y-2,visitedNodes)
    }

    if(endRow-startRow>endCol-(y+2)){
      recursiveDivision(nodes,true,sourceNode,finishNode,startRow,endRow,y+2,endCol,visitedNodes)
    }else{
      recursiveDivision(nodes,false,sourceNode,finishNode,startRow,endRow,y+2,endCol,visitedNodes)
    }
    
    
  }
  
  
}

function addVerticalWalls(nodes,startRow,endRow,x,y,sourceNode,finishNode,visitedNodes){
  for(let node of nodes){
    if(node.row>=startRow-1 && node.row<=endRow+1 && node.col===y && node.row!==x && node!==sourceNode && node!==finishNode){
      visitedNodes.push(node)
    }
  }
}

function addHorizontalWalls(nodes,startCol,endCol,x,y,sourceNode,finisNode,visitedNodes){
  for(let node of nodes){
    if(node.col>=startCol-1 && node.col<=endCol+1 && node.row===x && node.col!==y && node!==sourceNode && node!==finisNode){
        visitedNodes.push(node)
    }
  }

}

function randomNumber(min,max){
  return Math.floor(Math.random()*(max-min+1)+min)
}

