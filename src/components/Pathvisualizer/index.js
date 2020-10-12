import React, { Component } from "react";
import { Node } from "../Node";
import { NavBar } from "../Navbar";
import { recursiveDivision } from "../maze-algorithms/recursive-division";
import { bfs } from "../algorithms/bfs";
import { depthFirstSearch } from "../algorithms/depth-first-search";
import { dijsktras } from "../algorithms/dijsktras";
import { aStar } from "../algorithms/a-star";
import { bestFirstSearch } from "../algorithms/best-first-search";
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
      FINISH_NODE_COL: 10,
      dragStart: false,
      dragTarget: false,
      mouseIsPressed: false,
      algorithmHeading: "",
      algorithm: "",
      mazeAlgorithms: ["Recursive Maze Algorithm"],
      algorithms: [
        "Dijsktras",
        "Breadth First Search",
        "Best First Search",
        "Depth First Search",
        "A* Algorithm",
      ],
      navbarHeight:null
    };
    this.visualize = this.visualize.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleAlgo = this.handleAlgo.bind(this);
    this.generateMaze = this.generateMaze.bind(this);
  }
  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
    const navbarHeight=document.getElementById('navbarId').clientHeight;
    this.setState({navbarHeight})
  }

  generateMaze(algorithm) {
    const { grid , 
      START_NODE_ROW,
      START_NODE_COL,
      FINISH_NODE_ROW,
      FINISH_NODE_COL,} = this.state;
    console.log(grid);
    const start = grid[START_NODE_ROW][START_NODE_COL];
    const finish = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let visitedNodes=[]
    switch (algorithm) {
      case "Recursive Maze Algorithm": {

       recursiveDivision(
          grid,
          start,
          finish,
          0,
          NO_OF_ROWS,
          0,
          NO_OF_COLS,
          "horizontal",
          visitedNodes
        );
        console.log("visited",visitedNodes)
        if(visitedNodes && visitedNodes.length){
          
          this.animateMaze(visitedNodes);
        }
      
        break;
      }
      default:
        console.log("Select Maze");
    }
  }

  animateMaze(visitedNodes) {
    for (let i = 0; i < visitedNodes.length; i++) {
      setTimeout(() => {
        let node = visitedNodes[i];
        node.isWall=true
        document
          .getElementById(`node-${node.row}-${node.col}`)
          .setAttribute("class", "node node-wall");
      }, 30 * i);
    }
  }

  handleAlgo(algorithm) {
    switch (algorithm) {
      case "Breadth First Search": {
        this.setState({ algorithm: "Breadth First Search" });
        this.setState({ algorithmHeading: "Breadth First Search Algorithm" });
        break;
      }
      case "Dijsktras": {
        this.setState({ algorithm: "Dijsktras" });
        this.setState({ algorithmHeading: "Dijsktras Algorithm" });
        break;
      }
      case "Best First Search": {
        this.setState({ algorithm: "Best First Search" });
        this.setState({ algorithmHeading: "Best First Search" });
        break;
      }

      case "Depth First Search": {
        this.setState({ algorithm: "Depth First Search" });
        this.setState({ algorithmHeading: "Depth First Search" });
        break;
      }
      case "A* Algorithm": {
        this.setState({ algorithm: "A* Algorithm" });
        this.setState({ algorithmHeading: "A* Algorithm" });
        break;
      }
      default:
        this.setState({ algorithm: "Dijsktras" });
    }
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

  animateTraversal(visitedNodesInorder, shortestPathNodes) {
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

  traverseAlgorithms(algorithm) {
    let visitedNodesInorder = [];
    const {
      grid,
      START_NODE_ROW,
      START_NODE_COL,
      FINISH_NODE_ROW,
      FINISH_NODE_COL,
    } = this.state;
    const start = grid[START_NODE_ROW][START_NODE_COL];
    const finish = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

    switch (algorithm) {
      case "Dijsktras": {
        visitedNodesInorder = dijsktras(grid, start, finish);
        break;
      }
      case "Breadth First Search": {
        visitedNodesInorder = bfs(grid, start, finish);
        break;
      }

      case "Best First Search": {
        visitedNodesInorder = bestFirstSearch(grid, start, finish);
        break;
      }

      case "Depth First Search": {
        visitedNodesInorder = depthFirstSearch(grid, start, finish);
        break;
      }
      case "A* Algorithm": {
        visitedNodesInorder = aStar(grid, start, finish);
        break;
      }
      default:
        console.log("Select Algorithms");
        this.setState({ algorithmHeading: "Pick An Algorithm" });
    }
    const shortestPathNodes = getShortestPathNodes(finish);

    return { visitedNodesInorder, shortestPathNodes };
  }

  visualize() {
    const { algorithm } = this.state;
    const { visitedNodesInorder, shortestPathNodes } = this.traverseAlgorithms(
      algorithm
    );
      this.animateTraversal(visitedNodesInorder, shortestPathNodes);
    
  }
  render() {
    const { grid, mouseIsPressed } = this.state;
    return (
      <>
        <NavBar
          onSelect={this.handleAlgo}
          selectMaze={this.generateMaze}
          visualize={this.visualize}
          algorithms={this.state.algorithms}
          mazeAlgorithms={this.state.mazeAlgorithms}
          heading={this.state.algorithmHeading}
        ></NavBar>
        {/* <button onClick={this.visualize}>Visualize</button> */}
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
