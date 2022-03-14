import React, { useEffect, useReducer } from "react";
import { useStore } from "../../store/store";
import { Button, Input, Line, Typography, InputSearch } from "../Ui";
import TestQuesGrid from "./TestQuesGrid/TestQuesGrid";
import AddTag from "../questionsPage/newQuestion/Tags/AddTag/AddTag";
import SetTags from "../questionsPage/newQuestion/Tags/SetTags/SetTags";
import QuestionAndTags from "../questionsPage/questionAnbdTags/QuestionAndTags";
import {
  UPDATE_IS_REVIEWABLE,
  UPDATE_FORM,
  UPDATE_LANGUAGE,
  UPDATE_SELECTED_QUESTIONS,
  ADD_TAG,
  REMOVE_TAG,
  getInitialState,
  setIsReviewable,
  setLanguage,
  onFocusOut,
  getUpdatedQuestions,
  addTag,
  removeTag,
} from "../../lib/testFormUtils";
import classes from "./TestFormManager.module.css";

const formReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case UPDATE_SELECTED_QUESTIONS: {
      const value = action.data.question;
      const newQuestions = getUpdatedQuestions(
        value,
        state.selectedQuestions.value
      );
      return {
        ...state,
        selectedQuestions: {
          ...state.selectedQuestions,
          touched: true,
          hasError: newQuestions.hasError,
          error: newQuestions.error,
          value: newQuestions.filtered,
        },
      };
    }
    case REMOVE_TAG: {
      const { tags } = action.data;
      return {
        ...state,
        tags: [...tags],
      };
    }
    case ADD_TAG:
      const { tag } = action.data;
      return {
        ...state,
        tags: [...state.tags, tag],
      };
    case UPDATE_IS_REVIEWABLE:
      return {
        ...state,
        isReviewable: action.data,
      };
    case UPDATE_LANGUAGE:
      return {
        ...state,
        language: action.data,
      };
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
};

const TestFormManager = () => {
  const { selectedTest } = useStore()[0];
  const initialState = getInitialState(selectedTest);
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const handleSubmitClick = () => {
    console.log(formState);
  };

  return (
    <div className={classes.wraper}>
      <form className={classes.form}>
        <Line justify="start">
          <Typography>Language:</Typography>
          <div className={classes.customSelect}>
            <select
              onChange={(e) =>
                setLanguage(dispatch, JSON.parse(e.target.value))
              }
            >
              <option defaultValue={selectedTest.lenguge} value={false}>
                Hebrew
              </option>
              <option selected={selectedTest.lenguge} value={true}>
                English
              </option>
            </select>
          </div>
          <Typography>Show Correct Answers:</Typography>
          <input
            type="checkbox"
            onChange={(e) => setIsReviewable(dispatch, e.target.checked)}
            checked={formState.isReviewable}
          />
        </Line>
        <div className={classes.formRow}>
          <Input
            errorMsg={formState.title.error}
            touched={formState.title.touched}
            hasError={formState.title.hasError}
            name="Title"
            onBlur={(e) =>
              onFocusOut("title", e.target.value, dispatch, formState)
            }
            defaultValue={formState.title.value}
          />
        </div>
        <div className={classes.formRow}>
          <Input
            errorMsg={formState.intro.error}
            touched={formState.intro.touched}
            hasError={formState.intro.hasError}
            name="Test Intro"
            onBlur={(e) =>
              onFocusOut("intro", e.target.value, dispatch, formState)
            }
            defaultValue={formState.intro.value}
          />
        </div>
        <div className={classes.formRow}>
          <Input
            errorMsg={formState.passGrade.error}
            touched={formState.passGrade.touched}
            hasError={formState.passGrade.hasError}
            name="Passing Grade"
            onBlur={(e) =>
              onFocusOut("passGrade", e.target.value, dispatch, formState)
            }
            defaultValue={formState.passGrade.value}
          />
        </div>
      </form>
      <TestQuesGrid
        dispatch={dispatch}
        selectedQuestions={formState.selectedQuestions}
      />
      <Line justify="between">
        <SetTags dispatch={dispatch} addTag={addTag} />
        <QuestionAndTags
          tags={formState.tags}
          isRemoveable={true}
          removeTag={(tag) => removeTag(dispatch, tag, formState)}
        />
      </Line>
      <AddTag />
      <Button onClick={handleSubmitClick}>Add Test</Button>
    </div>
  );
};

export default TestFormManager;
