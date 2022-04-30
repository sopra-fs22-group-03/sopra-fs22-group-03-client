import React from 'react';
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import "styles/ui/NavbarComp.scss";
import Logo from "../../img/Logo1White.png";


const NavbarComp = () => {
    let userId = localStorage.getItem("currentUser");
    
    return <div>
        <Navbar className="navbar fixed-top color navbar-dark" expand="lg">
            <Container>
                <a className="navbar-brand" href="/">
                    <img src={Logo} height="36"></img>
                </a>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="navbar-collapse justify-content-center">
                    <Nav.Link href="/game/dashboard">Tabular Overview</Nav.Link>
                    <Nav.Link href="/map">Map</Nav.Link>
                    <Nav.Link href= "/billing"> Billing</Nav.Link>
                    <Nav.Link href="/reservations">Reservations</Nav.Link>
                    <Nav.Link href={"/profile/" + userId}>Profile</Nav.Link>
                    <Nav.Link href={"/logout/" + userId}>Logout</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
    </div>;
}


export default NavbarComp;


// note: Use this by inserting <NavbarComp /> BEFORE the BaseContainer (therefore use a div)