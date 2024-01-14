"use client";
import { useGetAllProjectsQuery } from "@/lib/redux/projectApi";
import {
  Grid,
  CircularProgress,
  Box,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import React from "react";
import CreateProjectCard from "../Project/CreateProjectCard";
import ProjectCard from "../Project/ProjectCard";

const ProjectsContainer = () => {
  const {
    data: projects,
    isSuccess: fetch_projects_success,
    isLoading: fetch_projects_loading,
    isError: fetch_projects_error,
    refetch: getAllProjects,
  } = useGetAllProjectsQuery({});
  const retry = () => {
    getAllProjects();
  };
  return (
    <>
      {!fetch_projects_loading &&
        !fetch_projects_error &&
        fetch_projects_success && (
          <Box
            sx={{
              flexGrow: 1,
              width: "100%",
              overflowY: "auto",
              maxHeight: "calc(100vh - 135px)",
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={3}>
                <CreateProjectCard />
              </Grid>
              {projects?.owned_projects?.map((project: any) => {
                return (
                  <Grid key={project?.project_id} item xs={3}>
                    <ProjectCard project={project} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}

      {fetch_projects_loading &&
        !fetch_projects_error &&
        !fetch_projects_success && (
          <Box
            sx={{
              mt: 7,
              flexGrow: 0,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      {!fetch_projects_loading &&
        fetch_projects_error &&
        !fetch_projects_success && (
          <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              mt: 7,
              flexGrow: 0,
              width: "100%",
            }}
          >
            <Typography variant="body1" sx={{ fontSize: "14px", mb: 4 }}>
              Something went wrong..! Try again
            </Typography>
            <Button variant="contained" onClick={retry}>
              Retry
            </Button>
          </Stack>
        )}
    </>
  );
};

export default ProjectsContainer;
