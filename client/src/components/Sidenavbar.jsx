import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-bootstrap";
export const Sidenavbar = ()=>{
    return <>
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
          <NavLink className ="nav-link" to="/logout">Logout</NavLink>
          </Nav>
        </Container>
      </Navbar>
        
    </>
}