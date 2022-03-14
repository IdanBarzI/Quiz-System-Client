import validator from "validator";
import {
  onFocusOut as fieldOnFocusOut,
  UPDATE_FORM as UPDATE_FORM_GENERY,
} from "./formUtils";

export const UPDATE_FORM = UPDATE_FORM_GENERY;
export const UPDATE_QUESTION_TYPE = "UPDATE_QUESTION_TYPE";
export const ADD_TAG = "ADD_TAG";
export const REMOVE_TAG = "REMOVE_TAG";

export const onFocusOut = (name, value, dispatch, formState) => {
  fieldOnFocusOut(name, value, dispatch, formState, validateInput);
};

export const setQuestionType = (dispatch) => {
  dispatch({
    type: UPDATE_QUESTION_TYPE,
  });
};

export const addTag = (dispatch, tag) => {
  dispatch({
    type: ADD_TAG,
    data: { tag },
  });
};

export const removeTag = (dispatch, tag, formState) => {
  const tags = formState.tags.filter((t) => {
    return t._id !== tag._id;
  });
  dispatch({
    type: REMOVE_TAG,
    data: { tags },
  });
};
export const validateInput = (name, value) => {
  let hasError = false,
    error = "";
  switch (name) {
    case "title":
      if (value.trim() === "") {
        hasError = true;
        error = "Title cannot be empty";
      }
      break;
    case "textBelow":
      if (value.trim() === "") {
        hasError = true;
        error = "Text Below cannot be empty";
      }
      break;
    case "answers":
      const correctAnswers = value.filter((a) => {
        return a.isCorrect;
      });
      if (value.length === 0) {
        hasError = true;
        error = "Answers cannot be empty";
        console.log("Cannot be no correct answer");
        break;
      }
      if (correctAnswers.length === 0) {
        hasError = true;
        error = "Cannot be no correct answer";
        console.log("Cannot be no correct answer");
        break;
      }

    default:
      break;
  }
  return { hasError, error };
};
