import React, { useReducer, useContext } from "react";
import useFetch from "../../hooks/use-fetch";
import AppContext from "../../context/AppContext";
import { Input, Button } from "../Ui";
import { UPDATE_FORM, RESET_FORM, onFocusOut } from "../../lib/loginFormUtils";
import "./LoginForm.css";

const initialState = {
  email: { value: "", touched: false, hasError: false, error: "" },
  password: { value: "", touched: false, hasError: false, error: "" },
  isFormValid: true,
};

const formsReducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case UPDATE_FORM:
      const { name, value, touched, hasError, error, isFormValid } =
        action.data;
      return {
        ...state,
        [name]: { ...state[name], touched, value, hasError, error },
        isFormValid,
      };
    case RESET_FORM:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

const LoginForm = (props) => {
  const [formState, dispatch] = useReducer(formsReducer, initialState);
  const { login } = useContext(AppContext);
  const { isLoading, error, sendRequest: sendLoginRequest } = useFetch();

  const loginHandler = async () => {
    if (formState.isFormValid) {
      await sendLoginRequest(
        {
          url: `${process.env.REACT_APP_BASE_URL}/users/login`,
          method: "POST",
          body: {
            email: formState.email.value,
            password: formState.password.value,
          },
        },
        (data) => {
          login(data.user, data.token);
        }
      );
    }
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    loginHandler();
  };

  return (
    <form className="login-form" onSubmit={formSubmissionHandler}>
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
        <Button type="submit" isLoading={isLoading} className="btn-login">
          LOGIN
        </Button>
        {error && <p className="errorMsg">{error}</p>}
      </div>
    </form>
  );
};

export default LoginForm;
