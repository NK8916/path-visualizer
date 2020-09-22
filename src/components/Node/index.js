import React, { Component } from "react";
import "./Node.css";

export class Node extends Component {
  render() {
    const {
      col,
      row,
      isStart,
      isFinish,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
    } = this.props;
    const extractClassName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : "";
    return (
      <td
        id={`node-${row}-${col}`}
        className={`node ${extractClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      ></td>
    );
  }
}
