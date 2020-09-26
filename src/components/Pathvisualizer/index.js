import React, { Component } from "react";
import { Node } from "../Node";
import { NavBar } from "../Navbar";
import { dijsktras } from "../algorithms/dijsktras";
import { getShortestPathNodes } from "../algorithms/shortest-path";
import "./Pathvisualizer.css";

const NO_OF_ROWS = parseInt(window.innerHeight / 35);
const NO_OF_COLS = parseInt(window.innerWidth / 25);

export class Pathvisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      START_NODE_ROW: 13,
      START_NODE_COL: 5,
      FINISH_NODE_ROW: 10,
      FINISH_NODE_COL: 35,
      dragStart: false,
      dragTarget: false,
      mouseIsPressed: false,
    };
    this.visualize = this.visualize.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }
  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const {
      START_NODE_ROW,
      START_NODE_COL,
      FINISH_NODE_ROW,
      FINISH_NODE_COL,
    } = this.state;
    if (row === START_NODE_ROW && col === START_NODE_COL) {
      this.setState({ dragStart: true });
    } else if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
      this.setState({ dragTarget: true });
    } else {
      const newGrid = getNewGrid(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  }

  handleMouseEnter(row, col) {
    const { dragStart, dragTarget, mouseIsPressed } = this.state;
    if (dragStart) {
      this.setState({ START_NODE_ROW: row, START_NODE_COL: col });
    } else if (dragTarget) {
      this.setState({ FINISH_NODE_ROW: row, FINISH_NODE_COL: col });
    } else if (mouseIsPressed) {
      const newGrid = getNewGrid(this.state.grid, row, col);
      this.setState({ grid: newGrid });
    }
  }

  handleMouseUp() {
    this.setState({
      mouseIsPressed: false,
      dragStart: false,
      dragTarget: false,
    });
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
    const {
      grid,
      START_NODE_ROW,
      START_NODE_COL,
      FINISH_NODE_ROW,
      FINISH_NODE_COL,
    } = this.state;
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
        <NavBar></NavBar>
        <button onClick={this.visualize}>Visualize</button>
        <table className={"board"}>
          <tbody>
            {grid.map((row, rowIdx) => {
              return (
                <tr key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const { col, row, isWall } = node;
                    return (
                      <Node
                        key={nodeIdx}
                        isStart={
                          row === this.state.START_NODE_ROW &&
                          col === this.state.START_NODE_COL
                        }
                        isFinish={
                          row === this.state.FINISH_NODE_ROW &&
                          col === this.state.FINISH_NODE_COL
                        }
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
  for (let row = 0; row < NO_OF_ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < NO_OF_COLS; col++) {
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
    isStart: false,
    isFinish: false,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGrid = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
