import React, { useContext, useEffect, useState } from "react";
import AnswersContext from "../../../../context/AnswersContext";
import { Input, Button } from "../../../Ui";
import classes from "./NewQuestionAnswer.module.css";

const NewQuestionAnswer = ({ answer, onRemove, correct, isMultiple }) => {
  const [isCorrect, setIsCorrect] = useState(correct);
  const { answers, setAnswers } = useContext(AnswersContext);

  const handleCorrectChange = () => {
    setIsCorrect((preState) => !preState);
    console.log(answers);

    if (isCorrect) {
      const tmpAns = [...answers].filter((ans) => ans !== answer); //all the uncorrect answers
      answer.isCorrect = true;
      console.log(tmpAns);
      console.log(answer);
      setAnswers([...tmpAns, answer]);
    }
  };

  const handleTextChange = (e) => {
    console.log(e.target.value);
    // answer.title = e.target.value;
    // const filtered = [...answers].filter((ans)=> answer.title !== ans.title);
    // setAnswers([...filtered,answer])
  };

  const renderCorrect = () => {
    if (!isMultiple) {
      return (
        <div>
          <input
            type="radio"
            id="isCorrect"
            name="isCorrect"
            onChange={handleCorrectChange}
            han
          />
        </div>
      );
    } else {
      return (
        <div>
          <input
            type="checkbox"
            name="multiCorrect"
            id="multiCorrect"
            onChange={handleCorrectChange}
          />
        </div>
      );
    }
  };

  return (
    <div className={classes.container}>
      <Button onClick={onRemove}>X</Button>
      <input
        type="text"
        onChange={handleTextChange}
        placeholder={answer ? answer.title : ""}
      />
      {renderCorrect()}
    </div>
  );
};

export default NewQuestionAnswer;
