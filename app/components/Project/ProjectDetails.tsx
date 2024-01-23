"use client";
import React, { useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  CircularProgress,
  DialogActions,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import SlideTransition from "../Utils/Slide";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useLazyGetProjectByIdQuery } from "@/lib/redux/projectApi";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import { useSession } from "next-auth/react";
const ProjectDetails = () => {
  const dispatch = useDispatch();
  const { data }: any = useSession();
  const { projectDetailsOpen }: any = useSelector(selectApp);

  const [editProjectTitle, setEditProjectTitle] = useState({
    focus: true,
    edit: false,
  });

  const [editProjectDescription, setEditProjectDescription] = useState({
    focus: true,
    edit: false,
  });

  const [
    getProjectById,
    {
      data: project_data,
      isLoading: fetch_project_loading,
      isSuccess: fetch_project_success,
      isError: fetch_project_error,
      isFetching: fetching_project,
    },
  ] = useLazyGetProjectByIdQuery();

  const created_date: any = moment(
    project_data?.project?.created_on,
    "ddd, DD MMM YYYY HH:mm:ss z"
  ).format("DD MMMM, YYYY");

  const modified_date: any = moment(
    project_data?.project?.modified_on,
    "ddd, DD MMM YYYY HH:mm:ss z"
  ).format("DD MMMM, YYYY");

  useEffect(() => {
    if (projectDetailsOpen?.projectId !== "" && projectDetailsOpen?.open) {
      getProjectById(
        {
          projectId: projectDetailsOpen?.projectId,
          userId: data?.user?.user_id,
        }
      );
    }
  }, [projectDetailsOpen?.projectId, data?.user?.user_id]);

  const closeProjectDetails = () => {
    dispatch(
      appSlice.actions.toggleProjectDetails({
        open: false,
        projectId: "",
      })
    );
  };

  const openProjectShare = () => {
    if (project_data?.project?.is_owner) {
      dispatch(
        appSlice.actions.toggleProjectDetails({ open: false, projectId: "" })
      );
      dispatch(
        appSlice.actions.toggleShareModal({
          open: true,
          data: {
            projectId: projectDetailsOpen?.projectId,
          },
          type: "project",
        })
      );
    }
  };

  const retry = () => {
    if (projectDetailsOpen?.projectId !== "" && projectDetailsOpen?.open) {
      getProjectById(
        {
          projectId: projectDetailsOpen?.projectId,
          userId: data?.user?.user_id,
        }
      );
    }
  };
  return (
    <>
      <Dialog
        TransitionComponent={SlideTransition}
        keepMounted
        maxWidth={"sm"}
        fullWidth
        disableEscapeKeyDown
        disablePortal
        open={projectDetailsOpen?.open}
      >
        <DialogTitle
          component={"div"}
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <InfoOutlinedIcon sx={{ mr: 2 }} fontSize="small" />
            Details
          </Typography>
          <IconButton size="small" onClick={closeProjectDetails}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ p: 2 }}>
          {!fetch_project_loading &&
            !fetch_project_error &&
            !fetching_project && (
              <>
                <TextField
                  sx={{
                    pb: 3,
                    "& .Mui-disabled": {
                      color: "#000",
                      WebkitTextFillColor: "#000 !important",
                    },
                  }}
                  focused={editProjectTitle?.focus}
                  id="project_details"
                  placeholder="Enter your project name"
                  variant="standard"
                  size="small"
                  fullWidth
                  disabled={!editProjectTitle?.edit}
                  // value={project_data?.project?.project_name}
                  value={project_data?.project?.project_name}
                  InputProps={
                    {
                      // endAdornment: (
                      //   <InputAdornment position="end">
                      //     <IconButton
                      //       disableFocusRipple
                      //       disableRipple
                      //       disableTouchRipple
                      //       sx={{
                      //         "&:hover": {
                      //           backgroundColor: "transparent",
                      //         },
                      //       }}
                      //       onClick={() => {
                      //         setEditProjectDescription({
                      //           ...editProjectDescription,
                      //           focus: false,
                      //         });
                      //         setEditProjectTitle({ focus: true, edit: true });
                      //       }}
                      //     >
                      //       <EditOutlinedIcon />
                      //     </IconButton>
                      //   </InputAdornment>
                      // ),
                    }
                  }
                />
                {/* <TextField
                sx={{
                  mb: 3,
                  "& .Mui-disabled": {
                    color: "#000",
                    WebkitTextFillColor: "#000 !important",
                  },
                }}
                focused={editProjectDescription?.focus}
                id="project_description"
                placeholder="Enter your project description"
                variant="standard"
                size="small"
                fullWidth
                disabled={!editProjectDescription?.edit}
                value={"This is project description"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        disableFocusRipple
                        disableRipple
                        disableTouchRipple
                        sx={{
                          "&:hover": {
                            backgroundColor: "transparent",
                          },
                        }}
                        onClick={() => {
                          setEditProjectTitle({
                            ...editProjectTitle,
                            focus: false,
                          });
                          setEditProjectDescription({ focus: true, edit: true });
                        }}
                      >
                        <EditOutlinedIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              /> */}
                <Box
                  component={"div"}
                  sx={{
                    mb: 3,
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" sx={{ width: "50%" }}>
                    Owner
                  </Typography>
                  <Typography variant="body2" sx={{ width: "50%" }}>
                    {project_data?.project?.owner?.[0]?.preferred_name}
                  </Typography>
                </Box>
                <Box
                  component={"div"}
                  sx={{
                    mb: 3,
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" sx={{ width: "50%" }}>
                    Team
                  </Typography>
                  <Typography variant="body2" sx={{ width: "50%" }}>
                    I13 Ventures Pvt Ld
                  </Typography>
                </Box>
                <Box
                  component={"div"}
                  sx={{
                    mb: 3,
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" sx={{ width: "50%" }}>
                    Created On
                  </Typography>
                  <Typography variant="body2" sx={{ width: "50%" }}>
                    {created_date}
                  </Typography>
                </Box>
                <Box
                  component={"div"}
                  sx={{
                    mb: 3,
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" sx={{ width: "50%" }}>
                    Last Modified
                  </Typography>
                  <Typography variant="body2" sx={{ width: "50%" }}>
                    {modified_date}
                  </Typography>
                </Box>
                <Box
                  component={"div"}
                  sx={{
                    mb: 3,
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" sx={{ width: "50%" }}>
                    Shared With
                  </Typography>
                  {project_data?.project?.shared_users?.length > 0 ? (
                    <AvatarGroup
                      onClick={openProjectShare}
                      sx={{
                        cursor: "pointer",
                        "& .MuiAvatar-root": {
                          width: 30,
                          height: 30,
                          fontSize: "14px",
                        },
                      }}
                      total={project_data?.project?.shared_users?.length}
                    >
                      {project_data?.project?.shared_users
                        ?.slice(0, 3)
                        .map((user: any) => {
                          return (
                            <Avatar
                              key={user?.user_id}
                              sx={{ backgroundColor: "black" }}
                            >
                              N
                            </Avatar>
                          );
                        })}
                    </AvatarGroup>
                  ) : (
                    <Typography
                      onClick={openProjectShare}
                      variant="body2"
                      component={"div"}
                      sx={{
                        width: "50%",
                        cursor: "pointer",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      None
                    </Typography>
                  )}
                </Box>
              </>
            )}
          {(fetch_project_loading || fetching_project) &&
            !fetch_project_error && (
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{ width: "100%", height: "200px" }}
              >
                <CircularProgress />
              </Stack>
            )}
          {!(fetch_project_loading || fetching_project) &&
            fetch_project_error && (
              <Stack
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{ width: "100%", height: "200px" }}
              >
                <Typography variant="body1" sx={{ fontSize: "14px", mb: 4 }}>
                  Something went wrong..! Try again
                </Typography>
                <Button variant="contained" onClick={retry}>
                  Retry
                </Button>
              </Stack>
            )}
        </DialogContent>
        <Divider />
        {(editProjectDescription?.edit || editProjectTitle?.edit) && (
          <DialogActions sx={{ p: 2 }}>
            <Button
              size="small"
              onClick={() => {
                setEditProjectDescription({ focus: false, edit: false });
                setEditProjectTitle({ focus: false, edit: false });
              }}
              variant="outlined"
              color="primary"
            >
              Cancel
            </Button>
            <Button size="small" variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default ProjectDetails;
