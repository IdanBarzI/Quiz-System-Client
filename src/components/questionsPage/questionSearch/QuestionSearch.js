import React from "react";
import classes from "./QuestionSearch.module.css";
import { useStore } from "../../../store/store";
import { Input } from "../../Ui";

const QuestionSearch = (props) => {
  const [{ questions }, dispatch] = useStore();
  const handleSearch = (e) => {
    dispatch(
      "SET_QUESTIONS_SHOW",
      questions.filter(
        (q) =>
          q.title
            .trim()
            .toLowerCase()
            .includes(e.target.value.trim().toLowerCase()) ||
          (q.tags.length > 0 &&
            q.tags.filter((t) =>
              t.title
                .trim()
                .toLowerCase()
                .includes(e.target.value.trim().toLowerCase())
            ).length > 0)
      )
    );
  };

  return (
    <div className={classes.container}>
      <Input onChange={(e) => handleSearch(e)} name="Search By Tag Or Title" />
    </div>
  );
};

export default QuestionSearch;
