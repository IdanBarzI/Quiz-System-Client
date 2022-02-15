import React from 'react'
import classes from "./QuestionSearch.module.css"

const QuestionSearch = () => {
  return (
    <div className={classes.container}>
        <>Search For Questions by content or tags :</>
        <br/>
        <input className={classes.input} type='text'/>
    </div>
  )
}

export default QuestionSearch