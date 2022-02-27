import { initStore } from "./store";

const configureTestsStore = () => {
  const actions = {
    TOGGLE_SELECTED: (curState, TestId) => {
      const testIndex = curState.tests.findIndex((t) => t._id === TestId);
      curState.selectedTest = curState.tests[testIndex];
      return { selectedTest: { ...curState.tests[testIndex] } };
    },
    SET_TESTS: (curState, tests) => {
      return {
        tests: [...tests],
        testsToShow: [...tests],
      };
    },
  };

  initStore(actions, {
    tests: [],
    testsToShow: [],
    selectedTest: {},
  });
};

export default configureTestsStore;
