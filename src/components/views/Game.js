import { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import { useHistory } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import { Link } from "react-router-dom";
import User from "models/User";
import Carpark from "models/Carpark";
import NavbarComp from "components/ui/NavbarComp";

const Player = ({ carpark }) => (
  <div className="player container">
    <div>
      <Link className="player name" to={"/carparks/" + carpark.carparkId}>
        {carpark.name}
      </Link>
    </div>
    <div className="player tariff">
      {carpark.hourlyTariff} CHF
    </div>
    <div className="player capacity">
      {carpark.numOfEmptySpaces}/{carpark.maxCapacity}
    </div>
  </div>
);

Player.propTypes = {
  carpark: PropTypes.object,
};

const Game = () => {
  // use react-router-dom's hook to access the history
  const history = useHistory();

  // define a state variable (using the state hook).
  // if this variable changes, the component will re-render, but the variable will
  // keep its value throughout render cycles.
  // a component can have as many state variables as you like.
  // more information can be found under https://reactjs.org/docs/hooks-state.html
  const [carparks, setCarparks] = useState(null);

  const logout = () => {
    let userId = localStorage.getItem("currentUser");

    const doLogout = async () => {
      try {
        const response = await api.post(`/users/${userId}/logout`);

        // Get the returned user
        const user = new User(response.data);

        console.log(
          "Status of user with id " + user.id + " is now: " + user.logged_in
        );

        // Logout successfully worked --> navigate to the route /login
        localStorage.removeItem("token");
        history.push("/login");
      } catch (error) {
        alert(
          `Something went wrong during the logout: \n${handleError(error)}`
        );
      }
    };

    doLogout();
  };

  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
      try {
        // fetch all carparks through REST API
        const response = await api.get("/carparks");

        // delays continuous execution of an async operation for 1 second.
        // This is just a fake async call, so that the spinner can be displayed
        // feel free to remove it :)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get the returned users and update the state.
        setCarparks(response.data);

        // This is just some data for you to see what is available.
        // Feel free to remove it.
        console.log("request to:", response.request.responseURL);
        console.log("status code:", response.status);
        console.log("status text:", response.statusText);
        console.log("requested data:", response.data);

        // See here to get more data.
        console.log(response);
      } catch (error) {
        console.error(
          `Something went wrong while fetching the users: \n${handleError(
            error
          )}`
        );
        console.error("Details:", error);
        alert(
          "Something went wrong while fetching the users! See the console for details."
        );
      }
    }

    fetchData();
  }, []);

  let content = <Spinner />;

  if (carparks) {
    content = (
      <div className="game main">
        <div className="game description">
          <div className="game parkname">Name of Carpark</div>
          <div className="game tariff">Tariff (per hour)</div>
          <div className= "game capacity">Current Capacity</div>
        </div>
        <ul className="game user-list">
          {carparks.map((carpark) => (
            <Player carpark={carpark} key={carpark.carparkId} />
          ))}
        </ul>
        <Button
          className="game logout-button"
          width="100%"
          onClick={() => logout()}
        >
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div>
      <NavbarComp />
    <BaseContainer className="game container">
      <h2 className="game title">Carpark Overview</h2>
      {content}
    </BaseContainer>
    </div>
  );
};

export default Game;
