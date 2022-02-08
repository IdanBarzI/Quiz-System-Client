import React, { useState, useReducer, useContext } from "react";
import "./LoginForm.css";
import AppContext from "../../context/AppContext";
import Input from "../../Ui/Elements/Input";
import Icon from "../../Ui/Elements/Icon";
import ToolTip from "../../Ui/Elements/ToolTip";
import axios from "axios";
import { UPDATE_FORM, onFocusOut } from "../../lib/loginFormUtils";

const initialState = {
  email: { value: "", touched: false, hasError: false, error: "" },
  password: { value: "", touched: false, hasError: false, error: "" },
  isFormValid: true,
};

const formsReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      const { name, value, touched, hasError, error, isFormValid } =
        action.data;
      return {
        ...state,
        [name]: { ...state[name], touched, value, hasError, error },
        isFormValid,
      };
    default:
      return state;
  }
};

const LoginForm = (props) => {
  const [formState, dispatch] = useReducer(formsReducer, initialState);
  const ctx = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (formState.isFormValid) {
      axios
        .post("http://localhost:5000/users/login", {
          email: formState.email.value,
          password: formState.password.value,
        })
        .then(function (response) {
          setIsLoading(false);
          if (response.status !== 200) {
          }
          ctx.user = response.data.user;
          ctx.token = response.data.token;
        })
        .catch(function (error) {
          setIsLoading(false);
          console.log(error);
        });
      console.log(isLoading);
    }
  };

  const formReset = (event) => {
    event.preventDefault();
    console.log(ctx.user);
    console.log(ctx.token);
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
          hasError={formState.email.hasError}
          errorMsg={formState.email.error}
          touched={formState.email.touched}
          onBlur={(e) => {
            onFocusOut("email", e.target.value, dispatch, formState);
          }}
        />
      </div>
      <div className="form-control password">
        <Input
          type="password"
          name="Password"
          i="lock"
          hasError={formState.password.hasError}
          errorMsg={formState.password.error}
          touched={formState.password.touched}
          onBlur={(e) => {
            onFocusOut("password", e.target.value, dispatch, formState);
          }}
        />
      </div>
      <div className="form-actions">
        {isLoading ? (
          <p>Sending</p>
        ) : (
          <button type="submit" className="form-btn btn-login">
            LOGIN
          </button>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
