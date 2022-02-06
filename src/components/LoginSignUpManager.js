import React, { useState } from "react";

import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
const LoginSignUpManager = () => {
  const [isLogin, setIsLogin] = useState(true);
  const isLoginChangeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <>
      {isLogin ? (
        <Login onSignUpClick={isLoginChangeHandler} />
      ) : (
        <SignUp onLoginClick={isLoginChangeHandler} />
      )}
      ;
    </>
  );
};

export default LoginSignUpManager;
