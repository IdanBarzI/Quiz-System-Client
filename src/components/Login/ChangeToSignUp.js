import React from "react";
import "./ChangeToSignUp.css";

const ChangeToSignUp = (props) => {
  return (
    <div className="change-to">
      <a className="c-item sign-up" onClick={props.onSignUpClick}>
        Dont have a user?
      </a>
      <a className="c-item">Forgot password?</a>
    </div>
  );
};

export default ChangeToSignUp;
