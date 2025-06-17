import React from "react";
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

const TaskCard = ({
  title,
  description,
  status,
  createdAt,
  onEdit,
  onDelete,
}) => {
  // Format date as "13 June 2025"
  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
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
          task1 complete frontend
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mb: 1.5,
            color: "text.secondary",
            fontSize: { xs: "0.65rem", sm: "1rem" },
          }}
        >
          do first display taks page then move to create task Ui
        </Typography>
<Box sx={{display:'flex',flexDirection:'column'}}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ color:'green',fontSize: { xs: "0.7rem", sm: "0.8rem" } }}
        >
          Created: {formattedDate}
        </Typography>

         <Typography
          variant="caption"
          color="text.secondary"
          sx={{ color:'red',fontSize: { xs: "0.7rem", sm: "0.8rem" } }}
        >
          DueDate: {formattedDate}
        </Typography></Box>
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
          label={"Completed"}
          color={status === "Completed" ? "success" : "warning"}
          size="small"
          sx={{ m: 1 ,py:2,px:1,fontWeight:'bold'}}
        />
        <Box>
          <IconButton
            size="medium"
            onClick={onEdit}
            aria-label="edit task"
            sx={{ bgcolor:green[200],
                borderRadius:2,
    color: 'white',
    '&:hover': {
      bgcolor: green[300],
    },
              "& svg": {
                fontSize: { xs: 18, sm: 20 },fontWeight:'bold'
              },     

            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="medium"
            onClick={onDelete}
            aria-label="delete task"
            sx={{bgcolor:red[300],
                borderRadius:2,
                mx:1,
                color:'white',
              "& svg": {
                fontSize: { xs: 18, sm: 20 },fontWeight:'bold'
              },'&:hover':{bgcolor:red[400]}
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>

    
    </>
  );
};

export default TaskCard;
