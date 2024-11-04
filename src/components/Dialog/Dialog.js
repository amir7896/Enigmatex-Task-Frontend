import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { toast } from "react-toastify";

import { useStates } from "../../hooks/useStates";
import TasksApi from "../../services/apis/Tasks.Api";

const CommonDialog = ({ title, taskId, setTaskId, getTasks }) => {
  const { openDialog, setOpenDialog, taskTitle, setTaskTitle } = useStates();

  // Handle close dialog
  const handleClose = () => {
    setOpenDialog(false);
    setTaskTitle("");
    if (taskId) {
      setTaskId(null);
    }
  };

  // Handle submit for add and update
  const handleSubmit = async () => {
    // Update Task
    if (taskId !== null) {
      console.log("Update is called:");
      const response = await TasksApi.updateTask({ title: taskTitle }, taskId);
      if (response.success) {
        toast.success(response.message);
        setOpenDialog(false);
        setTaskTitle("");
        getTasks();
      }
    } else {
      const response = await TasksApi.createTask({ title: taskTitle });
      if (response.success) {
        toast.success(response.message);
        setOpenDialog(false);
        setTaskTitle("");
        getTasks();
      }
    }
  };

  // Get single task
  useEffect(() => {
    if (taskId && taskId !== null) {
      const getTask = async () => {
        const task = await TasksApi.getSingleTask(taskId);
        setTaskTitle(task.data[0]?.title);
      };

      getTask();
    }
  }, [taskId]);

  return (
    <Dialog open={openDialog}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">Title</InputLabel>
            <Input
              id="input-with-icon-adornment"
              name="title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommonDialog;
