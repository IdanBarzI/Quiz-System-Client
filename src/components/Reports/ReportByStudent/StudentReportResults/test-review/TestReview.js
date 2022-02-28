import React from 'react'
import classes from './TestReview.module.css'
import { Modal } from '../../../../Ui'
import TestReviewQuestionsTable from './testReviewQuestionsTable/TestReviewQuestionsTable'

const TestReview = ({test,onClose}) => {
  const fullName = `${test.studenFirstName} ${test.studenLastName}`
  const getNumOfCorrectAnswers=()=>{
    let counter = 0
    for (let i = 0; i < test.studentAnswers.length; i++) {
        if(test.studentAnswers[i].answer.isCorrect){
          counter+=1
        }
        return counter
    }
  }

  return (
    <Modal
        onCancle={onClose}
        title={`Test results for ${test.test.title}`}
        scroll={true}
      >
        <h2>Respondent : {fullName}</h2>
        <h2>Summary</h2>
        <div className={classes.detailsContainer}>
          <div>Test Name : {test.test.title}</div>
          <div>Test ID : {test.test._id}</div>
          <div>Number of Questions : {test.test.questions.length}</div>
          <div>Passing Grade : {test.test.passGrade}</div>
          <div>Last Submitted : {test.updatedAt.toString().slice(0,10)}</div>
          <div>Number of questions Submitted : {test.studentAnswers.length}</div>
          <div>Number of correct Answers : {getNumOfCorrectAnswers()}</div>
          <div>Final Grade : {test.finalGrade}</div>
          <div>Status : {test.finalGrade > test.test.passGrade ? "Passed" : "Failed"}</div>
        </div>
        <TestReviewQuestionsTable test={test}/>
    </Modal>
  )
}

export default TestReview