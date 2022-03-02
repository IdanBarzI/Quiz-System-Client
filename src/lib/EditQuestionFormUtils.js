
import {
  onFocusOut as fieldOnFocusOut,
  UPDATE_FORM as UPDATE_FORM_GENERY,
} from "./formUtils";

export const UPDATE_FORM = UPDATE_FORM_GENERY;
export const UPDATE_IS_REVIEWABLE = "UPDATE_IS_REVIEWABLE"
export const UPDATE_LANGUAGE = "UPDATE_LANGUAGE"

export const onFocusOut = (name, value, dispatch, formState) => {
  fieldOnFocusOut(name, value, dispatch, formState, validateInput);
};

export const setLanguage = (dispatch,value) => {
  dispatch({
    type: UPDATE_LANGUAGE,
    data:value
  });
};

export const setIsReviewable = (dispatch,value) => {
  dispatch({
    type: UPDATE_IS_REVIEWABLE,
    data:value
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

    default:
      break;
  }
  return { hasError, error };
};