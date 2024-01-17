"use client";
import React from "react";
import {
  Container,
  Divider,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Tooltip,
} from "@mui/material";
import ShareModal from "../Shared/ShareModal";
import DashboardSidebar from "./DashboardSidebar";
import Typography from "@mui/material/Typography";
import ProjectsContainer from "./ProjectsContainer";
import ProjectDetails from "../Project/ProjectDetails";
import CreateProjectModal from "../Project/CreateProjectModal";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
const DashboardSpace = () => {
  const dispatch = useDispatch();
  const { show_projects } = useSelector(selectApp);
  const changeDashboardView = (e: any) => {
    dispatch(appSlice.actions.toggleShowProjects(e?.target?.value));
  };
  return (
    <Container
      maxWidth={"xl"}
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
        direction={"column"}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
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
            {show_projects === "all"
              ? "Projects"
              : show_projects === "only_me"
                ? "My Projects"
                : show_projects === "shared"
                  ? "Shared Projects"
                  : ""}
          </Typography>
          <Stack
            direction={"row"}
            justifyContent={"flex-end"}
            alignItems={"center"}
            component={"div"}
          >
            {/* <Tooltip title={"Grid View"} arrow>
              <IconButton size="medium" sx={{ mr: 1 }}>
                <GridViewOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title={"List View"} arrow>
              <IconButton size="medium">
                <ListOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip> */}
            <Select
              size="small"
              sx={{
                fontSize: "14px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderWidth: "1px !important",
                },
              }}
              fullWidth
              id={`dashboard-selector`}
              onChange={(e: any) => {
                changeDashboardView(e);
              }}
              value={show_projects}
            >
              <MenuItem sx={{fontSize:'14px'}} value="all">All</MenuItem>
              <MenuItem sx={{fontSize:'14px'}} value="only_me">Only Me</MenuItem>
              <MenuItem sx={{fontSize:'14px'}} value="shared">Shared</MenuItem>
            </Select>
          </Stack>
        </Stack>
        <Divider sx={{ width: "100%", mb: 2, mt: 1 }} />
        <ProjectsContainer />
      </Stack>
      <ProjectDetails />
      <ShareModal />
      <CreateProjectModal />
    </Container>
  );
};

export default DashboardSpace;
