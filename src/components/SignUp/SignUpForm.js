import React, { useState, useContext } from "react";
import useFetch from "../../hooks/use-fetch";
import validator from "validator";
import AppContext from "../../context/AppContext";
import { Input, Button } from "../Ui";
import "./SignUpForm.css";

const SignUpForm = (props) => {
  const { isLoading, error, sendRequest: sendSignupRequest } = useFetch();
  const { login } = useContext(AppContext);
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
  };

  const passwordInputChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const confirmPasswordInputChangeHandler = (event) => {
    setEnteredConfirmPassword(event.target.value);
  };

  const validateEmail = () => {
    if (validator.isEmail(enteredEmail)) {
      setEnteredEmailIsValid(true);
    } else {
      setEmailError("Enter a valid Email!");
      setEnteredEmailIsValid(false);
    }
  };

  const validatePassword = () => {
    if (enteredConfirmPassword !== enteredPassword) {
      setPasswordError("Passwords are not match!");
      setEnteredPasswordIsValid(false);
    } else if (enteredPassword.trim().length < 6) {
      setPasswordError("Password must have at least 6 characters!");
      setEnteredPasswordIsValid(false);
    } else {
      setEnteredPasswordIsValid(true);
    }
  };

  const signupHandler = async () => {
    if (!enteredEmailIsValid && !enteredPassword) {
      await sendSignupRequest(
        {
          url: `${process.env.REACT_APP_BASE_URL}/users`,
          method: "POST",
          body: {
            email: enteredEmail,
            password: enteredPassword,
          },
        },
        (data) => {
          console.log(data);
          login(data.user, data.token);
        }
      );
    }
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    signupHandler();
  };

  return (
    <form className="sign-up-form" onSubmit={formSubmissionHandler}>
      <div className="form-control email">
        <Input
          name="Email"
          i="envelope"
          enteredvalueIsValid={enteredEmailIsValid}
          errorMsg={emailError}
          hasError={!enteredEmailIsValid}
          touched
          onChange={emailInputChangeHandler}
          onBlur={validateEmail}
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
          touched
          enteredvalueIsValid={enteredPasswordIsValid}
          errorMsg={passwordError}
          hasError={!enteredPasswordIsValid}
          onChange={confirmPasswordInputChangeHandler}
          onBlur={validatePassword}
        />
      </div>
      {!enteredFormIsValid && (
        <p className="error-msg">Your password or email are incorrect</p>
      )}
      <div className="form-actions">
        <Button isLoading={isLoading} type="submit" className="btn-login">
          SIGNUP
        </Button>
        {error && <p className="errorMsg">{error}</p>}
      </div>
    </form>
  );
};

export default SignUpForm;
