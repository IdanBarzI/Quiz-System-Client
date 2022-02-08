import React from "react";
import logo from "../assets/Idan Logo.svg";
import SignUpForm from "../components/SignUp/SignUpForm";
import { Box } from "../components/Ui";

const SignUp = (props) => {
  return (
    <Box>
      <img className="logo" src={logo} width={"200rem"} />
      <SignUpForm />
    </Box>
  );
};

export default SignUp;
