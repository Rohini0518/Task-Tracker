import { Typography, Paper, Avatar, Box, Button } from "@mui/material";
import StatusButtons from "./StatusButtons";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AddIcon from "@mui/icons-material/Add";

const Header = ({ filterStatus, setFilterStatus, handleCreateClick }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: 4,
        p: 3,
        mb: 4,
        color: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", md: "center" },
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              width: 56,
              height: 56,
            }}
          >
            <TaskAltIcon sx={{ fontSize: 30 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 0.5 }}>
              Task Manager
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Organize your work efficiently
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            alignItems: "center",
          }}
        >
          <StatusButtons selectedStatus={filterStatus} onChange={setFilterStatus} />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateClick}
            sx={{
              bgcolor: "success",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "white",
              fontWeight: "bold",
              borderRadius: 3,
              px: 3,
              py: 1.5,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.3)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Create Task
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Header;
