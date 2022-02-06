import React from "react";
import logo from "../../assets/Idan Logo.svg";
import SignUpForm from "./SignUpForm";
import ChangeLogin from "./ChangeLogin";
import Box from "../../Ui/Layouts/Box";
import "./SignUp.css";

const SignUp = (props) => {
  return (
    <Box>
      <img className="logo" src={logo} />
      <SignUpForm />
      <ChangeLogin onLoginClick={props.onLoginClick} />
    </Box>
  );
};

export default SignUp;
