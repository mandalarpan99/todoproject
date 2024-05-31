import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-bootstrap";
export const Primarynavbar = ()=>{
    return <>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
                  <NavLink className ="nav-link" to='/'>Login</NavLink>
                  <NavLink className ="nav-link" to='/registration'>Registration</NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
}