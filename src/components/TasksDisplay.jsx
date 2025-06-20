import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Container,
  Fade,
  Paper,
  Divider,
  Tooltip,
  Zoom,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { green, red, orange, purple } from "@mui/material/colors";
import { useEffect, useState } from "react";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import CreateEditTask from "./CreateEditTask";
import Header from "./Header";

const TasksDisplay = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
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
      showSnackbar("Task Deleted successfully", "warning");
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return { bg: green[50], border: green[200], text: green[700] };
      case "Pending":
        return { bg: orange[50], border: orange[200], text: orange[700] };
      default:
        return { bg: purple[50], border: purple[200], text: purple[700] };
    }
  };

  const filteredTasks = tasks.filter((task) =>
    filterStatus === "All" ? true : task.status === filterStatus
  );

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Header
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        handleCreateClick={handleCreateClick}
      />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress size={60} sx={{ color: purple[500] }} />
        </Box>
      ) : error ? (
        <Paper
          sx={{
            p: 4,
            textAlign: "center",
            bgcolor: red[50],
            border: `1px solid ${red[200]}`,
            borderRadius: 3,
          }}
        >
          <Typography color="error" variant="h6">
            {error}
          </Typography>
        </Paper>
      ) : (
        <Box>
          {filteredTasks.length === 0 ? (
            <Paper
              sx={{
                p: 6,
                textAlign: "center",
                bgcolor: "grey.50",
                borderRadius: 3,
              }}
            >
              <TaskAltIcon sx={{ fontSize: 80, color: "grey.400", mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No tasks found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {filterStatus === "All"
                  ? "Create your first task to get started!"
                  : `No tasks with status "${filterStatus}"`}
              </Typography>
            </Paper>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                gap: 3,
              }}
            >
              {filteredTasks.map((task, index) => {
                const statusColor = getStatusColor(task.status);
                return (
                  <Fade in={true} timeout={300 + index * 100} key={task._id}>
                    <Card
                      sx={{
                        width: { xs: "100%", md: "100%" },
                        maxWidth: { xs: "100%", md: "500px" },
                        borderRadius: 4,
                        boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                        border: `1px solid ${statusColor.border}`,
                        bgcolor: statusColor.bg,
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          transform: "translateY(-6px)",
                          boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
                        },
                        overflow: "visible",
                        position: "relative",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 4,
                          background: `linear-gradient(90deg, ${statusColor.text}, ${statusColor.border})`,
                          borderRadius: "14px 14px 0 0",
                        }}
                      />

                      <CardContent sx={{ p: 2.5 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <Box sx={{ flex: 1, mr: 1.5, minWidth: 0 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: "bold",
                                mb: 1,
                                color: statusColor.text,
                                fontSize: { xs: "1rem", md: "1.1rem" },
                                wordBreak: "break-word",
                                lineHeight: 1.3,
                              }}
                            >
                              {task.title}
                            </Typography>

                            <Typography
                              variant="body2"
                              sx={{
                                mb: 1.5,
                                color: "text.secondary",
                                lineHeight: 1.4,
                                fontSize: { xs: "0.8rem", md: "0.85rem" },
                                wordBreak: "break-word",
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {task.description}
                            </Typography>

                            <Divider sx={{ my: 1.5, opacity: 0.6 }} />

                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.5,
                                }}
                              >
                                <CalendarTodayIcon
                                  sx={{ fontSize: 14, color: green[600] }}
                                />
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: green[500],
                                    fontWeight: "medium",
                                    fontSize: { xs: "0.7rem", md: "0.75rem" },
                                  }}
                                >
                                  Created: {formatDate(task.createdAt)}
                                </Typography>
                              </Box>

                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.5,
                                }}
                              >
                                <AccessTimeIcon
                                  sx={{ fontSize: 14, color: red[600] }}
                                />
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: red[600],
                                    fontWeight: "medium",
                                    fontSize: { xs: "0.7rem", md: "0.75rem" },
                                  }}
                                >
                                  Due: {formatDate(task.dueDate)}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: 1.5,
                              minWidth: { xs: "90px", md: "100px" },
                            }}
                          >
                            <Chip
                              label={task.status}
                              sx={{
                                bgcolor: statusColor.text,
                                color: "white",
                                fontWeight: "bold",
                                fontSize: { xs: "0.65rem", md: "0.7rem" },
                                px: 1.5,
                                py: 0.3,
                                borderRadius: 3,
                                minWidth: { xs: "80px", md: "90px" },
                                textAlign: "center",
                                height: { xs: "24px", md: "26px" },
                              }}
                            />

                            <Box sx={{ display: "flex", gap: 0.5 }}>
                              <Tooltip title="Edit Task" arrow>
                                <Zoom in={true}>
                                  <IconButton
                                    onClick={() => handleEditClick(task)}
                                    sx={{
                                      bgcolor: green[300],
                                      color: "white",
                                      width: { xs: 36, md: 40 },
                                      height: { xs: 36, md: 40 },
                                      borderRadius: 2,
                                      boxShadow:
                                        "0 4px 12px rgba(76, 175, 80, 0.3)",
                                      transition: "all 0.2s ease",
                                      "&:hover": {
                                        bgcolor: green[400],
                                        transform: "scale(1.1)",
                                        boxShadow:
                                          "0 6px 16px rgba(76, 175, 80, 0.4)",
                                      },
                                    }}
                                  >
                                    <EditIcon
                                      sx={{ fontSize: { xs: 16, md: 18 } }}
                                    />
                                  </IconButton>
                                </Zoom>
                              </Tooltip>

                              <Tooltip title="Delete Task" arrow>
                                <Zoom in={true}>
                                  <IconButton
                                    onClick={() => handleDelete(task._id)}
                                    sx={{
                                      bgcolor: red[300],
                                      color: "white",
                                      width: { xs: 36, md: 40 },
                                      height: { xs: 36, md: 40 },
                                      borderRadius: 2,
                                      boxShadow:
                                        "0 4px 12px rgba(244, 67, 54, 0.3)",
                                      transition: "all 0.2s ease",
                                      "&:hover": {
                                        bgcolor: red[400],
                                        transform: "scale(1.1)",
                                        boxShadow:
                                          "0 6px 16px rgba(244, 67, 54, 0.4)",
                                      },
                                    }}
                                  >
                                    <DeleteIcon
                                      sx={{ fontSize: { xs: 16, md: 18 } }}
                                    />
                                  </IconButton>
                                </Zoom>
                              </Tooltip>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Fade>
                );
              })}
            </Box>
          )}

          <Dialog
            open={openForm}
            onClose={handleCloseForm}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.5rem",
                mb: 4,
                p: 2,
              }}
            >
              {taskToEdit ? "Edit Task" : "Create Task"}
            </DialogTitle>
            <DialogContent sx={{ p: 3 }}>
              <CreateEditTask
                initialValues={taskToEdit || {}}
                onSubmit={handleCreateOrUpdate}
              />
            </DialogContent>
          </Dialog>

          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbar.severity}
              variant="filled"
              sx={{
                width: "100%",
                borderRadius: 3,
                fontWeight: "medium",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      )}
    </Container>
  );
};

export default TasksDisplay;
