import classes from "./NewTest.module.css";
import React from "react";
import { Modal } from "../../Ui";

const NewTest = ({ setClose }) => {
  return <Modal onCancle={setClose}></Modal>;
};

export default NewTest;
