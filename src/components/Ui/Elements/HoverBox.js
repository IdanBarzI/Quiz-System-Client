import React, { useRef } from "react";
import { Icon } from "../../Ui";
import classes from "./HoverBox.module.css";

const HoverBox = (props) => {
  return (
    <div className={classes.continer}>
      <Icon i={props.i} className={classes.icon} />
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

export default HoverBox;
