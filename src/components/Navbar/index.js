import React, { Component } from "react";
import "./navbar.css";
import { Navbar, NavDropdown, Nav, Button } from "react-bootstrap";

export class NavBar extends Component {
  render() {
    const { algorithms, heading, mazeAlgorithms } = this.props;
    return (
      <Navbar id="navbarId" className="navbar" expand="lg" variant="dark">
        <Navbar.Brand href="#home">Path Visualizer</Navbar.Brand>
        <Nav className="mr-auto">
          <NavDropdown
            title="Algorithms"
            id="basic-nav-dropdown"
            onSelect={this.props.onSelect}
          >
            {algorithms.map((algorithm, idx) => {
              return (
                <NavDropdown.Item
                  key={idx}
                  id={`algorithms-${algorithm}`}
                  eventKey={algorithm}
                >
                  {algorithm}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
          <NavDropdown
            title="Mazes"
            id="basic-nav-dropdown"
            onSelect={this.props.selectMaze}
          >
            {mazeAlgorithms.map((algorithm, idx) => {
              return (
                <NavDropdown.Item
                  key={idx}
                  id={`algorithms-${algorithm}`}
                  eventKey={algorithm}
                >
                  {algorithm}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
        </Nav>

        <Button onClick={this.props.visualize} className="visualize-button">
          Visualize
        </Button>
      </Navbar>
    );
  }
}
