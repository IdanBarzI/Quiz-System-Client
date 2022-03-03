import { initStore } from "./store";

const configureQestionsStore = () => {
  const actions = {
    TOGGLE_SELECTED_QUESTION: (curState, questionId) => {
      if (questionId === -1) {
        return { selectedQuestion: {} };
      }
      const quesIndex = curState.questions.findIndex(
        (q) => q._id === questionId
      );
      curState.selectedQuestion = curState.questions[quesIndex];
      return { selectedQuestion: { ...curState.questions[quesIndex] } };
    },
    TOGGLE_MODAL_PREVIEW: (curState) => {
      const curModalState = curState.questionPage.modalPreviewOpen;
      if (curModalState) {
        curState.selectedQuestion = {};
      }
      curState.questionPage.modalPreviewOpen = !curModalState;

      return {
        questionPage: {
          ...curState.questionPage,
          modalPreviewOpen: curState.questionPage.modalPreviewOpen,
        },
      };
    },
    TOGGLE_MODAL_EDIT: (curState) => {
      const curModalState = curState.questionPage.modalEditOpen;
      if (curModalState) {
        curState.selectedQuestion = {};
      }
      curState.questionPage.modalEditOpen = !curModalState;

      return {
        questionPage: {
          ...curState.questionPage,
          modalEditOpen: curState.questionPage.modalEditOpen,
        },
      };
    },
    SET_QUESTIONS: (curState, questions) => {
      return {
        questionsToShow: [...questions],
        questions: [...questions],
      };
    },
    ADD_QUESTION: (curState, question) => {
      return {
        questionsToShow: [...curState.questionsToShow, question],
        questions: [...curState.questions, question],
      };
    },
    UPDATE_QUESTION: (curState, questionId) => {
      const quesIndex = curState.questions.findIndex(
        (q) => q._id === questionId
      );
      curState.selectedQuestion = curState.questions[quesIndex];
      return { selectedQuestion: { ...curState.questions[quesIndex] } };
    },
    SET_QUESTIONS_SHOW: (curState, questions) => {
      return {
        questionsToShow: [...questions],
      };
    },
    DELETE_QESTION: (curState, questionId) => {
      const questions = curState.questions.filter((q) => {
        return q._id !== questionId;
      });
      return {
        questionsToShow: [...questions],
        questions: [...questions],
      };
    },
    SET_TAGS: (curState, tags) => {
      return {
        tags: [...tags],
      };
    },
    ADD_TAG: (curState, tag) => {
      return {
        tags: [...curState.tags, tag],
      };
    },
  };

  initStore(actions, {
    questions: [],
    questionsToShow: [],
    tags: [],
    selectedQuestion: {},
    questionPage: { modalPreviewOpen: false, modalEditOpen: false },
  });
};

export default configureQestionsStore;
