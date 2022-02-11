import React, { useContext, useState } from 'react'
import AppContext from '../../../context/AppContext'
import PopupWindow from '../../Ui/Elements/popupWindow/PopupWindow'
import TextEditor from '../../Ui/Elements/textEditor/TextEditor'
import NewQuestionAnswer from './answers/NewQuestionAnswer'
import classes from './NewQuestion.module.css'

const NewQuestion = ({setClose,question}) => {
    const appCtx = useContext(AppContext)

    const [questionType,setQuestionType] = useState()
    const [questionText,setQuestionText] = useState()
    // const [additionText,setAdditionText] = useState()
    const [answers,setAnswers] = useState()

    // if(question){
    //     setQuestionType(question.isMultipleAnswers)
    //     setQuestionText(question.title)
    //     setAnswers(question.answers)
    // }


    const renderAnswers = ()=>{
        return question.answers.map((answer)=>{
            return(
                <NewQuestionAnswer answer={answer}/>
            )
        })
    }

  return (
    <PopupWindow setClose={setClose}>
        <div>
            <p>Field :{appCtx.fieldOfStudy.title}</p>
            <div className={classes.questionType}>
                <select>
                    <option>Multiple answer</option>
                    <option>Single answer</option>
                </select>
            </div>
            <div className={classes.questionText}>
                <TextEditor/>
            </div>
            {/* <div className={classes.additionalText}>
                <TextEditor/>
            </div> */}
            <div className={classes.answers}>
                {renderAnswers()}
            </div>

        </div>
    </PopupWindow>
  )
}

export default NewQuestion