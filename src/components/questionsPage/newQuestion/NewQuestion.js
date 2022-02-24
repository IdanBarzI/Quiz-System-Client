import React, { useContext, useReducer } from "react";
import { Modal, Typography, TextEditor, Button } from "../../Ui";
import AnswersManager from "./AnswersManager";
import AppContext from "../../../context/AppContext";
import {
  onFocusOut,
  setQuestionType,
  UPDATE_FORM,
  UPDATE_QUESTION_TYPE,
} from "../../../lib/questionFormUtils";
import useFetch from "../../../hooks/use-fetch";
import { useStore } from "../../../store/store";
import classes from "./NewQuestion.module.css";

const formsReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      const { name, value, touched, hasError, error, isFormValid } =
        action.data;
      return {
        ...state,
        [name]: { ...state[name], touched, value, hasError, error },
        isFormValid,
      };

    case UPDATE_QUESTION_TYPE:
      return {
        ...state,
        isMultipleAnswers: !state.isMultipleAnswers,
      };

    default:
      return state;
  }
};

const NewQuestion = () => {
  const [{ selectedQuestion, questions }, dispatchStore] = useStore();
  const { fieldOfStudy } = useContext(AppContext);

  const isEdit = selectedQuestion ? true : false;
  const questionTitle = selectedQuestion?.title || "";
  const questionType = selectedQuestion?.isMultipleAnswers || false;
  const questionTags = selectedQuestion?.tags || [];
  const questionAnswers = selectedQuestion?.answers || [];
  const initialState = {
    title: { value: questionTitle, touched: false, hasError: false, error: "" },
    textBelow: { value: "", touched: false, hasError: false, error: "" },
    isMultipleAnswers: questionType,
    tags: { value: questionTags, touched: false, hasError: false, error: "" },
    answers: {
      value: questionAnswers,
      touched: false,
      hasError: false,
      error: "",
    },
    isFormValid: true,
  };

  const [formState, dispatch] = useReducer(formsReducer, initialState);
  console.log(formState);
  const { isLoading, error, sendRequest: sendUpdateUserRequest } = useFetch();
  const enterUserHandler = async () => {
    if (formState.isFormValid) {
      await sendUpdateUserRequest(
        {
          url: `http://localhost:5000/qusetions`,
          method: "POST",
          body: {
            title: formState.title.value,
            isMultipleAnswers: formState.isMultipleAnswers.value,
            tags: formState.tags.value,
            answers: formState.answers.value,
          },
        },
        (question) => {
          console.log(questions);
          dispatchStore("ADD_QUESTION", question);
          console.log(questions);
        }
      );
    }
  };

  const handleSubmitChanges = async (e) => {
    e.preventDefault();
    enterUserHandler();
  };

  return (
    <Modal
      onCancle={() => dispatchStore("TOGGLE_MODAL_EDIT")}
      title={fieldOfStudy}
      scroll={true}
    >
      <form onSubmit={(e) => handleSubmitChanges(e)}>
        <div className={classes.question}>
          <div className={classes.questionType}>
            <Typography>Type:</Typography>
            <select
              onChange={() => setQuestionType(dispatch)}
              defaultValue={formState.isMultipleAnswers ? 1 : 2}
            >
              <option value={1}>Multiple answer</option>
              <option value={2}>Single answer</option>
            </select>
          </div>
          <div className={classes.questionTitle}>
            <Typography>Title:</Typography>
            <TextEditor
              content={formState.title.value}
              setContent={(content) =>
                onFocusOut("title", content, dispatch, formState)
              }
              hasError={formState.title.hasError}
              errorMsg={formState.title.error}
              touched={formState.title.touched}
            />
          </div>
          {/*<div className={classes.questionTitle}>
             <Typography>Text:</Typography>
            <TextEditor
              content={formState.title.value}
              setContent={(content) =>
                onFocusOut("textBelow", content, dispatch, formState)
              }
              hasError={formState.textBelow.hasError}
              errorMsg={formState.textBelow.error}
              touched={formState.textBelow.touched}
            /> 
          </div>*/}
          <div className={classes.answers}>
            <AnswersManager
              isMultiple={formState.isMultipleAnswers}
              answers={formState.answers.value}
              setAnswers={(content) =>
                onFocusOut("answers", content, dispatch, formState)
              }
            />
          </div>
          <div className={classes.tags}>
            <Typography>Enter tags here:</Typography>
            <br />
            <input type="text" />
          </div>
          <div className={classes.actions}>
            <Button type="submit">Submit Changes</Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default NewQuestion;
