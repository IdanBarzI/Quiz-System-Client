import React, { useState } from "react";
import { Box } from "../components/Ui";
import LoginForm from "../components/Login/LoginForm";
import logo from "../assets/Idan Logo.svg";

const Login = (props) => {
  return (
    <Box>
      <img className="logo" src={logo} width={"200rem"} />
      <LoginForm />
    </Box>
  );
};

export default Login;
