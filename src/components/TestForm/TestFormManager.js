import React, { useEffect } from "react";
import { useStore } from "../../store/store";
import { useParams } from "react-router-dom";
import { Input, Line, Typography } from "../Ui";
import classes from "./TestFormManager.module.css";

const TestFormManager = () => {
  const params = useParams();
  const [{ selectedTest }, dispatch] = useStore();
  console.log(selectedTest);

  useEffect(() => {
    dispatch("TOGGLE_SELECTED", params.testId);
  }, []);

  return (
    <form className={classes.form}>
      <span>{selectedTest.field}</span>
      <Line justify="start">
        <Typography>Language:</Typography>
        <select>
          <option selected={selectedTest.lenguge} value={false}>
            Hebrew
          </option>
          <option selected={selectedTest.lenguge} value={true}>
            English
          </option>
        </select>
      </Line>
      <Line justify="start">
        <Input name="Test Name" defaultValue={selectedTest.intro} />
      </Line>

      <Line justify="start">
        <Input name="Passing Grade" defaultValue={selectedTest.passGrade} />
      </Line>

      <Line justify="start">
        <Typography>Show Correct Answers:</Typography>
        <input type="checkbox" checked={selectedTest.isReviewable} />
      </Line>
    </form>
  );
};

export default TestFormManager;
