import React, { useContext, useEffect, useReducer } from "react";
import { useStore } from "../../../store/store";
import useFetch from "../../../hooks/use-fetch";
import useAxiosFetch from "../../../hooks/use-axios";
import {
  Modal,
  Typography,
  TextEditor,
  Button,
  LoadingSpinner,
  Input,
  InputSearch,
} from "../../Ui";
import AnswersManager from "./AnswersManager";
import AppContext from "../../../context/AppContext";
import {
  onFocusOut,
  setQuestionType,
  addTag,
  UPDATE_FORM,
  UPDATE_QUESTION_TYPE,
  ADD_TAG,
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

    default:
      return state;
  }
};

const NewQuestion = () => {
  const [{ selectedQuestion, questions, tags }, dispatchStore] = useStore();

  const { data, fetchError, isLoadingTags } = useAxiosFetch(`/tags`);

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
            isMultipleAnswers: formState.isMultipleAnswers,
            tags: formState.tags,
            answers: formState.answers.value,
          },
        },
        (question) => {
          console.log(questions);
          dispatchStore("ADD_QUESTION", question);
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
            <QuestionAndTags tags={formState.tags} />
          </div>
          <div className={classes.actions}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <Button type="submit">Submit Changes</Button>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
};

//onSelect={console.log(tag)}

export default NewQuestion;
