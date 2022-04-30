import BaseContainer from "components/ui/BaseContainer";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { api, handleError } from "helpers/api";
import { useState } from "react";
import User from "models/User";
import "styles/views/Profile.scss";
import { Button } from "components/ui/Button";
import { Link, useHistory, useLocation } from "react-router-dom";
import NavbarComp from "components/ui/NavbarComp";

const Profile = () => {
  let userIdOfCurrentUser = localStorage.getItem("currentUser");

  let { userId } = useParams();

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
  const [isManager, setIsManager] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const loadProfile = async () => {
    try {
      const response = await api.get(`/users/${userId}/profile`);

      // Get the returned user and update a new object.
      const user = new User(response.data);
      setUsername(user.username);
      setPassword(user.password);
      setStreet(user.street);
      setStreetNo(user.streetNo);
      setZipCode(user.zipCode);
      setCity(user.city);
      setPhoneNumber(user.phoneNumber);
      setEmail(user.email);
      setCreditCardNumber(user.creditCardNumber);
      setLicensePlate(user.licensePlate);
      setIsManager(user.isManager);
      setIsLoggedIn(user.isLoggedIn);
    } catch (error) {
      alert(
        `Something went wrong while loading the profile page: \n${handleError(
          error
        )}`
      );
    }
  };

  const delProfile = async () => {
    try {
      // delete user profile
      const del = await api.delete(`/users/${userId}/profile`);

      // delete successfully worked -- return to start page
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      history.push("/");
    } catch (error) {
      alert(
        `Something went wrong while loading the profile page: \n${handleError(
          error
        )}`
      );
    }
  };

  loadProfile();
  const location = useLocation();
  const currentPath = location.pathname;
  const history = useHistory();

  return (
    <div>
      <NavbarComp />
      <BaseContainer>
        {userIdOfCurrentUser === userId ? (
          <>
            <h1 className="edit title">Profile page of user: {username}</h1>
            {/* <table>
              <tr>
                <td>Username</td>
                <td>{username}</td>
              </tr>
              <tr>
                <td>Online Status</td>
                <td>{isLoggedIn ? "Online" : "Offline"}</td>
              </tr>
              <tr>
                <td>Creation Date</td>
                <td>{isManager}</td>
              </tr>
            </table> */}
            //TODO: SCSS change titles of classNames (minor)
            <div className="carpark adressAndHours ">
              {/*------------------- Personal Info --------------------- */}
              <div className="carpark leftElement">
                <div className="carpark elementTitle">Personal Details</div>
                <div className="carpark Details">
                  <div className="carpark weekTitle">Username</div>
                  <div className="carpark week">{username}</div>
                  <div className="carpark weekTitle">Manager/User</div>
                  <div className="carpark week">
                    {isManager ? "Carpark Manager" : "Carpark User"}
                  </div>
                  <div className="carpark weekTitle">Status</div>
                  <div className="carpark week">
                    {isLoggedIn ? "Online" : "Offline"}
                  </div>
                  <div className="carpark weekTitle">Street & Number</div>
                  <div className="carpark week">{street + " " + streetNo}</div>
                  <div className="carpark weekTitle">PLZ & City</div>
                  <div className="carpark week">{zipCode + " " + city}</div>
                </div>
              </div>

              {/*------------------- Car Info --------------------- */}
              <div className="carpark rightElement">
                <div className="carpark elementTitle">Other Details</div>
                <div className="carpark Details">
                  <div className="carpark weekTitle">License Plate</div>
                  <div className="carpark week">{licensePlate}</div>
                  <div className="carpark weekTitle">Phone Number</div>
                  <div className="carpark week">{phoneNumber}</div>
                  <div className="carpark weekTitle">Email</div>
                  <div className="carpark week">{email}</div>
                  <div className="carpark weekTitle">Credit Card Nr</div>
                  <div className="carpark week">{creditCardNumber}</div>
                </div>
              </div>
            </div>
            <div className="edit button-container">
              <Button
                className="edit button"
                width="50%"
                onClick={() => history.push(`${currentPath}/edit`)}
              >
                Edit User Profile
              </Button>
            </div>

            //TODO: style button container for deletion (red?)
            <div className="edit button-container">
              <Button
                className="edit button"
                width="50%"
                onClick={() => delProfile()}
              >
                Delete User Profile
              </Button>
            </div>
          </>
        ) : (
          <a></a>
        )}
      </BaseContainer>
    </div>
  );
};

export default Profile;
