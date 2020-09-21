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
    };
    this.visualize = this.visualize.bind(this);
  }
  componentDidMount() {
    const grid = getInitialGrid();
    console.log("gridd", grid[10][15]);
    this.setState({ grid });
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
    const { grid } = this.state;
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
