import React, { useState, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import AppContext from "../../context/AppContext";
import { Input, Icon, ToolTip } from "../Ui";
import serverAccess from "../../api/serverAccess";
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
  const navigate = useNavigate();

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (formState.isFormValid) {
      serverAccess
        .post("/users/login", {
          email: formState.email.value,
          password: formState.password.value,
        })
        .then(function (response) {
          setIsLoading(false);
          if (response.status !== 200) {
            //show error to the user
            return;
          }
          ctx.setUser(response.data.user);
          ctx.setToken(response.data.token);
          window.localStorage.setItem("Json-Web-Token",response.data.token)
          window.localStorage.setItem("user",JSON.stringify(response.data.user))
          navigate("/admin/main-menu", { replace: true });
        })
        .catch(function (error) {
          setIsLoading(false);
          //show error to the user
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
      <div>123456789</div>
    </form>
  );
};

export default LoginForm;
