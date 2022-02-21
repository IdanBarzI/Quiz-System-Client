import React, { useRef, useState } from "react";
import NewQuestion from "../components/questionsPage/newQuestion/NewQuestion";
import QuestionGrid from "../components/questionsPage/questionGrid/QuestionGrid";
import TextEditor from "../components/Ui/Elements/textEditor/TextEditor";
import classes from './Question.module.css'

const Questions = () => {

  const [newQuestionWindowOpened,setNewQuestionWindowOpened] = useState(false)
  const hsndleSetNewQuestionWindowOpened = ()=>{
      setNewQuestionWindowOpened(!newQuestionWindowOpened)
  }


  return (
      <div className={classes.question}>
        <QuestionGrid/>
        <div className={classes.buttons}>
          <a className={classes.backButton} href="/admin/main-menu">back</a>
          <button onClick={hsndleSetNewQuestionWindowOpened}>Create New Question</button>
        </div>
        {newQuestionWindowOpened &&
          <NewQuestion isEdit={false} setClose={hsndleSetNewQuestionWindowOpened}/>
        }
      </div>
  )
};

export default Questions;
