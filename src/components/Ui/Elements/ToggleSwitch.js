import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = (props) => {
  return (
    <div className="box">
      <input
        type="checkbox"
        className="toggle"
        name=""
        id=""
        onChange={props.onChange}
      />
      <div className="dot"></div>
    </div>
  );
};

export default ToggleSwitch;
