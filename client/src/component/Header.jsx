import React from 'react'
import { useNavigate , Link } from 'react-router-dom'
import { Container , Nav, Navbar } from 'react-bootstrap'

const Header = () => {
    const token = localStorage.getItem('token')
    const Navigate = useNavigate();
    const HandleLogout = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('RefleshTokentoken')
        Navigate('/Login')
    }
  return (
    <Navbar
  style={{
    backgroundColor: token ? '#adb5bd' : '#343a40', // Use '#343a40' for dark
  }}
     variant="dark"
      expand="lg"
>
    <Container>
        {/* Brand Name */}
        <Navbar.Brand as={Link} to="/Login" className="text-uppercase fw-bold text-light">
            Auth-APP
        </Navbar.Brand>
        
        {/* Navigation Links */}
        <Nav className="ms-auto">
            {token ? (
                <>
                    <Nav.Link as={Link} to="/Dashboard" className="nav-link-custom" style={{color : "black"}}>
                        Profile
                    </Nav.Link>
                    <Nav.Link onClick={HandleLogout} className="nav-link-custom logout-link" style={{color : "black"}}>
                        Logout
                    </Nav.Link>
                </>
            ) : (
                <>
                    <Nav.Link as={Link} to="/Login" className="nav-link-custom">
                        Login
                    </Nav.Link>
                    <Nav.Link as={Link} to="/Register" className="nav-link-custom">
                        Register
                    </Nav.Link>
                </>
            )}
        </Nav>
    </Container>
</Navbar>
  )
}

export default Header