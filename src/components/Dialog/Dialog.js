import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Input,
  InputLabel,
  FormControl,
} from "@mui/material";
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
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (taskId !== null) {
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
    <Dialog open={openDialog} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <form onSubmit={handleSubmit}>
            <FormControl variant="standard" fullWidth>
              <InputLabel htmlFor="input-with-icon-adornment">Title</InputLabel>
              <Input
                id="input-with-icon-adornment"
                name="title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </FormControl>
            <DialogActions sx={{ mt: 2, mx: -1 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!taskTitle}
              >
                Submit
              </Button>
            </DialogActions>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CommonDialog;
