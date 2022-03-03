import React from "react";
import AddTag from "./AddTag/AddTag";
import SetTags from "./SetTags/SetTags";

const TagsManager = (props) => {
  return (
    <>
      <AddTag />
      <SetTags dispatch={props.dispatch} addTag={props.addTag} />
    </>
  );
};

export default TagsManager;
