"use client";
import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import {
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  CircularProgress,
  DialogActions,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import SlideTransition from "../Utils/Slide";
import SharedUserCard from "./SharedUserCard";
import UserSearch from "../Project/UserSearch";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import {
  useLazyGetProjectByIdQuery,
  useLazyGetSharedUsersProjectQuery,
} from "@/lib/redux/projectApi";

const ShareModal = (props: any) => {
  const dispatch = useDispatch();
  const { ShareOpen } = useSelector(selectApp);
  const [thinkbeyondChecked, setThinkbeyondChecked] = useState([false]);
  const [canvasChecked, setCanvasChecked] = React.useState([false, false]);
  const [status, setStatus] = useState({
    loading: false,
    error: false,
    success: true,
  });
  const [sharedUsers, setSharedUsers] = useState<any>([]);

  const checkProject = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThinkbeyondChecked([event.target.checked]);
    setCanvasChecked([event.target.checked, event.target.checked]);
  };

  const checkThinkbeyond = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCanvasChecked([event.target.checked, event.target.checked]);
  };

  const BMCChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCanvasChecked([event.target.checked, canvasChecked[1]]);
  };

  const CVPChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCanvasChecked([canvasChecked[0], event.target.checked]);
  };

  const canvasChildren = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 6 }}>
      <FormControlLabel
        label="Business Model Canvas"
        control={<Checkbox checked={canvasChecked[0]} onChange={BMCChecked} />}
      />
      <FormControlLabel
        label="Value Proposition Canvas"
        control={<Checkbox checked={canvasChecked[1]} onChange={CVPChecked} />}
      />
    </Box>
  );
  const ThinkbeyondChildren = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <FormControlLabel
        label="Thinkbeyond Canvas"
        control={
          <Checkbox
            indeterminate={canvasChecked[0] !== canvasChecked[1]}
            checked={canvasChecked[0] && canvasChecked[1]}
            onChange={checkThinkbeyond}
          />
        }
      />
    </Box>
  );

  const [
    getShareUsersProject,
    {
      data: shared_users,
      isLoading: loading_shared_users,
      isFetching: fetching_shared_users,
      isError: error_shared_users,
      isSuccess: shared_users_success,
    },
  ] = useLazyGetSharedUsersProjectQuery();

  const [
    getProjectById,
    {
      data: project_data,
      isLoading: loading_project_data,
      isFetching: fetching_project_data,
      isError: error_project_data,
      isSuccess: project_data_success,
    },
  ] = useLazyGetProjectByIdQuery();

  useEffect(() => {
    if (ShareOpen?.data !== "") {
      if (ShareOpen?.type === "project") {
        getShareUsersProject(ShareOpen?.data?.projectId);
      }
      getProjectById(ShareOpen?.data?.projectId);
    }
  }, [ShareOpen]);

  useEffect(() => {
    if (ShareOpen?.data !== "") {
      if (ShareOpen?.type === "project") {
        setStatus({
          loading: fetching_shared_users,
          error: error_shared_users,
          success: shared_users_success,
        });
      }
    }
  }, [
    loading_shared_users,
    fetching_shared_users,
    error_shared_users,
    shared_users_success,
  ]);

  useEffect(() => {
    if (ShareOpen?.data !== "") {
      if (ShareOpen?.type === "project") {
        setSharedUsers(shared_users);
      }
    }
  }, [shared_users]);

  const retry = () => {
    if (ShareOpen?.type === "project" && ShareOpen?.data?.projectId !== "") {
      getShareUsersProject(ShareOpen?.data?.projectId);
      getProjectById(ShareOpen?.data?.projectId);
    }
  };
  const closeProjectShareModal = () => {
    dispatch(
      appSlice.actions.toggleShareModal({ open: false, data: "", type: "" })
    );
  };

  return (
    <>
      <Dialog
        TransitionComponent={SlideTransition}
        keepMounted
        maxWidth={"sm"}
        fullWidth
        disableEscapeKeyDown
        open={ShareOpen?.open}
      >
        <DialogTitle
          component={"div"}
          sx={{
            p: 2,
            display: "flex",
            justifyContent:
              !error_project_data &&
              !fetching_project_data &&
              !status?.loading &&
              !status?.error &&
              status?.success &&
              project_data_success
                ? "space-between"
                : "flex-end",
            alignItems: "center",
          }}
        >
          {!error_project_data &&
            !fetching_project_data &&
            !status?.loading &&
            !status?.error &&
            status?.success &&
            project_data_success && <>{project_data?.project?.project_name}</>}
          <IconButton size="small" onClick={closeProjectShareModal}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ p: 2 }}>
          {!error_project_data &&
            !fetching_project_data &&
            !status?.loading &&
            !status?.error &&
            status?.success &&
            project_data_success && (
              <>
                <UserSearch shared_users={sharedUsers || []} />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Share
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Box component={"div"} sx={{ mb: 2 }}>
                  <FormControlLabel
                    label="Uber for Helocopter"
                    control={
                      <Checkbox
                        checked={
                          canvasChecked[0] &&
                          canvasChecked[1] &&
                          thinkbeyondChecked[0]
                        }
                        indeterminate={
                          thinkbeyondChecked[0] !==
                          (canvasChecked[0] && canvasChecked[1])
                        }
                        onChange={checkProject}
                      />
                    }
                  />
                  {ThinkbeyondChildren}
                  {canvasChildren}
                </Box>
                {sharedUsers?.length > 0 && (
                  <>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      People With Access
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Stack
                      component={"div"}
                      direction={"column"}
                      justifyContent={"flex-start"}
                      alignItems={"flext-start"}
                      sx={{
                        maxHeight: "200px",
                        overflowY: "auto",
                      }}
                    >
                      {sharedUsers?.map((user: any) => {
                        return (
                          <SharedUserCard
                            project_id={ShareOpen?.data?.projectId}
                            key={user?.user_id}
                            deleteUser={true}
                            editRole={false}
                            user={user}
                          />
                        );
                      })}
                    </Stack>
                  </>
                )}
                <Divider sx={{ my: 1 }} />
                <Box
                  component={"div"}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>Anyone with the link</Typography>
                  <FormControl>
                    <Select
                      size="small"
                      id={`global_user_role_${props?.projectId}`}
                      value={"editor"}
                      onChange={() => {}}
                      sx={{
                        p: 0,
                        width: "85px",
                        "& .MuiSelect-select": {
                          p: 1,
                          fontSize: 12,
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderWidth: "1px !important",
                        },
                      }}
                    >
                      <MenuItem value={"editor"}>Editor</MenuItem>
                      <MenuItem value={"viewer"}>Viewer</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </>
            )}
          {!error_project_data &&
            (fetching_project_data || status?.loading) &&
            !status?.error && (
              <Stack
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  with: "100%",
                  height: "50vh",
                }}
              >
                <CircularProgress />
              </Stack>
            )}
          {(error_project_data || status?.error) &&
            !fetching_project_data &&
            !status?.loading &&
            !status?.success &&
            !project_data_success && (
              <Stack
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{ width: "100%", height: "50vh" }}
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
        {!loading_project_data &&
          !error_project_data &&
          !fetching_project_data &&
          !status?.loading &&
          !status?.error &&
          status?.success &&
          project_data_success && (
            <>
              <Divider />
              <DialogActions sx={{ p: 2 }}>
                <Button
                  onClick={closeProjectShareModal}
                  size="small"
                  variant="contained"
                  color="primary"
                >
                  Done
                </Button>
              </DialogActions>
            </>
          )}
      </Dialog>
    </>
  );
};

export default ShareModal;
