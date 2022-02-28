import React, { useEffect } from "react";
import { useStore } from "../../store/store";
import { useParams } from "react-router-dom";
import { Input, Line, Typography } from "../Ui";
import NewTestQuestions from "./new-test-questions/NewTestQuestions";
import classes from "./TestFormManager.module.css";

const TestFormManager = () => {
  const params = useParams();
  const [{ selectedTest }, dispatchStore] = useStore();

  useEffect(() => {
    if (params.testId === "1") {
      dispatchStore("TOGGLE_SELECTED", {});
    }
  }, []);

  return (
    <div className={classes.wraper}>
      <form className={classes.form}>
        <Line justify="start">
          <span>{selectedTest.field}</span>
        </Line>
        <Line justify="start">
          <Typography>Language:</Typography>
          <select>
            <option defaultValue={selectedTest.lenguge} value={false}>
              Hebrew
            </option>
            <option selected={selectedTest.lenguge} value={true}>
              English
            </option>
          </select>
        </Line>
        <Line justify="start">
          <Input name="Test Title" defaultValue={selectedTest.title} />
        </Line>
        <Line justify="start">
          <Input name="Passing Grade" defaultValue={selectedTest.passGrade} />
        </Line>
        <Line justify="start">
          <Typography>Show Correct Answers:</Typography>
          <input type="checkbox" checked={selectedTest.isReviewable} />
        </Line>
      </form>
      <NewTestQuestions />
    </div>
  );
};

export default TestFormManager;
