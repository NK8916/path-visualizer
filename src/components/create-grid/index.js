const createNode = (col, row) => {
    return {
      row,
      col,
      isStart: false,
      isFinish: false,
      direction: null,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
      fScore: Infinity,
    };
  };
  
  export const getInitialGrid=(boardHeight,boardWidth)  =>{
    const grid = [];
    for (let row = 0; row < boardHeight; row++) {
      const currentRow = [];
      for (let col = 0; col < boardWidth; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };
  

  export const resetGrid=(ref,nodes,sourceNode,finishNode)=>{
    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        if(node===sourceNode || node===finishNode){
          continue
        }
        node.isWall=false
        node.isVisited=false
        let dom=ref[`node-${node.row}-${node.col}`]
        dom.className="node"

    }
  }
  