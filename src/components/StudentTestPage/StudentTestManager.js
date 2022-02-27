import React, { useEffect, useContext } from "react";
import Register from "../../components/StudentTestPage/Register/Register";
import serverAccess from "../../api/serverAccess";
import { useParams } from "react-router-dom";
import Opening from "../../components/StudentTestPage/StudentTest/Opening";
import Closing from "../../components/StudentTestPage/StudentTest/Closing";
import StudentTestContext from "../../context/StudentTestContext";
import Questions from "../../components/StudentTestPage/StudentTest/Questions";

const StudentTestManager = () => {
  const { id } = useParams();
  const {
    setTest,
    setQuestionIndex,
    setStudentAnswers,
    student,
    test,
    questionIndex,
    isFinished,
  } = useContext(StudentTestContext);

  useEffect(() => {
    serverAccess
      .get(`/tests/${id}`)
      .then((res) => {
        setTest(res.data);
        setQuestionIndex(-1);
        setStudentAnswers([]);
      })
      .catch((err) => console.log(err));
  }, []);

  const render = () => {
    if (student && test && questionIndex >= 0 && !isFinished) {
      return <Questions />;
    } else if (student && test && questionIndex === -1 && !isFinished) {
      return <Opening />;
    } else if (isFinished) {
      return <Closing />;
    } else {
      return <Register />;
    }
  };

  return <>{render()}</>;
};

export default StudentTestManager;
