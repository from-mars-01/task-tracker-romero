import { use } from "react";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

  return (
    <Navbar bg="dark" variant="dark" expand="md" sticky="top">
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/">Task Tracker</Navbar.Brand>

        {/* Mobile toggle */}
        <Navbar.Toggle aria-controls="main-nav" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
    

        {/* Collapsible content */}
        <Navbar.Collapse id="main-nav">
          {/* Left Nav */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/about" active={isActive("/about")}>About</Nav.Link>
            <Nav.Link as={Link} to="/contact" active={isActive("/contact")}>Contact</Nav.Link>
            <Nav.Link as={Link} to="/tasks" active={isActive("/tasks")}>Task List</Nav.Link>

            <NavDropdown title="More" id="nav-more">
              <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/help">Help</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/about">About</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Right-side actions */}
          <div className="d-flex gap-2">
s            <Button size="sm" variant="success" onClick={() => navigate("/tasks/new")}>
              New Task
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}