import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/ProfileEditor.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import NavbarComp from "components/ui/NavbarComp";

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

const FormField2 = (props) => {
  return (
    <div className="registration largeInput">
      <label className="registration label">{props.label}</label>
      <input
        className="registration inputMiddle"
        placeholder={props.placeholder}
        value={props.value}
        type={props.type}
        onChange={(f) => props.onChange(f.target.value)}
      />
    </div>
  );
};

FormField2.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const FormField3 = (props) => {
  return (
    <div className="registration smallInput">
      <label className="registration label">{props.label}</label>
      <input
        className="registration inputSmall"
        placeholder={props.placeholder}
        value={props.value}
        type={props.type}
        onChange={(g) => props.onChange(g.target.value)}
      />
    </div>
  );
};

FormField3.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const ProfileEditor = (props) => {
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

  let { userId } = useParams();

  const doEdit = async () => {
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
      const response = await api.put(`/users/${userId}/profile`, requestBody);

      // Edit successfully worked --> navigate back to user page
      history.goBack();
    } catch (error) {
      alert(`Something went wrong during the edit: \n${handleError(error)}`);
    }
  };

  return (
    <div>
      <NavbarComp />
      <BaseContainer>
      <h1 className="edit title">Edit Profile</h1>
      <h4 className="edit note">NOTE: Only entered values will be updated</h4>
        <div className="edit container">
          <div className="edit form">
            <FormField
              type="text"
              placeholder="Username"
              value={username}
              onChange={(n) => setUsername(n)}
            />
            <FormField
              type="password"
              placeholder="Password"
              value={password}
              onChange={(n) => setPassword(n)}
            />
            <div className="edit side-by-side">
              <FormField2
                type="text"
                placeholder="Street"
                value={street}
                onChange={(s) => setStreet(s)}
              />
              <FormField3
                type="text"
                placeholder="No."
                value={streetNo}
                onChange={(SNo) => setStreetNo(SNo)}
              />
            </div>
            <div className="edit side-by-side">
              <FormField3
                type="text"
                placeholder="Zip"
                value={zipCode}
                onChange={(z) => setZipCode(z)}
              />
              <FormField2
                type="text"
                placeholder="City"
                value={city}
                onChange={(c) => setCity(c)}
              />
            </div>
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
              placeholder="License plate"
              value={licensePlate}
              onChange={(n) => setLicensePlate(n)}
            />
            <div className="edit button-container">
              <Button
                className="edit registration-button"
                // disabled={
                //   !username ||
                //   !password ||
                //   !street ||
                //   !streetNo ||
                //   !zipCode ||
                //   !city ||
                //   !phoneNumber ||
                //   !email ||
                //   !creditCardNumber
                // }
                width="100%"
                onClick={() => doEdit()}
              >
                Update Profile
              </Button>
            </div>
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default ProfileEditor;
