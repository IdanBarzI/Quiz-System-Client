import React, { useRef } from "react";
import { useStore } from "../../../../store/store";
import { useNavigate } from "react-router-dom";
import { Line, Button, Typography } from "../../../Ui";
import classes from "../TestGrid.module.css";

export const GridItem = (props) => {
  console.log("RENDER_GridItem");
  const { test, idx, snackbarShow } = props;
  const dispatch = useStore(false)[1];
  const navigate = useNavigate();

  const handleCopyLinkToClipBoard = (link) => {
    navigator.clipboard.writeText(link);
    snackbarShow("Copied to clipboard", "success");
  };

  const editHandler = () => {
    dispatch("TOGGLE_SELECTED", test._id);
    navigate(`/admin/tests/${test._id}`);
  };

  return (
    <>
      <tr className={classes.row}>
        <td className={classes.td}>
          <Typography className={classes.cell}>{idx + 1}</Typography>
        </td>
        <td className={classes.td}>
          <Button onClick={() => handleCopyLinkToClipBoard(test.testUrl)}>
            Copy Link
          </Button>
        </td>
        <td className={classes.td}>
          <Typography className={classes.cell}>{test.title}</Typography>
        </td>
        <td className={classes.td}>
          <Typography className={classes.cell}>
            {test.questions.length}
          </Typography>
        </td>
        <td className={classes.td}>
          <Line>
            <Button onClick={() => editHandler(test)}>Edit</Button>
            <Button disabled={true}>Duplicate</Button>
          </Line>
        </td>
      </tr>
    </>
  );
};

export default GridItem;
