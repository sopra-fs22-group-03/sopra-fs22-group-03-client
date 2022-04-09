import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Registration.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormField = (props) => {
  return (
    <div className="registration field">
      <label className="registration label">{props.label}</label>
      <input
        className="registration input"
        placeholder={props.placeholder}
        value={props.value}
        type={props.type}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const Registration = (props) => {
  const history = useHistory();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [street, setStreet] = useState(null);
  const [streetNo, setStreetNo] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [city, setCity] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [creditCardNumber, setCreditCardNumber] = useState(null);
  const [licensePlate, setLicensePlate] = useState(null);

  const doRegistration = async () => {
    try {
      const requestBody = JSON.stringify({
        username,
        password,
        street,
        streetNo,
        zipCode,
        city,
        phoneNumber,
        email,
        creditCardNumber,
        licensePlate,
      });
      const response = await api.post("/users", requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem("token", user.token);

      // Store the ID of the currently logged-in user in localstorage
      localStorage.setItem("currentUser", user.id);

      // Registration successfully worked --> navigate to the route /game in the GameRouter
      history.push(`/game`);
    } catch (error) {
      alert(
        `Something went wrong during the registration: \n${handleError(error)}`
      );
    }
  };

  const goToLogin = (login) => {
    history.push("/login");
  };

  return (
    <BaseContainer>
      <div className="registration to-login">
        <Button 
        className="registration loginbutton" 
        onClick={() => goToLogin()}>
          Login
        </Button>
        {/* <ReactLogo width="60px" height="60px"/> */}
      </div>
      <div className="registration container">
        <div className="registration form">
          <FormField
            type="text"
            placeholder="Username"
            value={username}
            onChange={(un) => setUsername(un)}
          />
          <FormField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(n) => setPassword(n)}
          />
          <FormField
            type="text"
            placeholder="Street"
            value={street}
            onChange={(n) => setStreet(n)}
          />
          <FormField
            type="text"
            placeholder="No."
            value={streetNo}
            onChange={(n) => setStreetNo(n)}
          />
          <FormField
            type="text"
            placeholder="Zip Code"
            value={zipCode}
            onChange={(n) => setZipCode(n)}
          />
          <FormField
            type="text"
            placeholder="City"
            value={city}
            onChange={(n) => setCity(n)}
          />
          <FormField
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(n) => setPhoneNumber(n)}
          />
          <FormField
            type="text"
            placeholder="Email"
            value={email}
            onChange={(n) => setEmail(n)}
          />
          <FormField
            type="text"
            placeholder="Credit card number"
            value={creditCardNumber}
            onChange={(n) => setCreditCardNumber(n)}
          />
          <FormField
            type="text"
            placeholder="License plate (optional)"
            value={licensePlate}
            onChange={(n) => setLicensePlate(n)}
          />
          <div className="registration button-container">
            <Button
              className="registration registration-button"
              disabled={
                !username ||
                !password ||
                !street ||
                !streetNo ||
                !zipCode ||
                !city ||
                !phoneNumber ||
                !email ||
                !creditCardNumber
              }
              width="100%"
              onClick={() => doRegistration()}
            >
              Submit
            </Button>
          </div>
          {/* <div className="registration login-switch">
            Already a user? Click
            <a className="registration login-switch-link" href="/login"> here </a>
            to login!
        </div> */}
        </div>
        <div className="registration sign-up">
          <h1 className="header title">
            Sign up today.
            <br />
            It's free!
          </h1>
        </div>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Registration;