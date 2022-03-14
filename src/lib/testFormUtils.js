import QuestionAndTags from "../components/questionsPage/questionAnbdTags/QuestionAndTags";
import {
  onFocusOut as fieldOnFocusOut,
  UPDATE_FORM as UPDATE_FORM_GENERY,
} from "./formUtils";

export const UPDATE_FORM = UPDATE_FORM_GENERY;
export const UPDATE_IS_REVIEWABLE = "UPDATE_IS_REVIEWABLE";
export const UPDATE_LANGUAGE = "UPDATE_LANGUAGE";
export const UPDATE_SELECTED_QUESTIONS = "UPDATE_SELECTED_QUESTIONS";
export const ADD_TAG = "ADD_TAG";
export const REMOVE_TAG = "REMOVE_TAG";

export const onSelectedQuestionsFocusOut = (name, value, dispatch) => {
  const { hasError, error } = validateInput(name, value);
};

export const getInitialState = (selectedTest) => {
  let data;
  console.log("object", selectedTest);
  if (!selectedTest._id) {
    data = {
      language: true,
      title: { value: "", touched: false, hasError: false, error: "" },
      intro: { value: "", touched: false, hasError: false, error: "" },
      selectedQuestions: {
        value: [],
        touched: false,
        hasError: false,
        error: "",
      },
      passGrade: { value: "", touched: false, hasError: false, error: "" },
      tags: [],
      isReviewable: true,
      isFormValid: true,
    };
  } else {
    data = {
      language: selectedTest.lenguge,
      title: {
        value: selectedTest.title,
        touched: false,
        hasError: false,
        error: "",
      },
      intro: {
        value: selectedTest.intro,
        touched: false,
        hasError: false,
        error: "",
      },
      selectedQuestions: {
        value: selectedTest.questions,
        touched: false,
        hasError: false,
        error: "",
      },
      passGrade: {
        value: selectedTest.passGrade,
        touched: false,
        hasError: false,
        error: "",
      },
      tags: selectedTest.tags,
      isReviewable: selectedTest.isReviewable,
      isFormValid: true,
    };
  }
  return data;
};

export const onFocusOut = (name, value, dispatch, formState) => {
  fieldOnFocusOut(name, value, dispatch, formState, validateInput);
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

export const getUpdatedQuestions = (newQuestion, questions) => {
  let filtered = [];
  if (questions && questions.length > 0) {
    for (const ques of questions) {
      if (ques._id === newQuestion._id) {
        console.log("if");
        filtered = questions.filter((q) => {
          return q._id !== newQuestion._id;
        });
        const { hasError, error } = validateInput(
          "selectedQuestions",
          filtered
        );
        return { filtered, hasError, error };
      } else {
        console.log("if else");
        filtered = [...questions, newQuestion];
      }
    }
  } else {
    console.log("else");
    filtered.push(newQuestion);
  }
  const { hasError, error } = validateInput("selectedQuestions", filtered);
  return { filtered, hasError, error };
};

export const setLanguage = (dispatch, value) => {
  dispatch({
    type: UPDATE_LANGUAGE,
    data: value,
  });
};

export const setIsReviewable = (dispatch, value) => {
  dispatch({
    type: UPDATE_IS_REVIEWABLE,
    data: value,
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
    case "intro":
      if (value.trim() === "") {
        hasError = true;
        error = "Intro cannot be empty";
      }
      break;
    case "passGrade":
      var regExp = /[a-zA-Z]/g;
      if (value.trim() === "") {
        hasError = true;
        error = "Passing Grade cannot be empty";
        break;
      }
      if (parseInt(value) < 0 || parseInt(value) > 100) {
        hasError = true;
        error = "Passing Grade cannot be less then 0 or more then 100";
        break;
      }
      if (regExp.test(value)) {
        hasError = true;
        error = "Passing Grade must be a number";
        break;
      }
      break;
    case "selectedQuestions":
      if (value.length <= 0) {
        hasError = true;
        error = "Questions cannot be empty, Click a question to select it";
      }
      break;
    default:
      break;
  }
  return { hasError, error };
};
