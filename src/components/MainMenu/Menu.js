import React, { useContext, useEffect } from "react";
import classes from "./Menu.module.css";
import AppContext from "../../context/AppContext";

const Menu = () => {
  const ctx = useContext(AppContext);

  useEffect(() => {
    console.log(ctx);
  }, []);

  return (
    <div>
      <div>Main Menu</div>
    </div>
  );
};

export default Menu;
