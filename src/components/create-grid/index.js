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
  
  export const getNewGrid = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };
  