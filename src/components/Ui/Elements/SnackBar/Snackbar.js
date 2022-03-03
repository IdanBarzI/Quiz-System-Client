import React, { useState, forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import "./Snackbar.css";

const Snackbar = forwardRef((props, ref) => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  useImperativeHandle(ref, () => ({
    show(message, type) {
      setShowSnackbar(true);
      setMessage(message);
      setType(type);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
    },
  }));
  return (
    <>
      {ReactDOM.createPortal(
        <div
          className="snackbar"
          id={showSnackbar ? "show" : "hide"}
          style={{
            backgroundColor:
              type === "success" ? "var(--succes-color)" : "var(--error-color)",
          }}
        >
          <div className="symbol">
            {type === "success" ? <h1>&#10004;</h1> : <h1>&#10008;</h1>}
          </div>
          <div className="message">{message}</div>
        </div>,
        document.getElementById("snackbar-root")
      )}
    </>
  );
});

export default Snackbar;
