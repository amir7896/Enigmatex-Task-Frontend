import React, { useEffect, useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import TasksApi from "../../services/apis/Tasks.Api";
import { useStates } from "../../hooks/useStates";
import { Dialog, ConfirmDialog } from "../../components";

const Tasks = () => {
  const {
    tasks,
    setTasks,
    openDialog,
    setOpenDialog,
    confirmOpen,
    setConfirmOpen,
  } = useStates();
  const [taskId, setTaskId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  // Open dialog
  const open = () => {
    setOpenDialog(!openDialog);
  };

  // Get tasks
  const getTasks = async () => {
    const tasks = await TasksApi.getTasks();
    setTasks(tasks);
  };

  useEffect(() => {
    getTasks();
  }, []);

  // Open update dialog
  const handleUpdate = (id) => {
    setTaskId(id);
    setOpenDialog(true);
  };

  // Handle delete ..
  const handleDelete = async () => {
    const response = await TasksApi.deleteTask(deleteId);
    if (response.success) {
      toast.success(response.message);
      setConfirmOpen(false);
      getTasks();
    }
  };

  const handleDeleteOpen = async (id) => {
    setConfirmOpen(true);
    setDeleteId(id);
  };

  // Handle products page navigate
  const handleNavigate = () => {
    navigate("/products");
  };

  return (
    <Box sx={{ mx: 2, my: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button
          sx={{ m: 2 }}
          variant="contained"
          color="primary"
          onClick={open}
        >
          Add New Task
        </Button>

        <Button
          sx={{ m: 2 }}
          variant="contained"
          color="info"
          onClick={handleNavigate}
        >
          Products
        </Button>
      </Box>

      {/* Tasks List */}
      <Grid container spacing={2}>
        {tasks &&
          tasks.map((dt) => (
            <Grid item md={4} xs={6} key={dt._id}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Title: {dt?.title}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteOpen(dt?._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(dt?._id)}
                  >
                    Update
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>

      {/* Dialog for add and update */}
      <Dialog
        title="Add Task"
        taskId={taskId}
        setTaskId={setTaskId}
        getTasks={getTasks}
      />

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        title="Delete Task ?"
        dialogContext="Are you sure to delete this task"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default Tasks;
