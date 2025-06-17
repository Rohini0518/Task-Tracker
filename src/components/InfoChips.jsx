import { Box, Button } from "@mui/material";
import { green, orange, blue } from "@mui/material/colors";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";

const InfoChips = ({ selectedStatus, onChange }) => {
  const statuses = [
    {
      label: "All",
      value: "All",
      icon: <AllInclusiveIcon sx={{ fontSize: 16 }} />,
      colors: {
        selected: { bg: blue[500], text: "white", border: blue[600] },
        unselected: {
          bg: "rgba(255,255,255,0.1)",
          text: "rgba(255,255,255,0.9)",
          border: "rgba(255,255,255,0.3)",
        },
      },
    },
    {
      label: "Completed",
      value: "Completed",
      icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
      colors: {
        selected: { bg: green[500], text: "white", border: green[600] },
        unselected: {
          bg: "rgba(255,255,255,0.1)",
          text: "rgba(255,255,255,0.9)",
          border: "rgba(255,255,255,0.3)",
        },
      },
    },
    {
      label: "Pending",
      value: "Pending",
      icon: <PendingIcon sx={{ fontSize: 16 }} />,
      colors: {
        selected: { bg: orange[500], text: "white", border: orange[600] },
        unselected: {
          bg: "rgba(255,255,255,0.1)",
          text: "rgba(255,255,255,0.9)",
          border: "rgba(255,255,255,0.3)",
        },
      },
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {statuses.map((status) => {
        const isSelected = selectedStatus === status.value;
        const colors = isSelected
          ? status.colors.selected
          : status.colors.unselected;

        return (
          <Button
            key={status.value}
            variant="outlined"
            startIcon={status.icon}
            onClick={() => onChange(status.value)}
            sx={{
              minWidth: 120,
              height: 40,
              borderRadius: 3,
              fontWeight: "bold",
              fontSize: "0.85rem",
              textTransform: "none",
              backgroundColor: colors.bg,
              color: colors.text,
              border: `2px solid ${colors.border}`,
              backdropFilter: "blur(10px)",
              boxShadow: isSelected
                ? "0 4px 12px rgba(0,0,0,0.15)"
                : "0 2px 8px rgba(0,0,0,0.1)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: isSelected
                  ? "0 6px 20px rgba(0,0,0,0.2)"
                  : "0 4px 16px rgba(0,0,0,0.15)",
                backgroundColor: isSelected
                  ? colors.bg
                  : "rgba(255,255,255,0.2)",
                borderColor: colors.border,
              },
              "&:active": {
                transform: "translateY(0px)",
              },
              "& .MuiButton-startIcon": {
                marginRight: 1,
                transition: "transform 0.2s ease",
              },
              "&:hover .MuiButton-startIcon": {
                transform: "scale(1.1)",
              },
            }}
          >
            {status.label}
          </Button>
        );
      })}
    </Box>
  );
};

export default InfoChips;
