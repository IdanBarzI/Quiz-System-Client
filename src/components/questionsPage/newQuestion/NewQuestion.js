import React, { useContext, useEffect, useReducer, useRef } from "react";
import { useStore } from "../../../store/store";
import useFetch from "../../../hooks/use-fetch";
import {
  Modal,
  Typography,
  TextEditor,
  Button,
  LoadingSpinner,
  InputSearch,
  Snackbar,
} from "../../Ui";
import AnswersManager from "./AnswersManager";
import AddTag from "./Tags/AddTag/AddTag";
import AppContext from "../../../context/AppContext";
import {
  onFocusOut,
  setQuestionType,
  addTag,
  removeTag,
  UPDATE_FORM,
  UPDATE_QUESTION_TYPE,
  ADD_TAG,
  REMOVE_TAG,
} from "../../../lib/questionFormUtils";
import QuestionAndTags from "../questionAnbdTags/QuestionAndTags";
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

    case ADD_TAG:
      const { tag } = action.data;
      return {
        ...state,
        tags: [...state.tags, tag],
      };

    case REMOVE_TAG: {
      const { tags } = action.data;
      return {
        ...state,
        tags: [...tags],
      };
    }

    default:
      return state;
  }
};

const NewQuestion = (props) => {
  console.log("RENDERING_NEWQUESTION");
  const [{ selectedQuestion, tags }, dispatchStore] = useStore();

  const { isLoadinggg, errorrr, sendRequest: sendGetTagsRequest } = useFetch();
  const getTagsHandler = async () => {
    await sendGetTagsRequest(
      {
        url: `http://localhost:5000/tags`,
        method: "GET",
      },
      (tags) => {
        dispatchStore("SET_TAGS", tags);
      }
    );
  };

  useEffect(() => {
    getTagsHandler();
  }, []);

  const { fieldOfStudy } = useContext(AppContext);

  const isEdit = selectedQuestion._id ? true : false;
  const questionTitle = selectedQuestion?.title || "";
  const questionType = selectedQuestion?.isMultipleAnswers || false;
  const questionTags = selectedQuestion?.tags || [];
  const questionAnswers = selectedQuestion?.answers || [];
  const initialState = {
    title: { value: questionTitle, touched: false, hasError: false, error: "" },
    textBelow: { value: "", touched: false, hasError: false, error: "" },
    isMultipleAnswers: questionType,
    tags: questionTags,
    answers: {
      value: questionAnswers,
      touched: false,
      hasError: false,
      error: "",
    },
    isFormValid: true,
  };

  const [formState, dispatch] = useReducer(formsReducer, initialState);
  const {
    isLoading,
    error,
    sendRequest: sendUpdateQuestionRequest,
  } = useFetch();

  const {
    isLoading: isLoadingg,
    error: errorr,
    sendRequest: sendAddQuestionRequest,
  } = useFetch();

  const enterQuestionHandler = async () => {
    if (formState.isFormValid) {
      if (isEdit) {
        try {
          await sendUpdateQuestionRequest(
            {
              url: `http://localhost:5000/qusetions`,
              method: "PATCH",
              body: {
                _id: selectedQuestion._id,
                title: formState.title.value,
                isMultipleAnswers: formState.isMultipleAnswers,
                tags: formState.tags,
                answers: formState.answers.value,
              },
            },
            (question) => {
              console.log("UPDATE_QUESTION");
              snackbarRef.current.show("Question Updated", "success");
              dispatchStore("UPDATE_QUESTION", question._id);
            }
          );
        } catch (e) {
          console.log("UPDATE_QUESTION_FAIL");
          snackbarRef.current.show(error, "fail");
        }
        if (error !== null) {
          snackbarRef.current.show(error, "fail");
        }
      } else {
        try {
          await sendAddQuestionRequest(
            {
              url: `http://localhost:5000/qusetions`,
              method: "POST",
              body: {
                title: formState.title.value,
                isMultipleAnswers: formState.isMultipleAnswers,
                tags: formState.tags,
                answers: formState.answers.value,
              },
            },
            (question) => {
              console.log("ADD_QUESTION");
              snackbarRef.current.show("Question Added", "success");
              dispatchStore("ADD_QUESTION", question);
            }
          );
        } catch (e) {}
        if (errorr) {
          snackbarRef.current.show(errorr, "fail");
        }
      }
    }
  };

  const snackbarRef = useRef(null);
  const handleSubmitChanges = async (e) => {
    e.preventDefault();
    enterQuestionHandler();
  };

  return (
    <Modal onCancle={() => props.onCancle()} title={fieldOfStudy} scroll={true}>
      <form onSubmit={(e) => handleSubmitChanges(e)}>
        <div className={classes.question}>
          <div className={classes.questionType}>
            <Typography>Type:</Typography>
            <select
              onChange={() => {
                setQuestionType(dispatch);
              }}
              defaultValue={formState.isMultipleAnswers}
            >
              <option value={true}>Multiple answer</option>
              <option value={false}>Single answer</option>
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
            <InputSearch
              list={tags}
              notRequired={true}
              name="Tags"
              onSelect={(tag) => addTag(dispatch, tag)}
            />
            <QuestionAndTags
              tags={formState.tags}
              isRemoveable={true}
              removeTag={(tag) => removeTag(dispatch, tag, formState)}
            />
          </div>
          <div className={classes.actions}>
            {isLoading || isLoadingg ? (
              <LoadingSpinner />
            ) : (
              <Button type="submit" className={classes.submitBtn}>
                Submit
              </Button>
            )}
          </div>
        </div>
      </form>

      <div>
        <AddTag />
      </div>
      <Snackbar ref={snackbarRef} message="Something went wrong" type="fail" />
    </Modal>
  );
};

export default NewQuestion;
