import React, { useState } from "react";
import { useStore } from "../../../../../store/store";
import useFetch from "../../../../../hooks/use-fetch";

import { Input, Button } from "../../../../Ui";
import classes from "./AddTag.module.css";

const AddTag = (props) => {
  const [title, setTitle] = useState("");
  const dispatchStore = useStore(false)[1];
  const { isLoading, error, sendRequest: sendAddTagRequest } = useFetch();
  const enterTagHandler = async () => {
    if (title.length > 0) {
      await sendAddTagRequest(
        {
          url: `http://localhost:5000/tags`,
          method: "POST",
          body: { title: title },
        },
        (tag) => {
          dispatchStore("ADD_TAG", tag);
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    enterTagHandler();
  };

  return (
    <form className={classes.tagForm} onSubmit={(e) => handleSubmit(e)}>
      <div className={classes.input}>
        <Input
          name="New Tag"
          onChange={(e) => setTitle(e.target.value)}
          touched
          hasError
          errorMsg={error}
        />
      </div>
      <div>
        <Button isLoading={isLoading} type="submit">
          Submit New Tag
        </Button>
      </div>
    </form>
  );
};

export default AddTag;
