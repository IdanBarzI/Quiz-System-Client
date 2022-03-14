import React, { useRef, useState, useEffect } from "react";
import JoditEditor from "jodit-react";

const TextEditor = (props) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (props.content.trim() === "") {
      props.setContent("");
    }
  }, []);

  const config = {
    readonly: false,
  };

  const handelBlur = (newContent) => {
    props.setContent(newContent.slice(3, -4));
  };

  return (
    <>
      <JoditEditor
        ref={editor}
        value={props.content}
        config={config}
        tabIndex={1}
        onBlur={(newContent) => handelBlur(newContent)}
      />
      {props.touched && props.hasError && (
        <p className="error-msg">{props.errorMsg}</p>
      )}
    </>
  );
};

export default TextEditor;
