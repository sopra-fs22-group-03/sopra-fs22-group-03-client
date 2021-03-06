import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {GameGuard} from "components/routing/routeProtectors/GameGuard";
import GameRouter from "components/routing/routers/GameRouter";
import {LoginGuard} from "components/routing/routeProtectors/LoginGuard";
import Login from "components/views/Login";
import Registration from "components/views/Registration";
import Profile from 'components/views/Profile';
import ProfileEditor from 'components/views/ProfileEditor';
import Start from 'components/views/Start';
import Map from 'components/views/Map';
import DetailPageCarPark from "components/views/DetailPageCarPark";
import Reservation from "components/views/Reservation";
import Billing from "components/views/Billing";
import Logout from "components/views/Logout";
import Notifications from "components/views/Notifications";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
        <LoginGuard>
            <Start/>
          </LoginGuard>
        </Route>
        <Route path="/game">
          <GameGuard>
            <GameRouter base="/game"/>
          </GameGuard>
        </Route>
        <Route exact path="/map" children={
          <GameGuard>
            <Map />
          </GameGuard>
        }/>
        <Route exact path="/login">
          <LoginGuard>
            <Login/>
          </LoginGuard>
        </Route>
        <Route exact path="/registration">
          <Registration/>
        </Route>
        <Route exact path = "/carparks/:parkingId" children={
          <GameGuard>
            <DetailPageCarPark />
          </GameGuard>
        }/>
        <Route exact path = "/reservations" children={
          <GameGuard>
            <Reservation />
          </GameGuard>
        }/>
        <Route exact path = "/billing" children={
          <GameGuard>
            <Billing />
          </GameGuard>
        }/>
        <Route exact path = "/notifications" children={
          <GameGuard>
            <Notifications />
          </GameGuard>
        }/>
        <Route exact path="/profile/:userId" children={
          <GameGuard>
            <Profile />
          </GameGuard>
        }/>
        <Route exact path="/profile/:userId/edit" children={
          <GameGuard>
            <ProfileEditor />
          </GameGuard>
        }/>
        <Route exact path="/logout/:userId" children={
          <GameGuard>
            <Logout />
          </GameGuard>
        }/>
      </Switch>
    </BrowserRouter>
  );
};

/*
* Don't forget to export your component!
 */
export default AppRouter;
