import React, { Component } from "react";
import "./navbar.css";
import { Navbar, NavDropdown, Nav, Button } from "react-bootstrap";

export class NavBar extends Component {
  render() {
    const { algorithms, heading } = this.props;
    return (
      <Navbar className="navbar" expand="lg" variant="dark">
        <Navbar.Brand href="#home">Path Visualizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
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
            <Navbar.Brand className="text-center" href="#">
              {heading}
            </Navbar.Brand>
          </Nav>
        </Navbar.Collapse>

        <Button onClick={this.props.visualize} className="visualize-button">
          Visualize
        </Button>
      </Navbar>
    );
  }
}
