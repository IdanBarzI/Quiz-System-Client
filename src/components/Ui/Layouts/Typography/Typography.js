import React from "react";
import classes from "./Typography.module.css";

const Typography = (props) => {
  const typographyClasses = `${classes.typography + " " + props.className}`;
  return <div className={typographyClasses}>{props.children}</div>;
};

export default Typography;
