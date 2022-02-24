import { initStore } from "./store";

const configureStore = () => {
  const actions = {
    TOGGLE_SELECTED: (curState, questionId) => {
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
        questions: [...questions],
      };
    },
    ADD_QUESTION: (curState, question) => {
      return {
        questions: [...curState.questions, question],
      };
    },
  };

  initStore(actions, {
    questions: [],
    selectedQuestion: {},
    questionPage: { modalPreviewOpen: false, modalEditOpen: false },
  });
};

export default configureStore;
