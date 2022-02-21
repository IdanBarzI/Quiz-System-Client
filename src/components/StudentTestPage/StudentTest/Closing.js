import React, { useContext, useEffect, useState } from "react";
import serverAccess from "../../../api/serverAccess";
import StudentTestContext from "../../../context/StudentTestContext";
import QuestionReview from './Review/QuestionsReview'
import classes from './closing.module.css'

const Closing = () => {
  //handle here sending certificate to email if time left

  const {test,studentAnswers,student} = useContext(StudentTestContext)
  const [isReviewable] = useState(test.isReviwable)
  const [studentTest,setStudentTest] = useState({})
  const [openQuestionReview,setOpenQuestionReview] = useState(false)


  useEffect(()=>{
    serverAccess.post('/student-test/finished',{
      test : test,
      studentAnswers:studentAnswers,
      studentCredentials : student
    })
    .then((res)=>{
      setStudentTest(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  const handleReviewClick=()=>{
    setOpenQuestionReview(true)
  }


  
  if(!openQuestionReview){
    return (
      <div className={classes.closing}>
        <h1>Thank you for submitting the Test !</h1>
        <h3>Your grade : {studentTest.finalGrade}</h3>
        {isReviewable &&
          <button onClick={handleReviewClick}>Review your answers</button>
        }
      </div>
    )
  }
  else{
     return <QuestionReview test={studentTest}/>
  }
};

export default Closing;
