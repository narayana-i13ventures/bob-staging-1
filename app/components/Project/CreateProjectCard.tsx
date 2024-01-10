import { Card, Stack, Typography } from "@mui/material";
import React from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { appSlice, useDispatch } from "@/lib/redux";

const CreateProjectCard = () => {
  const dispatch = useDispatch();

  const OpenCreateNewProject = () => {
    dispatch(appSlice.actions.toggleNewProjectOpen(true));
  };
  return (
    <>
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        component={"div"}
        onClick={OpenCreateNewProject}
        sx={{
          borderRadius: 2,
          cursor: "pointer",
          minHeight: "220px",
          maxHeight: "220px",
          border: "1px solid #000",
        }}
      >
        <AddOutlinedIcon sx={{ fontSize: "50px" }} />
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, py: 1, textAlign: "center" }}
        >
          New Project
        </Typography>
      </Stack>
    </>
  );
};

export default CreateProjectCard;
