import React, { Component } from "react";
import { Node } from "../Node";
import { NavBar } from "../Navbar";
import { recursiveDivision } from "../maze-algorithms/recursive-division";
import {recursiveDivisionVertical} from "../maze-algorithms/recursive-division-vertical";
import {recursiveDivisionHorizontal} from '../maze-algorithms/recurisive-division-horizontal';
import { bfs } from "../algorithms/bfs";
import { depthFirstSearch } from "../algorithms/depth-first-search";
import { dijsktras } from "../algorithms/dijsktras";
import { aStar } from "../algorithms/a-star";
import { bestFirstSearch } from "../algorithms/best-first-search";
import { getShortestPathNodes } from "../algorithms/shortest-path";
import {getInitialGrid,resetGrid} from '../create-grid'
import "./Pathvisualizer.css";


export class Pathvisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      START_NODE_ROW: 5,
      START_NODE_COL: 5,
      FINISH_NODE_ROW: 10,
      FINISH_NODE_COL: 10,
      animationDelay:10,
      dragStart: false,
      dragTarget: false,
      mouseIsPressed: false,
      delays:{slow:20,average:10,fast:5},
      algorithmHeading: "Pick An Algorithm",
      algorithm: "",
      mazeAlgorithms: ["Recursive Division","Recursive Division (Vertical)","Recursive Division (Horizontal)"],
      algorithms: [
        "Dijsktras",
        "Breadth First Search",
        "Best First Search",
        "Depth First Search",
        "A* Algorithm",
      ],
      boardHeight:null,
      boardWidth:null
    };
    this.visualize = this.visualize.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleAlgo = this.handleAlgo.bind(this);
    this.generateMaze = this.generateMaze.bind(this);
    this.reset=this.reset.bind(this)
    this.animateTraversal=this.animateTraversal.bind(this)
    this.animateMaze=this.animateMaze.bind(this)
    this.changespeed=this.changespeed.bind(this)
  }
  componentDidMount() {
    const navbarHeight=document.getElementById('navbarId').clientHeight;
    const headingHeight=document.getElementById('heading').clientHeight
    let boardHeight=Math.floor((document.documentElement.clientHeight-navbarHeight-headingHeight)/30)
    let boardWidth=Math.floor(document.documentElement.clientWidth/25)
    this.setState({boardHeight,boardWidth})
    const grid = getInitialGrid(boardHeight,boardWidth);
    this.setState({ grid });
  }
  
  changespeed(delay){
    const {delays}=this.state
    this.setState({animationDelay:delays[delay]})
  }

  reset(){
    const { grid , 
      START_NODE_ROW,
      START_NODE_COL,
      FINISH_NODE_ROW,
      FINISH_NODE_COL,
    } = this.state;
    const start = grid[START_NODE_ROW][START_NODE_COL];
    const finish = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let nodes=getAllUnvisitedNodes(grid)
    resetGrid(this,nodes,start,finish)
    this.setState({algorithmHeading:"Pick An Algorithm"})
  }

  generateMaze(algorithm) {
    const { grid , 
      START_NODE_ROW,
      START_NODE_COL,
      FINISH_NODE_ROW,
      FINISH_NODE_COL,
      boardHeight,
      boardWidth
    } = this.state;
    const start = grid[START_NODE_ROW][START_NODE_COL];
    const finish = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let visitedNodes=[]
   
    let nodes=getAllUnvisitedNodes(grid)
    switch (algorithm) {
      case "Recursive Division": {
        this.createBoundary(grid,boardHeight,boardWidth,visitedNodes)
       recursiveDivision(
          nodes,
          false,
          start,
          finish,
          2,
        boardHeight-3,
          2,
          boardWidth-3,
          visitedNodes
        );
      
      
        break;
      }
      case "Recursive Division (Vertical)":{
        this.createBoundary(grid,boardHeight,boardWidth,visitedNodes)
        recursiveDivisionVertical(  nodes,
          false,
          start,
          finish,
          2,
        boardHeight-3,
          2,
          boardWidth-3,
          visitedNodes)
        break
      }
      case "Recursive Division (Horizontal)":{
        this.createBoundary(grid,boardHeight,boardWidth,visitedNodes)
        recursiveDivisionHorizontal(  nodes,
          true,
          start,
          finish,
          2,
        boardHeight-3,
          2,
          boardWidth-3,
          visitedNodes)
        break
      }
      default:
        console.log("Select Maze");
    }

    if(visitedNodes && visitedNodes.length){
          
      this.animateMaze(visitedNodes);
    }
  }

  createBoundary(grid,boardHeight,boardWidth,visitedNodes){
    for(let row=0;row<boardHeight;row++){
      for(let col=0;col<boardWidth;col++){
        if(row===0 || row===boardHeight-1 || col===0 || col===boardWidth-1){
          visitedNodes.push(grid[row][col])
        }
      }
    }

  }

  animateMaze(visitedNodes) {
    for (let i = 0; i < visitedNodes.length; i++) {
      setTimeout(() => {
        let node = visitedNodes[i];
        node.isWall=true
        let dom=this[`node-${node.row}-${node.col}`]
        dom.className="node node-wall"
      }, 10 * i);
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
        this.setState({ algorithmHeading: "Best First Search Algorithm" });
        break;
      }

      case "Depth First Search": {
        this.setState({ algorithm: "Depth First Search" });
        this.setState({ algorithmHeading: "Depth First Search Algorithm" });
        break;
      }
      case "A* Algorithm": {
        this.setState({ algorithm: "A* Algorithm" });
        this.setState({ algorithmHeading: "A* Algorithm" });
        break;
      }
      default:
        this.setState({ algorithm: "" });
    }
  }

  animateWall(row,col){
    let dom=this[`node-${row}-${col}`]
    dom.className="node node-wall"
  }
  
  handleMouseDown(row, col) {
    const {
      grid,
      START_NODE_ROW,
      START_NODE_COL,
      FINISH_NODE_ROW,
      FINISH_NODE_COL,
    } = this.state;
    if (row === START_NODE_ROW && col === START_NODE_COL) {
      this.setState({ dragStart: true});
    } else if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
      this.setState({ dragTarget: true });
    } else {
      grid[row][col].isWall=!grid[row][col].isWall
      this.animateWall(row,col)
      this.setState({mouseIsPressed:true})
    }
  }

  handleMouseEnter(row, col) {
    const { grid,dragStart, dragTarget, mouseIsPressed } = this.state;
    console.log("dragStart",dragStart,"dragTarget",dragTarget,"mouseIsPressed",mouseIsPressed)
    if (dragStart) {
      this.setState({ START_NODE_ROW: row, START_NODE_COL: col });
    } 
    else if (dragTarget) {
      this.setState({ FINISH_NODE_ROW: row, FINISH_NODE_COL: col });
    } 
    else if (mouseIsPressed ) {
      grid[row][col].isWall=!grid[row][col].isWall
      this.animateWall(row,col)
      this.setState({mouseIsPressed:true})
    }
  }

  handleMouseUp() {
    const { mouseIsPressed } = this.state;
    if(mouseIsPressed){
      console.log("ptressed bro")
    }
    this.setState({
      mouseIsPressed: false,
      dragStart: false,
      dragTarget: false,
    });
  }

  animateTraversal(visitedNodesInorder, shortestPathNodes) {
    const {animationDelay}=this.state
    for (let i = 0; i <= visitedNodesInorder.length; i++) {
      if (i === visitedNodesInorder.length) {
        setTimeout(() => {
          this.animateShortestPath(shortestPathNodes);
        }, animationDelay * i);

        return;
      }

      setTimeout(() => {
        let node = visitedNodesInorder[i];
        let dom=this[`node-${node.row}-${node.col}`]
        dom.className="node node-visited"
      }, animationDelay * i);
    }
  }

  animateShortestPath(shortestPathNodes) {
    const {animationDelay}=this.state
    for (let i = 0; i < shortestPathNodes.length; i++) {
      setTimeout(() => {
        let node = shortestPathNodes[i];
        let dom=this[`node-${node.row}-${node.col}`]
        dom.className="node shortest-path-node"
      }, animationDelay*5 * i);
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
    if(algorithm!==""){
      const { visitedNodesInorder, shortestPathNodes } = this.traverseAlgorithms(
        algorithm
      );
        this.animateTraversal(visitedNodesInorder, shortestPathNodes);
    }
   
    
  }
  render() {
    const { grid, mouseIsPressed } = this.state;
    return (
      <>
        <NavBar
          reset={this.reset}
          onSelect={this.handleAlgo}
          selectMaze={this.generateMaze}
          visualize={this.visualize}
          changespeed={this.changespeed}
          delays={this.state.delays}
          algorithms={this.state.algorithms}
          mazeAlgorithms={this.state.mazeAlgorithms}
          heading={this.state.algorithmHeading}
        ></NavBar>
        <h3 id="heading" className="text-center">{this.state.algorithmHeading}</h3>
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
                        setRef={(node)=>{ this[`node-${row}-${col}`]=node}}
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
                        onMouseUp={(row,col) => {
                          this.handleMouseUp(row,col);
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


function getAllUnvisitedNodes(grid) {
  let nodes = [];
  for (let row of grid) {
    for (let node of row) {
      nodes.push(node);
    }
  }

  return nodes;
}
