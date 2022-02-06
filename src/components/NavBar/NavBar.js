import React from "react";
import ToggleSwitch from "../../Ui/Elements/ToggleSwitch";
import "./NavBar.css";

const NavBar = (props) => {
  return (
    <div className="nav-bar">
      <ToggleSwitch onChange={props.onChange}></ToggleSwitch>
    </div>
  );
};

export default NavBar;
