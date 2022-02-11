import React, { useRef, useState } from "react";
import NewQuestion from "../components/questionsPage/newQuestion/NewQuestion";
import QuestionGrid from "../components/questionsPage/questionGrid/QuestionGrid";
import QuestionSearch from "../components/questionsPage/questionSearch/QuestionSearch";
import TextEditor from "../components/Ui/Elements/textEditor/TextEditor";
import classes from './Question.module.css'

const Questions = () => {

  const [newQuestionWindowOpened,setNewQuestionWindowOpened] = useState(false)
  const hsndleSetNewQuestionWindowOpened = ()=>{
      setNewQuestionWindowOpened(!newQuestionWindowOpened)
  }


  return (
      <div className={classes.question}>
        <QuestionSearch/>
        <QuestionGrid/>
        <button>back</button>
        <button onClick={hsndleSetNewQuestionWindowOpened}>Create New Question</button>
        {newQuestionWindowOpened &&
          <NewQuestion setClose={hsndleSetNewQuestionWindowOpened}/>
        }
      </div>
  )
};

export default Questions;
