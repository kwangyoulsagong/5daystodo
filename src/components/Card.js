import React, { useState } from "react";
import {
  Card as MuiCard,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTaskPopup from "../modals/EditTask";

const categoryColors = {
  Work: {
    primaryColor: "#5D93E1",
    secondaryColor: "#ECF3FC",
  },
  Personal: {
    primaryColor: "#F9D288",
    secondaryColor: "#FEFAF1",
  },
  Shopping: {
    primaryColor: "#5DC250",
    secondaryColor: "#F2FAF1",
  },
  Others: {
    primaryColor: "#F48687",
    secondaryColor: "#FDF1F1",
  },
};

const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const updateTask = (obj) => {
    updateListArray(obj, index);
  };

  const handleDelete = () => {
    deleteTask(index);
  };

  const handleCheck = () => {
    const updatedTask = { ...taskObj, Completed: !taskObj.Completed };
    updateListArray(updatedTask, index);
  };

  const { primaryColor, secondaryColor } =
    categoryColors[taskObj.Category] || categoryColors.Others;

  return (
    <MuiCard style={{ marginBottom: "20px", backgroundColor: secondaryColor }}>
      <Box style={{ backgroundColor: primaryColor, height: "10px" }}></Box>
      <CardContent>
        <FormControlLabel
          control={
            <Checkbox checked={taskObj.Completed} onChange={handleCheck} />
          }
          label={
            <Typography
              variant="h5"
              component="div"
              style={{
                backgroundColor: secondaryColor,
                borderRadius: "10px",
                padding: "10px",
                textDecoration: taskObj.Completed ? "line-through" : "none",
              }}
            >
              {taskObj.Name}
            </Typography>
          }
        />
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          style={{
            marginTop: "15px",
            textDecoration: taskObj.Completed ? "line-through" : "none",
          }}
        >
          {taskObj.Description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          aria-label="edit"
          onClick={toggle}
          style={{ color: primaryColor }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={handleDelete}
          style={{ color: primaryColor }}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
      <EditTaskPopup
        modal={modal}
        toggle={toggle}
        updateTask={updateTask}
        taskObj={taskObj}
      />
    </MuiCard>
  );
};

export default Card;
