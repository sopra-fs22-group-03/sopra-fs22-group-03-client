import BaseContainer from "components/ui/BaseContainer";
import { Button } from "components/ui/Button";
import NavbarComp from "components/ui/NavbarComp";
import React from "react";
import { useHistory } from "react-router-dom";
import "styles/views/Start.scss";
import Logo from "../../img/Logo1.png";

const Start = (props) => {
  const history = useHistory();

  const goToLogin = (login) => {
    history.push("/login");
  };

  const goToRegistration = () => {
    history.push("/registration");
  };

  return (
    <BaseContainer className="start container">
      <div className="start logo">
        <img src={Logo} />
      </div>
      <div className="start title">
        <p>Ready to never worry again?</p>
      </div>
      <div className="start buttons">
        <div className="start login">
          <Button className="start button" onClick={() => goToLogin()}>
            Login
          </Button>
        </div>
        <div className="start registration">
          <Button className="start button" onClick={() => goToRegistration()}>
            Register
          </Button>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Start;