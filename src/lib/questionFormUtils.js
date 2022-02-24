import validator from "validator";
import {
  onFocusOut as fieldOnFocusOut,
  UPDATE_FORM as UPDATE_FORM_GENERY,
} from "./formUtils";

export const UPDATE_FORM = UPDATE_FORM_GENERY;
export const UPDATE_QUESTION_TYPE = "UPDATE_QUESTION_TYPE";

export const onFocusOut = (name, value, dispatch, formState) => {
  fieldOnFocusOut(name, value, dispatch, formState, validateInput);
};

export const setQuestionType = (dispatch) => {
  console.log("UPDATE_QUESTION_TYPE");
  dispatch({
    type: UPDATE_QUESTION_TYPE,
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

    case "password":
      if (value.trim() === "") {
        hasError = true;
        error = "Password cannot be empty";
      } else if (value.trim().length < 6) {
        hasError = true;
        error = "Password must have at least 6 characters";
      } else if (value.trim().length > 150) {
        hasError = true;
        error = "Password can't have more then 150 characters";
      } else {
        hasError = false;
        error = "";
      }
      break;
    default:
      break;
  }
  return { hasError, error };
};
