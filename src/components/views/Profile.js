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
            <h1 className="edit title">Profile page of {username}</h1>
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
            <div className="profile titleAndELements ">
              {/*------------------- Personal Info --------------------- */}
              <div className="profile leftElement">
                <div className="profile elementTitle">Personal Details</div>
                <div className="profile Details">
                  <div className="profile title">Username</div>
                  <div className="profile element">{username}</div>
                  <div className="profile title">Status</div>
                  <div className="profile element">
                    {isLoggedIn ? "Online" : "Offline"}
                  </div>
                  <div className="profile title">Street & Number</div>
                  <div className="profile element">
                    {street + " " + streetNo}
                  </div>
                  <div className="profile title">PLZ & City</div>
                  <div className="profile element">{zipCode + " " + city}</div>
                </div>
              </div>

              {/*------------------- Car Info --------------------- */}
              <div className="profile rightElement">
                <div className="profile elementTitle">Other Details</div>
                <div className="profile Details">
                  <div className="profile title">License Plate</div>
                  <div className="profile element">{licensePlate}</div>
                  <div className="profile title">Phone Number</div>
                  <div className="profile element">{phoneNumber}</div>
                  <div className="profile title">Email</div>
                  <div className="profile element">{email}</div>
                  <div className="profile title">Credit Card Nr</div>
                  <div className="profile element">{creditCardNumber}</div>
                </div>
              </div>
            </div>
            <div className="edit button-container">
              <div className="edit inner-container">
                <div className="edit button-edit">
                  <Button
                    className="edit button"
                    width="50%"
                    onClick={() => history.push(`${currentPath}/edit`)}
                  >
                    Edit User Profile
                  </Button> 
                </div>

                <div className="edit button-delete">
                  <Button
                    className="edit delbutton"
                    width="50%"
                    onClick={() => {
                      if (
                        window.confirm("Do you really want to delete this user?")
                      ) {
                        delProfile();
                      }
                    }}
                  >
                    Delete User Profile
                  </Button>
                </div>
              </div>
              
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
