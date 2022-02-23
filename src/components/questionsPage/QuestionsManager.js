import React, { useRef, useState } from "react";
import NewQuestion from "./newQuestion/NewQuestion";
import QuestionGrid from "./questionGrid/QuestionGrid";
import { Button } from "../Ui";
import classes from "./Question.module.css";

const QuestionsManager = () => {
  const [newQuestionWindowOpened, setNewQuestionWindowOpened] = useState(false);

  const hsndleSetNewQuestionWindowOpened = () => {
    setNewQuestionWindowOpened((prevState) => !prevState);
  };

  return (
    <div className={classes.question}>
      <QuestionGrid />
      <div className={classes.buttons}>
        <a className={classes.backButton} href="/admin/main-menu">
          back
        </a>
        <div>
          <Button onClick={hsndleSetNewQuestionWindowOpened}>
            Create New Question
          </Button>
        </div>
      </div>
      {newQuestionWindowOpened && (
        <NewQuestion
          isEdit={false}
          setClose={hsndleSetNewQuestionWindowOpened}
        />
      )}
    </div>
  );
};

export default QuestionsManager;
