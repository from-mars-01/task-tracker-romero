import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ServerFilterList from "./ServerFilterList";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar bg="dark" variant="dark" expand="md" sticky="top" className="border-bottom border-secondary shadow-sm">
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
            <Nav.Link as={Link} to="/tasks" active={isActive("/tasks")}>Task List</Nav.Link>

            <NavDropdown title="More" id="nav-more">
              <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/contact">Contact</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/about">About</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className="d-flex align -items-center me-3">
            <ServerFilterList />
          </div>

          {/* Right-side actions */}
          <Nav className="ms-auto d-flex align-items-center">
            {loading ? null : user ? (
              <>
              <Nav.Link as={Link} to="/account" className="text-light fw-semibold">
              Account 
              </Nav.Link>
              <Button size="sm" variant="success" onClick={() => navigate("/tasks/new")}>
                  New Task
              </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" active={isActive("/login")} className="me-2">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}