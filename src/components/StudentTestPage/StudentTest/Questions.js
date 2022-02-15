import React, { useContext, useState } from "react";
import StudentTestContext from "../../../context/StudentTestContext";
import classes from './Questions.module.css'

const Questions = () => {
  const {test,setStudentAnswers,questionIndex,setQuestionIndex,setIsFinished} = useContext(StudentTestContext)
  const [selected,setSelected] = useState({})
  const question = test.questions[questionIndex]
  const isLastQuestion = questionIndex===test.questions.length-1;


  const handleNextClick =()=>{
    if(isLastQuestion){
      setIsFinished(true)
      setStudentAnswers(prevState=>([...prevState,{selected:selected,questionId:question._id}]))
    } 
    else{
      setQuestionIndex(questionIndex+1)
      setStudentAnswers(prevState=>([...prevState,{selected:selected,questionId:question._id}]))
    } 
  }

  const handlePreviousClick=()=>{
    setQuestionIndex(questionIndex-1)
  }


  const handleSelected =(answer)=>{
    setSelected(answer)
  }

  return( 
    <div>
        <h1>Question #{questionIndex+1}</h1>
        <h2>{question.title}</h2>
        <div className={classes.options}>
            {question.answers.map((answer)=>{
              return(
                <div key={answer._id} className={classes.option}>
                  {!question.isMultipleAnswers ? 
                    <input type='radio' onClick={()=>handleSelected(answer)} name='option'/>
                    :
                    <input type='checkbox' name='option'/>
                  }
                  <label >{answer.title}</label>
                </div>
              )
            })}
        </div>
        {questionIndex>0 &&
          <button onClick={handlePreviousClick} >Back</button>
        }
        <button onClick={handleNextClick}>{isLastQuestion ? "Finish Test" : "Next Question"}</button>
    </div>
  );
};

export default Questions;
