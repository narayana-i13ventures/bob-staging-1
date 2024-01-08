"use client";
import React from "react";
import ProjectCard from "../Project/ProjectCard";
import DashboardSidebar from "./DashboardSidebar";
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ProjectDetails from "../Project/ProjectDetails";
import CreateProjectCard from "../Project/CreateProjectCard";
import ProjectShareModal from "../Shared/ShareModal";
import CreateProjectModal from "../Project/CreateProjectModal";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { useGetAllProjectsQuery } from "@/lib/redux/projectApi";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
const DashboardSpace = () => {
  const {
    data: projects,
    isSuccess: fetch_projects_success,
    isLoading: fetch_projects_loading,
    isError: fetch_projects_error,
  } = useGetAllProjectsQuery({});

  return (
    <Box
      component={"div"}
      sx={{
        flexGrow: 1,
        width: "100%",
        display: "flex",
        alignItems: "stretch",
        backgroundColor: "white",
        justifyContent: "flex-start",
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          p: 2,
          flexGrow: 1,
          width: "250px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          borderRight: "1px solid #00000010",
        }}
      >
        <DashboardSidebar />
      </Box>

      <Stack
        direction={"column"}
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        sx={{
          p: 2,
          pr: 0,
          pb: 0,
          flexGrow: 1,
          width: "100%",
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{
            pb: 1,
            px: 2,
            mb: 2,
            zIndex: 100,
            width: "100%",
            position: "relative",
            backgroundColor: "white",
            borderBottom: "1px solid #00000030",
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
              <IconButton size="small" sx={{ mr: 1 }}>
                <GridViewOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title={"List View"} arrow>
              <IconButton size="small">
                <ListOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        {!fetch_projects_loading &&
        !fetch_projects_error &&
        fetch_projects_success ? (
          <Box
            sx={{
              px: 1,
              pr: 2,
              flexGrow: 1,
              width: "100%",
              overflowY: "auto",
              maxHeight: "calc(100vh - 135px)",
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={2}>
                <CreateProjectCard />
              </Grid>
              {projects?.owned_projects?.map((project: any) => {
                return (
                  <Grid key={project?.project_id} item xs={2}>
                    <ProjectCard project={project} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        ) : (
          <Box
            sx={{
              flexGrow: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Stack>
      <ProjectDetails />
      <ProjectShareModal />
      <CreateProjectModal />
    </Box>
  );
};

export default DashboardSpace;
