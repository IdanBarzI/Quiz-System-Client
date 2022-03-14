import React, { useState, forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import CSSTransition from "react-transition-group/CSSTransition";
import { Typography, Button } from "../../../Ui";
import classes from "./Prompt.module.css";

const animationTiming = {
  enter: 400,
  exit: 600,
};

const Prompt = forwardRef((props, ref) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  useImperativeHandle(ref, () => ({
    show(title, message) {
      setShowPrompt(true);
      setMessage(message);
      setTitle(title);
    },
    confirm() {
      props.confirm();
      setShowPrompt(false);
    },
    cancle() {
      props.cancle();
      setShowPrompt(false);
    },
  }));

  return (
    <>
      {ReactDOM.createPortal(
        <CSSTransition
          mountOnEnter
          unmountOnExit
          in={showPrompt}
          timeout={animationTiming}
          classNames={{
            enterActive: classes.promptOpen,
            exitActive: classes.promptClose,
          }}
        >
          <div className={classes.prompt}>
            <h2 className={classes.title}>{title}</h2>
            <Typography className={classes.message}>{message}</Typography>
            <div className={classes.actions}>
              <Button
                className={classes.btnConfirm}
                onClick={() => ref.current.confirm()}
              >
                Confirm
              </Button>
              <Button
                className={classes.btnCancle}
                onClick={() => ref.current.cancle()}
              >
                Cancle
              </Button>
            </div>
          </div>
        </CSSTransition>,
        document.getElementById("prompt-root")
      )}
    </>
  );
});

export default Prompt;
