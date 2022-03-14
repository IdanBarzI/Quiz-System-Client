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
        {props.isLoading ? (
          <>
            <i className="fa fa-spinner fa-spin"></i>Loading
          </>
        ) : (
          props.children
        )}
      </button>
    </>
  );
};

export default Button;
