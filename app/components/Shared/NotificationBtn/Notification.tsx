import { Box, IconButton, Typography, useTheme } from "@mui/material";
import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
const Notification = () => {
  const theme: any = useTheme();
  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        my: 1,
        p: 1,
        borderRadius: 2,
        backgroundColor: `${theme.palette.primary.main}10`,
      }}
    >
      <Box
        sx={{
          width: "50px",
          height: "50px",
          borderRadius: 2,
          backgroundColor: `${theme.palette.primary.main}40`,
        }}
      ></Box>
      <Typography
        sx={{
          pl: 2,
          width: "calc(100% - 84px)",
          fontWeight: "500",
          fontSize: "14px",
        }}
      >
        Jhon Dave Shared a canvas with you. click to see the canvas.
      </Typography>
      <IconButton size="small">
        <CloseOutlinedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default Notification;
