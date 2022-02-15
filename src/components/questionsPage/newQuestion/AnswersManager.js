import classes from './AnswersManager.module.css'
import React, { useContext, useEffect, useState } from 'react'
import NewQuestionAnswer from './answers/NewQuestionAnswer'
import AnswersContext from '../../../context/AnswersContext'

const EMPTY_ANSWER ={
  title : ""
}

const AnswersManager = ({isMultiple}) => {
  const {answers,setAnswers} =useContext(AnswersContext)

  useEffect(()=>{

  },[answers])

  const handleRemoveAnswer =(answer)=>{
    if(answers.includes(answer)){
      const newAnswers = [...answers]
      for (let i = 0; i < newAnswers.length; i++) {
        if(newAnswers[i]===answer){
          newAnswers.splice(i,1)
          break;
        }
      }
      setAnswers(newAnswers)
    }
  }

  const renderAnswers =()=>{
      return answers.map((answer)=>{
          return <NewQuestionAnswer key={answer._id} isMultiple={isMultiple} correct={answer.isCorrect} onRemove={()=>handleRemoveAnswer(answer)} answer={answer}/>
      })
  }

  const addAnswer =()=>{
    setAnswers(prevState => [...prevState, EMPTY_ANSWER])
  }
  return (
    <div>
      <div>
        possible answers
      </div>
      <div>
        {renderAnswers()}
      </div>
      <div>
        <button onClick={addAnswer}>Add an answer</button>
      </div>
    </div>
  )
}

export default AnswersManager