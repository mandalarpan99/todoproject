import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { Sidenavbar } from './Sidenavbar';
import { Primarynavbar } from './Primarynavbar';
export const NavBar = ()=>{
   const {isLoggedIn} = useAuth();
    return <>
    <header>
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">TODO - Your daily thought</Navbar.Brand>
          <Nav className="me-auto">
          {
              isLoggedIn ? (
                <>
                <NavLink className ="nav-link" to="/user">User</NavLink>
                <NavLink className ="nav-link" to="/post">Post</NavLink>
                <NavLink className ="nav-link" to="/logout">Logout</NavLink>
                
                </>
              )
              : (<>
                <NavLink className ="nav-link" to='/'>Login</NavLink>
                  <NavLink className ="nav-link" to='/registration'>Registration</NavLink>
              </>)

            }
          
          </Nav>
        </Container>
      </Navbar>
    
      </header>
    </>
};