import React, { useEffect, useState,useContext } from 'react'
import serverAccess from '../../../api/serverAccess'
import AppContext from '../../../context/AppContext'
import sendAuthTokenHeader from '../../../api/tokenConfig'
import classes from './QuestionGrid.module.css'
import QUESTIONS from '../../../mocks/questionsMock.json'
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from '@material-ui/core'
import QuestionAndTags from '../questionAnbdTags/QuestionAndTags'
import QuestionPreview from '../questionPreview/QuestionPreview'
import NewQuestion from '../newQuestion/NewQuestion'

const QuestionGrid = () => {
    const [questions,setQuestions] = useState(QUESTIONS)
    const [selectedQuestion,setSelectedQuestion] = useState()
    const [renderPreview,setRenderPreview] = useState(false)
    const [renderEdit,setRenderEdit] = useState(false)
    const appCtx = useContext(AppContext);
    // useEffect(()=>{
    //     serverAccess.get('/qusetions',sendAuthTokenHeader(appCtx.token))
    //         .then((res)=>{
    //             setQuestions(res.data)
    //         })
    //         .catch((err)=>{
    //             console.log(err)
    //         })
    // },[])

    const handleSetRenderPreview=()=>{
      setRenderPreview(!renderPreview)
    }
    const handleSetRenderEdit=()=>{
      setRenderEdit(!renderEdit)
    }

    const getNumberOfTests=(questionId)=>{
       //api call to get number of tests the current question's id appeares on
      
    }
    const handleOpenPreviewClick=(question)=>{
        handleSetRenderPreview()
        setSelectedQuestion(question)
    }

    const handleOpenEdit=(question)=>{
        handleSetRenderEdit()
        setSelectedQuestion(question)
    }

    const renderTableBody =()=>{
      return questions.map((quest,indx)=>{
        return(
          <>
            <TableRow key={quest._id} className={classes.row} >
              <TableCell>{indx}</TableCell>
              <TableCell>
                <QuestionAndTags question={quest.title} tags={quest.tags}/>
              </TableCell>
              <TableCell>{quest.updatedAt}</TableCell>
              <TableCell>
                {quest.isMultipleAnswers ? "Multiple" : "Single"}
              </TableCell>
              <TableCell>
                {getNumberOfTests(quest._id)}
              </TableCell>
              <TableCell>
                <div className={classes.buttons}>
                    <button onClick={()=>handleOpenPreviewClick(quest)}>Show</button>
                    <button onClick={()=>handleOpenEdit(quest)}>Edit</button>
                    <button>Delete</button>
                </div>
              </TableCell>
            </TableRow>
            {(selectedQuestion&&renderPreview)&& 
                <QuestionPreview setClose={handleSetRenderPreview} question={selectedQuestion}/>          
            }
            {(selectedQuestion&&renderEdit)&& 
                <NewQuestion setClose={handleSetRenderEdit} question={selectedQuestion}/>          
            }
          </>
        )
      })
    }


  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} aria-label="simple-table">
        <TableHead className={classes.head}>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Question text and tags</TableCell>
            <TableCell>Last Update</TableCell>
            <TableCell>Question Type</TableCell>
            <TableCell># of Tests</TableCell>
            <TableCell>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderTableBody()}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default QuestionGrid