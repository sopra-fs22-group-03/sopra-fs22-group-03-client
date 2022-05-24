import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import "styles/ui/NavbarComp.scss";
import Logo from "../../img/Logo1White.png";
import Notification from "models/Notification";
import { useHistory } from "react-router-dom";
import { api, handleError } from "helpers/api";
import { useEffect, useRef, useState } from "react";

// Hook
function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

// function usePrevious(value) {
//   if (JSON.stringify(value) !== "null" && JSON.stringify(value) !== "undefined") {
//     localStorage.setItem("prevNotification", JSON.stringify(value));
//   }
//   const prev = localStorage.getItem("prevNotification");
//   return prev;
// }

//TODO: Fix bugs, sound?
const NavbarComp = () => {
  // Notification useEffect that checks if a new notification has arrived
  // Prompts the user whether to answer the request right away
  const userId = localStorage.getItem("currentUser");
  const [notificationData, setNotificationData] = useState(null);
  const prevNotifications = usePrevious(notificationData);
  const history = useHistory();
  console.log(userId);
  useEffect(() => {
    setInterval(() => {
      async function fetchData() {
        const response = await api.get(`/users/${userId}/notifications`);
        setNotificationData(response.data);
      }
      fetchData();
    }, 2000);
  }, []);

  // initialization: first notification needs to be set for prompt not to appear twice
  if (
    !localStorage.getItem("prevNotification") &&
    JSON.stringify(notificationData) !== "null"
  ) {
    localStorage.setItem("prevNotification", JSON.stringify(notificationData));
  }

  // set localStorage to previous notification
  if (
    JSON.stringify(prevNotifications) !== "null" &&
    JSON.stringify(prevNotifications) !== undefined
  ) {
    localStorage.setItem("prevNotification", JSON.stringify(prevNotifications));
  }

  // check if user should be prompted to answer new message that arrived
  if (localStorage.getItem("notificationPrompt") !== "true") {
    if (
      JSON.stringify(notificationData) !== "[]" &&
      JSON.stringify(notificationData) !== "null" &&
      JSON.stringify(notificationData) !== undefined
    ) {
      localStorage.setItem("notificationPrompt", "true");
      if (
        window.confirm(
          "You have a new message, do you want to answer it right away?"
        )
      ) {
        history.push("/notifications");
      }
    }
  }

  // if a new message has arrived, set notificationPrompt to false -> triggers prompt
  if (
    JSON.stringify(notificationData) !== undefined &&
    JSON.stringify(notificationData) !== "null"
  ) {
    if (
      localStorage.getItem("prevNotification").length <
      JSON.stringify(notificationData).length
    ) {
      localStorage.setItem("notificationPrompt", "false");
    }
  }

  return (
    <div>
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
              <Nav.Link href="/billing"> Billing</Nav.Link>
              <Nav.Link href="/reservations">Reservations</Nav.Link>
              <Nav.Link href={"/profile/" + userId}>Profile</Nav.Link>
              <Nav.Link href={"/notifications/"}>Notifications</Nav.Link>
              <div className="navbar logoutFrame">
                <div className="navbar logout">
                  <Nav.Link href={"/logout/" + userId}>Logout</Nav.Link>
                </div>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComp;

// note: Use this by inserting <NavbarComp /> BEFORE the BaseContainer (therefore use a div)
