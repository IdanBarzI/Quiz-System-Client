import React, { useContext,useState, useMemo, useEffect } from "react";
import Register from "../components/StudentTestPage/Register/Register";
import serverAccess from "../api/serverAccess";
import { useParams } from "react-router-dom";
import Opening from '../components/StudentTestPage/StudentTest/Opening'
import Closing from '../components/StudentTestPage/StudentTest/Closing'
import testMock from '../mocks/oneTestMock.json'
import StudentTestContext from "../context/StudentTestContext";
import Questions from "../components/StudentTestPage/StudentTest/Questions";

const StudentTest = (props) => {
  const {id} = useParams()
  


  const [test,setTest] = useState(null)
  const [student,setStudent] = useState(null)
  const [studentAnswers,setStudentAnswers] = useState([])
  const [questionIndex,setQuestionIndex] = useState(-1)
  const [isFinished,setIsFinished] = useState(false);

  const studentTestValue = useMemo(()=>({
    test,setTest,
    student,setStudent,
    studentAnswers,setStudentAnswers,
    questionIndex,setQuestionIndex,
    isFinished,setIsFinished
  }),[
    test,setTest,
    student,setStudent,
    studentAnswers,setStudentAnswers,
    questionIndex,setQuestionIndex,
    isFinished,setIsFinished
  ])

  const getFromLocalStorage=(setState,name)=>{
    if(localStorage.getItem(name)){
      setState(JSON.parse(localStorage.getItem(name)))
      return true
    }
    else return false
  }

  useEffect(()=>{
    //get test by id from server
    if(!getFromLocalStorage(setTest,"test")){
      setTest(testMock)
    }
    getFromLocalStorage(setStudent,'student')
    getFromLocalStorage(setQuestionIndex,'index')
    getFromLocalStorage(setStudentAnswers,'studentAnswers')
  },[])

  //#region  update local storage
  useEffect(()=>{
    localStorage.setItem('test',JSON.stringify(test))
  },[test])
  useEffect(()=>{
    localStorage.setItem('student',JSON.stringify(student))
  },[student])
  useEffect(()=>{
    localStorage.setItem('studentAnswers',JSON.stringify(studentAnswers))
  },[studentAnswers])
  useEffect(()=>{
    localStorage.setItem('index',JSON.stringify(questionIndex))
  },[questionIndex])
  //#endregion

  const render = ()=>{
    if(student && test && questionIndex>=0 && !isFinished){
      return <Questions/>
    }
    else if(student && test && questionIndex===-1 && !isFinished){
      return <Opening/>
    }
    else if(isFinished){
      return <Closing/>
    }
    else{
      return <Register/>
    }
  }

  return(
    <StudentTestContext.Provider value={studentTestValue}>
        {render()}
    </StudentTestContext.Provider>
  )
};

export default StudentTest;
