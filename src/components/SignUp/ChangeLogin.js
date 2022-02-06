import React from "react";
import "./ChangeLogin.css";

const ChangeLogin = (props) => {
  return (
    <div className="change-to">
      <a className="c-item" onClick={props.onLoginClick}>
        Allready have a user?
      </a>
    </div>
  );
};

export default ChangeLogin;
