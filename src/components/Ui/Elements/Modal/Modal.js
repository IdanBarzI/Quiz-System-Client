import React from "react";
import ReactDOM from "react-dom";
import CSSTransition from "react-transition-group/CSSTransition";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return (
    <>
      {props.show && (
        <div className={classes.backdrop} onClick={props.onCancle} />
      )}
    </>
  );
};

const ModalOverlay = (props) => {
  return (
    <div className={props.scroll ? classes.scrollableModal : classes.modal}>
      <div className={classes.modalDialog}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div
          className={props.scroll ? classes.scrollableContent : classes.content}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

const animationTiming = {
  enter: 400,
  exit: 600,
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop
          show={props.show}
          onConfirm={props.onConfirm}
          onCancle={props.onCancle}
        />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <CSSTransition
          mountOnEnter
          unmountOnExit
          in={props.show}
          timeout={animationTiming}
          classNames={{
            enterActive: classes.modalOpen,
            exitActive: classes.modalClose,
          }}
        >
          <ModalOverlay
            children={props.children}
            scroll={props.scroll}
            title={props.title}
            message={props.message}
            onConfirm={props.onConfirm}
            onCancle={props.onCancle}
          />
        </CSSTransition>,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default Modal;
