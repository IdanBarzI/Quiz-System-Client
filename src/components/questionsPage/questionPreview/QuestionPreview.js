import classes from './QuestionPreview.module.css'
import React from 'react'
import PopupWindow from '../../Ui/Elements/popupWindow/PopupWindow'
import { Accordion,AccordionSummary,AccordionDetails,Typography } from '@material-ui/core'

const QuestionPreview = ({setClose,question}) => {
  return (
    <PopupWindow setClose={setClose}>
        <label>{question.title}</label>
        {question.answers.map((answer,index)=>{
          return(
            <Accordion  TransitionProps={{ unmountOnExit: true }}>
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography>{index+1}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <label>{answer.title}</label>              
                <p>{answer.isCorrect ? "Correct" : "Incorrect"}</p>
              </AccordionDetails>
            </Accordion>
          )
        })}
    </PopupWindow>
  )
}

export default QuestionPreview