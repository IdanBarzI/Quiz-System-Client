import React, { useEffect, useContext } from "react";
import { useStore } from "../../store/store";
import NewQuestion from "./newQuestion/NewQuestion";
import QuestionGrid from "./questionGrid/QuestionGrid";
import useAxiosFetch from "../../hooks/use-axios";
import { Button, LoadingSpinner } from "../Ui";
import classes from "./Question.module.css";

const QuestionsManager = () => {
  const [{ questionPage }, dispatch] = useStore();
  const { data, fetchError, isLoading } = useAxiosFetch(`/qusetions`);

  useEffect(() => {
    dispatch("SET_QUESTIONS", data);
  }, [data]);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className={classes.question}>
          <QuestionGrid />
          <div className={classes.buttons}>
            <div>
              <Button className={classes.backButton} href="/admin/main-menu">
                back
              </Button>
            </div>
            <div>
              <Button onClick={() => dispatch("TOGGLE_MODAL_EDIT")}>
                Create New Question
              </Button>
            </div>
          </div>
          {questionPage.modalEditOpen && <NewQuestion />}
        </div>
      )}
    </div>
  );
};

export default QuestionsManager;
