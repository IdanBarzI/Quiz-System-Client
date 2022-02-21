import React, { useContext, useEffect, useState } from "react";
import StudentTestContext from "../../../../context/StudentTestContext";
import classes from './QuestionReview.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleCheck,faCircleXmark} from '@fortawesome/free-solid-svg-icons'

const QuestionsReview = ({test}) => {
  const [questionIndex,setQuestionIndex] = useState(0);
  const [question,setQuestion] = useState(test.test.questions[questionIndex])
  const [relevantStudentAnswers,setRelevantStudentAnswers] = useState(null)
  const {studentAnswers} = useContext(StudentTestContext)

  useEffect(()=>{
    setRelevantStudentAnswers(studentAnswers.find((ans)=> ans.questionId === question._id))
  },[])


  const handleNextClick =()=>{
    setQuestionIndex(questionIndex+1)
  }
  const handleCloseClick=()=>{
    localStorage.clear();
    alert('Thank You !')
  }
  const renderAnswers =()=>{
    if(question && relevantStudentAnswers){
      return question.answers.map((answer)=>{
        if(answer.isCorrect && relevantStudentAnswers.selected._id===answer._id){
          return(
            //handle correct answer
            <div className={classes.answer} key={answer._id}>
              <div>{answer.title}</div>
              <FontAwesomeIcon icon={faCircleCheck}/>
            </div>
          )
        }
        else if(!answer.isCorrect && relevantStudentAnswers.selected._id===answer._id){
          return(
            //handle incorrect choice
            <div className={classes.answer} key={answer._id}>
              <div>{answer.title}</div>
              <FontAwesomeIcon icon={faCircleXmark} />
            </div>
          )
        }
        else{
          return(
            <div className={classes.answer} key={answer._id}>
              <div>{answer.title}</div>
              {answer.isCorrect &&
                <FontAwesomeIcon icon={faCircleCheck}/>
              }
            </div>
          )
        }
      })
    }
  }

  return(
    <div className={classes.questionReview}>
      <h1>{question? question.title:""}</h1>
      {renderAnswers()}
      {questionIndex < test.questions?.length ?
        <button onClick={handleNextClick}>next</button>
        :
        <button onClick={handleCloseClick}>finish</button>
      }
    </div>  
  );
};

export default QuestionsReview;
