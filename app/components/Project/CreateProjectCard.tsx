import { Card, Typography } from "@mui/material";
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
      <Card
        component={"div"}
        onClick={OpenCreateNewProject}
        sx={{
          
          height: "100%",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          cursor:'pointer',
          borderRadius:3
        }}
      >
        <AddOutlinedIcon sx={{ fontSize: "50px" }} />
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, py: 1, textAlign: "center" }}
        >
          New Project
        </Typography>
      </Card>
    </>
  );
};

export default CreateProjectCard;
