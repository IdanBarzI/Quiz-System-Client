import React, { useState } from "react";
import LoginForm from "../components/Login/LoginForm";
import logo from "../assets/Idan Logo.svg";

const Login = (props) => {
  return (
    <div>
      <img className="logo" src={logo} width={"200rem"} />
      <LoginForm />
    </div>
  );
};

export default Login;
