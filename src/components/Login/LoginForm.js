import React, { useState } from "react";
import "./LoginForm.css";
import Input from "../../Ui/Elements/Input";
import Icon from "../../Ui/Elements/Icon";
import ToolTip from "../../Ui/Elements/ToolTip";
import validator from "validator";
import axios from "axios";

const LoginForm = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(true);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredFormIsValid, setEnteredFormIsValid] = useState(true);

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
    console.log(event.target.value);
  };

  const passwordInputChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmail = () => {
    if (!validator.isEmail(enteredEmail)) {
      setEmailError("Enter a valid Email!");
      console.log(enteredEmail);
      console.log(false);
      setEnteredEmailIsValid(false);
      return false;
    }

    setEnteredEmailIsValid(true);
    console.log(true);
    return true;
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    setEnteredFormIsValid(true);
    if (!validateEmail()) {
      return;
    }

    axios
      .post("http://localhost:5000/users/login", {
        email: enteredEmail,
        password: enteredPassword,
      })
      .then(function (response) {
        console.log(response.status);
        if (response.status !== 200) {
          setEnteredFormIsValid(false);
          return;
        }
        console.log(response);
        setEnteredFormIsValid(true);
      })
      .catch(function (error) {
        setEnteredFormIsValid(false);
      });
  };

  const formReset = (event) => {
    event.preventDefault();
    setEnteredEmailIsValid(true);
    setEnteredFormIsValid(true);
  };

  return (
    <form
      className="login-form"
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
          enteredvalueIsValid={true}
          onChange={passwordInputChangeHandler}
        />
      </div>
      {!enteredFormIsValid && (
        <p className="error-msg">Your password or email are incorrect</p>
      )}
      <div className="form-actions">
        <button type="submit" className="form-btn btn-login">
          LOGIN
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
