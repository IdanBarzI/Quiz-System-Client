import {
  onFocusOut as fieldOnFocusOut,
  UPDATE_FORM as UPDATE_FORM_GENERY,
} from "./formUtils";
import validator from "validator";

export const UPDATE_FORM = UPDATE_FORM_GENERY;
export const RESET_FORM = "RESET_FORM";

export const onFocusOut = (name, value, dispatch, formState) => {
  fieldOnFocusOut(name, value, dispatch, formState, validateInput);
};

export const validateInput = (name, value) => {
  let hasError = false,
    error = "";
  switch (name) {
    case "email":
      if (value.trim() === "") {
        hasError = true;
        error = "Email cannot be empty";
      } else if (!validator.isEmail(value)) {
        hasError = true;
        error = "Email is Invalid";
      } else {
        hasError = false;
        error = "";
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
