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
  // const {
  //     data: projects,
  //     isSuccess: fetch_projects_success,
  //     isLoading: fetch_projects_loading,
  //     isError: fetch_projects_error,
  // } = useGetAllProjectsQuery({});

  const test = {
    fetch_projects_success: true,
    fetch_projects_loading: false,
    fetch_projects_error: false,
  };
  return (
    <>
      {!test?.fetch_projects_loading &&
        !test?.fetch_projects_error &&
        test?.fetch_projects_success && (
          <Box
            sx={{
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
              <Grid item xs={2}>
                <ProjectCard
                  project={{ project_id: "1", project_name: "Uber Helicopter" }}
                />
              </Grid>
              <Grid item xs={2}>
                <ProjectCard
                  project={{ project_id: "2", project_name: "Uber Cycles" }}
                />
              </Grid>
              <Grid item xs={2}>
                <ProjectCard
                  project={{ project_id: "3", project_name: "Car Rentals" }}
                />
              </Grid>
              {/* {projects?.owned_projects?.map((project: any) => {
                            return (
                                <Grid key={project?.project_id} item xs={2}>
                                    <ProjectCard project={project} />
                                </Grid>
                            );
                        })} */}
            </Grid>
          </Box>
        )}

      {test?.fetch_projects_loading &&
        !test?.fetch_projects_error &&
        !test?.fetch_projects_success && (
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
      {!test?.fetch_projects_loading &&
        test?.fetch_projects_error &&
        !test?.fetch_projects_success && (
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
            <Button variant="contained">Retry</Button>
          </Stack>
        )}
    </>
  );
};

export default ProjectsContainer;
