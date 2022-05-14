import React from 'react';
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import "styles/ui/NavbarComp.scss";
import Logo from "../../img/Logo1White.png";
import Notification from 'models/Notification';
import { useHistory } from "react-router-dom";
import {api, handleError} from 'helpers/api';
import {useEffect, useRef, useState} from 'react';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
//TODO: Fix bug prompt window, sound?
const NavbarComp = () => {
    const userId = localStorage.getItem("currentUser");
    const [notificationData, setNotificationData] = useState(null);
    const prevNotifications = usePrevious(notificationData);
    const history = useHistory();
    // const [notificationId, setNotificationId] = useState(null);
    // const [requesterId, setRequesterId] = useState(null);
    // const [requestedId, setRequestedId] = useState(null);
    // const [billingId, setBillingId] = useState(null);
    // const [response, setResponse] = useState(null);
    console.log(userId);
    useEffect(() => {
      setInterval(() => {
        async function fetchData() {
            const response = await api.get(`/users/${userId}/notifications`);
            setNotificationData(response.data);            
        }
        fetchData();
        // Get the returned notification and update a new object.
        //   const notification = new Notification(response.data);
        //   setNotificationId(notification.notificationId);
        //   setRequesterId(notification.requesterId);
        //   setRequestedId(notification.requestedId);
        //   setBillingId(notification.billingId);
        //   setResponse(notification.response);
      }, 2000);
    }, []);
    if (JSON.stringify(prevNotifications) != JSON.stringify(notificationData)) {
        if (JSON.stringify(notificationData) != "[]") {
            if (window.location.pathname != "/notifications" && window.location.pathname != "/notifications/") {
                if (window.confirm("You have a new message, do you want to answer it right away?")) {
                    history.push("/notifications");
                }
            }
        }
    }
    

    return <div>
        <Navbar className="navbar fixed-top color navbar-dark" expand="lg">
            <Container>
                <a className="navbar-brand" href="/game/dashboard">
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
                    <Nav.Link href={"/notifications/"}>Notifications</Nav.Link>
                    <Nav.Link href={"/logout/" + userId}>Logout</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
    </div>;
}

export default NavbarComp;


// note: Use this by inserting <NavbarComp /> BEFORE the BaseContainer (therefore use a div)