import React, { useState } from "react";
import "./SignUpForm.css";

import { Input, Icon, ToolTip } from "../Ui";
import validator from "validator";

const SignUpForm = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [enteredPasswordIsValid, setEnteredPasswordIsValid] = useState(true);
  const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(true);
  const [enteredFormIsValid, setEnteredFormIsValid] = useState(true);

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
    console.log(event.target.value);
  };

  const passwordInputChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const confirmPasswordInputChangeHandler = (event) => {
    setEnteredConfirmPassword(event.target.value);
  };

  const validateEmail = () => {
    if (!validator.isEmail(enteredEmail)) {
      setEmailError("Enter a valid Email!");
      setEnteredEmailIsValid(false);
      return false;
    }

    setEnteredEmailIsValid(true);
    return true;
  };

  const validatePassword = () => {
    if (enteredConfirmPassword !== enteredPassword) {
      setPasswordError("Enter Passwords are not the same!");
      setEnteredPasswordIsValid(false);
      return false;
    }

    setEnteredPasswordIsValid(true);
    return true;
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    setEnteredFormIsValid(true);
    if (!validateEmail() && validatePassword()) {
      return;
    }
  };

  const formReset = (event) => {
    event.preventDefault();
    setEnteredPasswordIsValid(true);
    setEnteredEmailIsValid(true);
    setEnteredFormIsValid(true);
  };

  return (
    <form
      className="sign-up-form"
      onSubmit={formSubmissionHandler}
      onReset={formReset}
    >
      <div className="top-actions">
        <button type="reset" className="form-btn btn-reset">
          <ToolTip text="Reset Form">
            <Icon i="redo" />
          </ToolTip>
        </button>
      </div>
      <div className="form-control email">
        <Input
          name="Email"
          i="envelope"
          enteredvalueIsValid={enteredEmailIsValid}
          errorMsg={emailError}
          onChange={emailInputChangeHandler}
        />
      </div>
      <div className="form-control password">
        <Input
          type="password"
          name="Password"
          i="lock"
          enteredvalueIsValid={enteredPasswordIsValid}
          onChange={passwordInputChangeHandler}
        />
      </div>
      <div className="form-control confirm-password">
        <Input
          type="password"
          name="Confirm Password"
          i="lock"
          enteredvalueIsValid={enteredPasswordIsValid}
          errorMsg={passwordError}
          onChange={confirmPasswordInputChangeHandler}
        />
      </div>
      {!enteredFormIsValid && (
        <p className="error-msg">Your password or email are incorrect</p>
      )}
      <div className="form-actions">
        <button type="submit" className="form-btn btn-login">
          SIGNUP
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
