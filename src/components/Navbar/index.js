import React, { Component } from "react";
import "./navbar.css";
import { Navbar, NavDropdown, Nav, Button } from "react-bootstrap";

export class NavBar extends Component {
  render() {
    const { algorithms, mazeAlgorithms ,delays,navRef} = this.props;
    return (
      <Navbar ref={navRef} className="navbar" expand="lg" variant="dark">
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
          <NavDropdown
            title="Speed"
            id="basic-nav-dropdown"
            onSelect={this.props.changespeed}
          >
            {delays.map((delay, idx) => {
              return (
                <NavDropdown.Item
                  key={idx}
                  id={`delays-${delay}`}
                  eventKey={delay}
                >
                  {delay}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
          <Nav.Link onClick={this.props.reset} eventKey={true}>Clear</Nav.Link>
        </Nav>

        <Button onClick={this.props.visualize} className="visualize-button">
          Visualize
        </Button>
      </Navbar>
    );
  }
}
