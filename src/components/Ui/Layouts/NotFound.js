import React from "react";
import classes from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={`${classes.message + " centered"}`}>
      <p className={classes.rotate}>ERROR</p>
      <h1 className={classes.error}>404</h1>
    </div>
  );
};

export default NotFound;
