import {Navbar, Nav, NavDropdown, Container} from 'react-bootstrap'
import './Navbar.css'

function Navbars() {
    return (
        <Navbar bg="dark" expand="lg">
            <Container>
            <Navbar.Brand className="nav-brand" href="#home">STORE</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link className='nav-link' href="/">PRODUCT</Nav.Link>
                    <Nav.Link className='nav-link' href="/employee">EMPLOYEE</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link className='nav-link' href="#deets">SIGN OUT</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
  }
  
  export default Navbars;