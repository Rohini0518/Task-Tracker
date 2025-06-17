import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { green, red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import CreateTask from "./CreateTask";

const TaskCard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://task-tracker-backend-ssk9.onrender.com/api/getAllTasks"
      );

      console.log("data", response.data);
      setTasks(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    console.log("useeffect");
  }, []);

  function formatDate(date) {
    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formattedDate;
  }
  const handleCreateClick = () => {
    setTaskToEdit(null);
    setOpenForm(true);
  };

  const handleEditClick = (task) => {
    setTaskToEdit(task);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(
        `https://task-tracker-backend-ssk9.onrender.com/api/deleteTask/${id}`
      );
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete task");
    }
  };

  const handleCreateOrUpdate = async (formValues) => {
    try {
      if (taskToEdit && taskToEdit._id) {
        await axios.put(
          `https://task-tracker-backend-ssk9.onrender.com/api/updateTask/${taskToEdit._id}`,
          formValues
        );
        showSnackbar("Task updated successfully", "success");
      } else {
        await axios.post(
          "https://task-tracker-backend-ssk9.onrender.com/api/createTask",
          formValues
        );
        showSnackbar("Task created successfully", "success");
      }
      setOpenForm(false);
      setTaskToEdit(null);
      fetchTasks();
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to save task", "error");
    }
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setTaskToEdit(null);
  };
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
          width: "80%",
          mx: "auto",
          my: 1,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ color: "green" }}>
          Task List
        </Typography>
        <Button variant="contained" onClick={handleCreateClick}>
          Create Task
        </Button>
      </Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box>
          {tasks.map((task) => (
            <div key={task._id}>
              <Card
                sx={{
                  width: "80%",
                  mx: "auto",
                  my: 1,
                  borderRadius: 2,
                  boxShadow: 3,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  alignContent: "center",
                  flexGrow: 1,
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      mb: 1,
                      fontSize: { xs: "1rem", sm: "1.25rem", md: "1.4rem" },
                    }}
                  >
                    {task.title}{" "}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      mb: 1.5,
                      color: "text.secondary",
                      fontSize: { xs: "0.65rem", sm: "1rem" },
                    }}
                  >
                    {task.description}{" "}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        color: "green",
                        fontSize: { xs: "0.7rem", sm: "0.8rem" },
                      }}
                    >
                      Created: {formatDate(task.createdAt)}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        color: "red",
                        fontSize: { xs: "0.7rem", sm: "0.8rem" },
                      }}
                    >
                      DueDate: {formatDate(task.dueDate)}
                    </Typography>
                  </Box>
                </CardContent>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 1,
                    pt: 0,
                    gap: 0.5,
                  }}
                >
                  <Chip
                    label={task.status}
                    color={task.status === "Completed" ? "success" : "warning"}
                    size="small"
                    sx={{ m: 1, py: 2, px: 1, fontWeight: "bold" }}
                  />
                  <Box>
                    <IconButton
                      size="medium"
                      onClick={() => handleEditClick(task)}
                      aria-label="edit task"
                      sx={{
                        bgcolor: green[200],
                        borderRadius: 2,
                        color: "white",
                        "&:hover": {
                          bgcolor: green[300],
                        },
                        "& svg": {
                          fontSize: { xs: 18, sm: 20 },
                          fontWeight: "bold",
                        },
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="medium"
                      onClick={() => handleDelete(task._id)}
                      aria-label="delete task"
                      sx={{
                        bgcolor: red[300],
                        borderRadius: 2,
                        mx: 1,
                        color: "white",
                        "& svg": {
                          fontSize: { xs: 18, sm: 20 },
                          fontWeight: "bold",
                        },
                        "&:hover": { bgcolor: red[400] },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            </div>
          ))}
          <Dialog
            open={openForm}
            onClose={handleCloseForm}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>
              {taskToEdit ? "Edit Task" : "Create Task"}
            </DialogTitle>
            <DialogContent>
              <CreateTask
                initialValues={taskToEdit || {}}
                onSubmit={handleCreateOrUpdate}
              />
            </DialogContent>
          </Dialog>

          <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbar.severity}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      )}
    </>
  );
};

export default TaskCard;
