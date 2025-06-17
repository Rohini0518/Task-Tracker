import { AppBar, Toolbar, Typography, Paper, Avatar } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green, purple } from "@mui/material/colors";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        backgroundColor: green[500],
        px: { xs: 2, sm: 4 },
        borderRadius:4,
        boxShadow:4,
        mb:4
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <Paper
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            p: { xs: 0.5, sm: 1 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckCircleIcon
            sx={{
              color: "#2563eb",
              fontSize: { xs: 24, sm: 32 },
            }}
          />
        </Paper>

        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
          }}
        >
          Task Tracker
        </Typography>
      </Toolbar>
      <Avatar
        sx={{ bgcolor: purple[500] }}
      >
        KR
      </Avatar>
    </AppBar>
  );
};

export default Header;
