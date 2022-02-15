import React, { useContext, useState } from "react";
import StudentTestContext from "../../../context/StudentTestContext";
import Redirect from 'react-router-dom'
import classes from './Opening.module.css'
import Question from "../../../components/StudentTestPage/StudentTest/Questions";
import testUtils from "react-dom/test-utils";

const Opening = () => {
  const {test,student,setQuestionIndex} = useContext(StudentTestContext)
  const [isStarted,setIsStarted] = useState(false)

  const handleStartClick=()=>{
    setIsStarted(true)
    setQuestionIndex(0)
  }

  if(!isStarted){
    return (
      <div>
        <h1>Hello {student.firstName} Wlcome to {test.title} Exam</h1>
        <h3>Descriptioon: {test.intro}</h3>
        <h4>Number of questions : {test.questions.length}</h4>
        <h4>Mininum pass Grade : {test.passGrade}</h4>
        <button onClick={handleStartClick}>Lets Start !</button>
      </div>
    )
  }
  else{
    return <Question/>
  }
};

export default Opening;
