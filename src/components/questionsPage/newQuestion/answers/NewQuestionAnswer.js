import React, { useContext, useEffect, useState } from 'react'
import AnswersContext from '../../../../context/AnswersContext'
import classes from './NewQuestionAnswer.module.css'

const NewQuestionAnswer = ({answer,onRemove,correct,isMultiple}) => {
  const [isCorrect,setIsCorrect] = useState(correct)
  const {answers,setAnswers} = useContext(AnswersContext)


  const handleCorrectChange=()=>{
    setIsCorrect(true)

    if(isCorrect===true){
      const tmpAns = [...answers].filter(ans=>ans!==answer);
      answer.isCorrect=true;
      setAnswers([...tmpAns,answer])
    }
  }

  const handleTextChange=(e)=>{
      // answer.title = e.target.value;
      // const filtered = [...answers].filter((ans)=> answer.title !== ans.title);
      // setAnswers([...filtered,answer])
  }

  const renderCorrect =()=>{
    if(!isMultiple){
      return(
        <div>
          <input type='radio' id='isCorrect'name='isCorrect'  onChange={handleCorrectChange} han/>
        </div>
      )
    }
    else{
      return(
        <div>
          <input type='checkbox' name='multiCorrect' id='multiCorrect'  onChange={handleCorrectChange}/>
        </div>
      )
    }
  }

  return (
    <div className={classes.container}>
      <button onClick={onRemove}>X</button>
      <input type='text' onChange={handleTextChange} placeholder={answer? answer.title : ""}/>
      {renderCorrect()}
    </div>
  )
}

export default NewQuestionAnswer