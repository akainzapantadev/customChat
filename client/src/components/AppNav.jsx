import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Session, ChichatLogo } from "./index";

function AppNav() {
  let sessionRef = React.useRef();
  sessionRef = Session();
  return (
    <Navbar className="bg-dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img className="img-fluid" src={ChichatLogo} width="50"></img>
          <span className="text-light">Chichat</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav>
            {sessionRef.session == null ? (
              <>
                <Nav.Link className="text-light" href="/">
                  Home
                </Nav.Link>
                <Nav.Link className="text-light" href="/login">
                  Login
                </Nav.Link>
                <Nav.Link className="text-light" href="/register">
                  Register
                </Nav.Link>
              </>
            ) : (
              <Nav.Link className="text-light" href="/logout">
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNav;
