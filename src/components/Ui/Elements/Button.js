import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  const btnClasses = `${classes.btnSave} ${props.className}`;
  return (
    <>
      <button
        type={props.type}
        onClick={props.onClick}
        className={btnClasses}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    </>
  );
};

export default Button;
