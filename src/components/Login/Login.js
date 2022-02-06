import React, { useState } from "react";
import LoginForm from "./LoginForm";
import ChangeToSignUp from "./ChangeToSignUp";
import Box from "../../Ui/Layouts/Box";
import "./Login.css";
import logo from "../../assets/Idan Logo.svg";

const Login = (props) => {
  return (
    <Box>
      <img className="logo" src={logo} />
      <LoginForm />
      <ChangeToSignUp onSignUpClick={props.onSignUpClick} />
    </Box>
  );
};

export default Login;
