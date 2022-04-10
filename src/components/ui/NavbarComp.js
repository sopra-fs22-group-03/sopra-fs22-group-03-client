import React from 'react';
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import "styles/ui/NavbarComp.scss";
import Logo from "../../img/Logo1White.png";


const NavbarComp = () => {
    return <div>
        <Navbar className="navbar fixed-top color navbar-dark" expand="lg">
            <Container>
                <a className="navbar-brand" href="/start">
                    <img src={Logo} height="36"></img>
                </a>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="navbar-collapse justify-content-center">
                    <Nav.Link href="/game/dashboard">Tabular Overview</Nav.Link>
                    <Nav.Link href="#link">Map</Nav.Link>
                    <Nav.Link href="#home">Billing</Nav.Link>
                    <Nav.Link href="#link">Reservations</Nav.Link>
                    <Nav.Link href="#home">Profile</Nav.Link>
                    <Nav.Link href="#link">Logout</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
    </div>;
}


export default NavbarComp;


// note: Use this by inserting <NavbarComp /> BEFORE the BaseContainer (therefore use a div)