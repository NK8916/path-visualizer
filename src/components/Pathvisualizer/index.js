import React, { Component } from "react";
import { Node } from "../Node";
import { dijsktras, getShortestPathNodes } from "../algorithms/dijsktras";
import "./Pathvisualizer.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export class Pathvisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
    this.visualize = this.visualize.bind(this);
  }
  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    console.log("working", row, col);
    const newGrid = getNewGrid(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGrid(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  animateDijsktras(visitedNodesInorder, shortestPathNodes) {
    for (let i = 0; i <= visitedNodesInorder.length; i++) {
      if (i === visitedNodesInorder.length) {
        setTimeout(() => {
          this.animateShortestPath(shortestPathNodes);
        }, 10 * i);

        return;
      }

      setTimeout(() => {
        let node = visitedNodesInorder[i];
        document
          .getElementById(`node-${node.row}-${node.col}`)
          .setAttribute("class", "node node-visited");
      }, 10 * i);
    }
  }

  animateShortestPath(shortestPathNodes) {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      setTimeout(() => {
        let node = shortestPathNodes[i];

        document
          .getElementById(`node-${node.row}-${node.col}`)
          .setAttribute("class", "node shortest-path-node");
      }, 50 * i);
    }
  }

  visualize() {
    const { grid } = this.state;
    console.log(grid);
    const start = grid[START_NODE_ROW][START_NODE_COL];
    const finish = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInorder = dijsktras(grid, start, finish);
    const shortestPathNodes = getShortestPathNodes(finish);
    console.log("shotest", shortestPathNodes);
    this.animateDijsktras(visitedNodesInorder, shortestPathNodes);
  }
  render() {
    const { grid, mouseIsPressed } = this.state;
    return (
      <>
        <button onClick={this.visualize}>Visualize</button>
        <table className={"board"}>
          <tbody>
            {grid.map((row, rowIdx) => {
              return (
                <tr key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const { col, row, isStart, isFinish, isWall } = node;
                    return (
                      <Node
                        key={nodeIdx}
                        isStart={isStart}
                        isFinish={isFinish}
                        isWall={isWall}
                        mouseIsPressed={mouseIsPressed}
                        onMouseDown={(row, col) =>
                          this.handleMouseDown(row, col)
                        }
                        onMouseEnter={(row, col) =>
                          this.handleMouseEnter(row, col)
                        }
                        onMouseUp={() => {
                          this.handleMouseUp();
                        }}
                        col={col}
                        row={row}
                      ></Node>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}
const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGrid = (grid, row, col) => {
  const newGrid = grid.slice();
  console.log("grid", grid, "new", newGrid);
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
