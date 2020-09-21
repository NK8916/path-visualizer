import React, { Component } from "react";
import "./Node.css";

export class Node extends Component {
  render() {
    const { col, row, isStart, isFinish, isWall } = this.props;
    const extractClassName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : "";
    return (
      <td id={`node-${row}-${col}`} className={`node ${extractClassName}`}></td>
    );
  }
}
