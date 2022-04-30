import { api, handleError } from "helpers/api";
import User from "models/User";
import "styles/views/Profile.scss";
import { useHistory } from "react-router-dom";

const Logout = () => {
    let userId = localStorage.getItem("currentUser");
    const history = useHistory();

    const doLogout = async () => {
      try {
        const response = await api.post(`/users/${userId}/logout`);

        // Get the returned user
        const user = new User(response.data);

        console.log(
          "Status of user with id " + user.userId + " is now: " + user.logged_in
        );

        // Logout successfully worked --> navigate to the route /login
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        history.push("/");

        // TODO: window reload should be unnecessary?!
        window.location.reload();
      } catch (error) {
        alert(
          `Something went wrong during the logout: \n${handleError(error)}`
        );
      }
    };

    doLogout();
  };

  export default Logout;