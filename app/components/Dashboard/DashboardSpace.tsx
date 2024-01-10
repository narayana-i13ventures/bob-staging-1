"use client";
import React from "react";
import DashboardSidebar from "./DashboardSidebar";
import {
  Container,
  Divider,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ProjectDetails from "../Project/ProjectDetails";
import CreateProjectModal from "../Project/CreateProjectModal";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import ProjectsContainer from "./ProjectsContainer";
import ShareModal from "../Shared/ShareModal";
const DashboardSpace = () => {

  return (
    <Container
      maxWidth={'xl'}
      component={"div"}
      sx={{
        flexGrow: 1,
        width: "100%",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "flex-start",
      }}
    >
      <Stack
        direction={'column'}
        justifyContent={'flex-start'}
        alignItems={'flex-start'}
        sx={{
          mt: 3,
          mr: 4,
          flexGrow: 1,
          width: "250px",
        }}
      >
        <DashboardSidebar />
      </Stack>

      <Stack
        direction={"column"}
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        sx={{
          mt: 2,
          flexGrow: 1,
          width: "100%",
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{
            zIndex: 100,
            width: "100%",
            position: "relative",
            backgroundColor: "white",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
            }}
          >
            My Projects
          </Typography>
          <Stack
            direction={"row"}
            justifyContent={"flex-end"}
            alignItems={"center"}
            component={"div"}
          >
            <Tooltip title={"Grid View"} arrow>
              <IconButton size="medium" sx={{ mr: 1 }}>
                <GridViewOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title={"List View"} arrow>
              <IconButton size="medium">
                <ListOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        <Divider sx={{ width: '100%', mb: 2, mt: 1 }} />
        <ProjectsContainer />
      </Stack>
      <ProjectDetails />
      <ShareModal />
      <CreateProjectModal />
    </Container>
  );
};

export default DashboardSpace;
