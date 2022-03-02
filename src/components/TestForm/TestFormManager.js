import React, { useEffect,useState, useReducer, useContext } from "react";
import { useStore } from "../../store/store";
import { useParams } from "react-router-dom";
import { Button, Input, Line, Typography } from "../Ui";
import NewTestQuestions from "./new-test-questions/NewTestQuestions";
import classes from "./TestFormManager.module.css";
import { UPDATE_IS_REVIEWABLE,
         UPDATE_FORM,
         UPDATE_LANGUAGE,
         setIsReviewable,
         setLanguage,
        onFocusOut } from "../../lib/EditQuestionFormUtils";
import serverAccess from "../../api/serverAccess";
import AppContext from "../../context/AppContext";


const INITIAL_STATE = {
  language:true,
  title: { value: "", touched: false, hasError: false, error: "" },
  intro: { value: "", touched: false, hasError: false, error: "" },
  passGrade: { value: 60, touched: false, hasError: false, error: "" },
  isReviewable:true,
  isFormValid:true
}

const formReducer = (state,action)=>{
  switch(action.type){
    case UPDATE_IS_REVIEWABLE:
      return {
        ...state,isReviewable: action.data
      }
    case UPDATE_LANGUAGE:
      return {
        ...state,language:action.data
      }
    case UPDATE_FORM:
      const { name, value, touched, hasError, error, isFormValid } =
        action.data;
      return {
        ...state,
        [name]: { ...state[name], touched, value, hasError, error },
        isFormValid,
      };
    default:
      return state;
  }
}



const TestFormManager = () => {
  const params = useParams();
  const [selectedQuestions,setSelectedQuestions] = useState([])
  const [{ selectedTest }, dispatchStore] = useStore();
  const [formState,dispatch]= useReducer(formReducer,INITIAL_STATE)
  const appCtx = useContext(AppContext)

  useEffect(() => {
    if (params.testId === "1") {
      dispatchStore("TOGGLE_SELECTED", {});
    }
  }, []);

  useEffect(()=>{
    console.log(formState)
  },[formState])

  const handleSubmitClick=()=>{
    if(formState.isFormValid && selectedQuestions.length>0){
        const questIdArray = []
        selectedQuestions.forEach((quest)=>{
          questIdArray.push(quest.value._id)
        })  


        serverAccess.post('/tests',{
          title:formState.title.value,
          intro:formState.intro.value,
          lenguge:formState.language,
          passGrade:formState.passGrade.value,
          questions:questIdArray,
          field:appCtx.fieldOfStudy._id,
          isReviewable:formState.isReviewable
      },{
          headers:{
                  Authorization: `Bearer ${appCtx.token}`
          }
      }).then((res)=>console.log(res.data))
        .catch((err)=>console.log(err))
    }
    else{
       alert("You must fill all the fields and pick questions !!!")
    }
  }

  return (
    <div className={classes.wraper}>
      <form className={classes.form}>
        <Line justify="start">
          <span>{selectedTest.field}</span>
        </Line>
        <Line justify="start">
          <Typography>Language:</Typography>
          <select onChange={(e)=>setLanguage(dispatch,Boolean(e.target.value))}>
            <option defaultValue={selectedTest.lenguge} value={false}>
              Hebrew
            </option>
            <option selected={selectedTest.lenguge} value={true}>
              English
            </option>
          </select>
        </Line>
        <Line justify="start">
          <Input errorMsg={formState.title.error} touched={formState.title.touched} hasError={formState.title.hasError} name="Test Title" onBlur={(e)=>onFocusOut("title",e.target.value,dispatch,formState)} defaultValue={selectedTest.title} />
        </Line>
        <Line justify="start">
          <Input errorMsg={formState.intro.error} touched={formState.intro.touched} hasError={formState.intro.hasError} name="Test Intro" onBlur={(e)=>onFocusOut("intro",e.target.value,dispatch,formState)} defaultValue={selectedTest.title} />
        </Line>
        <Line justify="start">
          <Input type='number' name="Passing Grade" onBlur={(e)=>onFocusOut("passGrade",parseInt(e.target.value),dispatch,formState)} defaultValue={selectedTest.passGrade} />
        </Line>
        <Line justify="start">
          <Typography>Show Correct Answers:</Typography>
          <input type="checkbox" onChange={(e)=>setIsReviewable(dispatch,e.target.checked)} checked={selectedTest.isReviewable} />
        </Line>
      </form>
      <NewTestQuestions selectedQuestions={selectedQuestions} setSelectedQuestions={setSelectedQuestions}/>
      <Button onClick={handleSubmitClick}>Add Test</Button>
    </div>
  );
};

export default TestFormManager;
