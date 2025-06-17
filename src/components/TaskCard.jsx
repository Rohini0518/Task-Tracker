import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { green, red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import axios from "axios";

const TaskCard = () => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "https://task-tracker-backend-ssk9.onrender.com/api/getAllTasks"
        );

        console.log("data", response.data);
        setTaskList(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };
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

  return (
    <>
      {taskList.map((task) => (
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
                  // onClick={onEdit}
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
                  // onClick={onDelete}
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
    </>
  );
};

export default TaskCard;
