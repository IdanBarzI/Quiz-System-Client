import React, { useState, useEffect } from "react";
import { useStore } from "../../../../../store/store";
import useAxiosFetch from "../../../../../hooks/use-axios";

import QuestionAndTags from "../../../questionAnbdTags/QuestionAndTags";
import { InputSearch, Button, LoadingSpinner } from "../../../../Ui";
import classes from "./SetTags.module.css";

const SetTags = (props) => {
  const [{ tags }, dispatchStore] = useStore();
  const { data, fetchError, isLoadingTags } = useAxiosFetch(`/tags`);
  useEffect(() => {
    dispatchStore("SET_TAGS", data);
  }, [data]);

  return (
    <div className={classes.tags}>
      <InputSearch
        list={tags}
        notRequired={true}
        name="Tags"
        onSelect={(tag) => props.addTag(props.dispatch, tag)}
      />
    </div>
  );
};

export default SetTags;
