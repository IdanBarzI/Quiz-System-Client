import React, { useContext, useEffect, useMemo, useState } from 'react'
import AppContext from '../../../context/AppContext'
import PopupWindow from '../../Ui/Elements/popupWindow/PopupWindow'
import TextEditor from '../../Ui/Elements/textEditor/TextEditor'
import NewQuestionAnswer from './answers/NewQuestionAnswer'
import AnswersManager from './AnswersManager'
import classes from './NewQuestion.module.css'
import sendAuthTokenHeader from '../../../api/tokenConfig'
import AnswersContext from "../../../context/AnswersContext"
import serverAccess from '../../../api/serverAccess'


const NewQuestion = ({setClose,question,isEdit}) => {
    const appCtx = useContext(AppContext)

    const [questionType,setQuestionType] = useState(question ? question.isMultipleAnswers:false)
    const [questionText,setQuestionText] = useState(question? question.title : "")
    const [tags,setTags] = useState(question?question.tags:[])
    const [tagText,setTagText] = useState('')
    const [answers,setAnswers] = useState(question ? question.answers : [])

    const answersValue = useMemo(()=>({answers,setAnswers}),[answers,setAnswers])


    useEffect(()=>{
        if(tags.length >0){
            let tagString = ""
            tags.map((tag)=>{
                tagString+=tag.title+ " , ";
            })
            setTagText(tagString);
        }
    },[])
    const handleSelectionChanged =()=>{
        setQuestionType(!questionType)
    }


    const handleSubmitChanges=async()=>{
        const tagTitles = tagText.split(',')
        const newTags =[]
        for (let i = 0; i < tagTitles.length; i++) {
            newTags.push({
                title : tagTitles[i].title
            })
        }
        setTags(newTags);

        if(isEdit){
            try {
                const questionToUpdate = {}
                const res = await serverAccess.patch('/qusetions',sendAuthTokenHeader(appCtx.token))
            } catch (err) {
                
            }
        }
        else{
            const newQuestion ={
                title : questionText,
                isMultipleAnswers:questionType,
                field: appCtx.fieldOfStudy,
                tags :[
                    {title:"c#"}
                ],
                answers : [
                    {
                        title:"A",
                        isCorrect:true
                }
                ]
            };
            try {
                const res = await serverAccess.post('/qusetions',newQuestion,sendAuthTokenHeader(appCtx.token),)
                alert(JSON.stringify(res))
            } catch (err) {
                console.log(err)
            }
        }
    }

  return (
    <AnswersContext.Provider value={answersValue}>
         <PopupWindow setClose={setClose}>
            <div>
                <p>Field :{appCtx.fieldOfStudy.title}</p>
                <div className={classes.questionType}>
                    <select onChange={handleSelectionChanged} defaultValue={questionType? 1:2}>
                        <option value={1}>Multiple answer</option>
                        <option value={2}>Single answer</option>
                    </select>
                </div>
                <div className={classes.questionText}>
                    <TextEditor text={questionText} content={questionText} setContent={setQuestionText}/>
                </div>
                <AnswersManager  isMultiple={questionType}/>
                <div className={classes.tags}>
                    <label>Enter tags here : (saperate them by coma)</label>
                    <br/>
                    <input type='text' onChange={(e)=>setTags(e.target.value)}/>
                </div>
            </div>
            <div>
                <button onClick={handleSubmitChanges}>Submit Changes</button>
            </div>
        </PopupWindow>
    </AnswersContext.Provider>
  )
}

export default NewQuestion