import React from 'react'
import classes from './NewQuestionAnswer.module.css'

const NewQuestionAnswer = ({answer}) => {
  return (
    <div>{answer.title}</div>
  )
}

export default NewQuestionAnswer