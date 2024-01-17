"use client";
import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import {
  Box,
  Button,
  IconButton,
  CircularProgress,
  DialogActions,
  Divider,
  FormControl,
  FormControlLabel,
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
import UserSearch from "./UserSearch";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import {
  useLazyGetAllCanvasQuery,
  useLazyGetProjectByIdQuery,
  useLazyGetSharedUsersProjectQuery,
} from "@/lib/redux/projectApi";
import { useSession } from "next-auth/react";
import { useLazyGetThinkbeyondSharedUsersQuery } from "@/lib/redux/ThinkbeyondApi";
const ShareModal = (props: any) => {
  const dispatch = useDispatch();
  const { data }: any = useSession();
  const { ShareOpen }: any = useSelector(selectApp);

  const [status, setStatus] = useState({
    loading: false,
    error: false,
    success: true,
  });
  const [sharedUsers, setSharedUsers] = useState<any>([]);

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

  // const [
  //   getThinkbeyondSharedUsers,
  //   {
  //     data: thinkbeyond_shared_users,
  //     isLoading: thinkbeyond_loading_shared_users,
  //     isFetching: thinkbeyond_fetching_shared_users,
  //     isError: thinkbeyond_error_shared_users,
  //     isSuccess: thinkbeyond_shared_users_success,
  //   },
  // ] = useLazyGetThinkbeyondSharedUsersQuery();

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
    if (ShareOpen?.data !== "" && ShareOpen?.open) {
      getShareUsersProject({
        projectId: ShareOpen?.data?.projectId,
        userId: data?.user?.user_id,
      });
      // if (ShareOpen?.type === "project") {
      // }
      // if (ShareOpen?.type === "thinkbeyond") {
      //   getThinkbeyondSharedUsers({
      //     projectId: ShareOpen?.data?.projectId,
      //     userId: data?.user?.user_id,
      //   });
      // }
      getProjectById({
        projectId: ShareOpen?.data?.projectId,
        userId: data?.user?.user_id,
      });
    }
  }, [ShareOpen?.data?.projectId, data?.user?.user_id, ShareOpen?.open]);

  useEffect(() => {
    if (ShareOpen?.data !== "") {
      setSharedUsers(shared_users);
      // if (ShareOpen?.type === "project") {
      // }
      // if (ShareOpen?.type === "thinkbeyond") {
      //   setSharedUsers(thinkbeyond_shared_users);
      // }
    }
  }, [
    shared_users,
    loading_shared_users,
    fetching_shared_users,
    error_shared_users,
    shared_users_success,
    // thinkbeyond_shared_users,
    // thinkbeyond_loading_shared_users,
    // thinkbeyond_fetching_shared_users,
    // thinkbeyond_error_shared_users,
    // thinkbeyond_shared_users_success,
  ]);

  useEffect(() => {
    if (ShareOpen?.data !== "") {
      setStatus({
        loading: fetching_shared_users,
        error: error_shared_users,
        success: shared_users_success,
      });
      // if (ShareOpen?.type === "project") {
      // }
      // if (ShareOpen?.type === "thinkbeyond") {
      //   setStatus({
      //     loading: thinkbeyond_fetching_shared_users,
      //     error: thinkbeyond_error_shared_users,
      //     success: thinkbeyond_shared_users_success,
      //   });
      // }
    }
  }, [
    loading_shared_users,
    fetching_shared_users,
    error_shared_users,
    shared_users_success,
    // thinkbeyond_fetching_shared_users,
    // thinkbeyond_error_shared_users,
    // thinkbeyond_shared_users_success,
  ]);

  const retry = () => {
    if (
      // ShareOpen?.type === "project" &&
      ShareOpen?.data?.projectId !== ""
    ) {
      getShareUsersProject({
        projectId: ShareOpen?.data?.projectId,
        userId: data?.user?.user_id,
      });
      getProjectById({
        projectId: ShareOpen?.data?.projectId,
        userId: data?.user?.user_id,
      });
    }
    // if (
    //   ShareOpen?.type === "thinkbeyond" &&
    //   ShareOpen?.data?.projectId !== ""
    // ) {
    //   getThinkbeyondSharedUsers({
    //     projectId: ShareOpen?.data?.projectId,
    //     userId: data?.user?.user_id,
    //   });
    //   getProjectById({
    //     projectId: ShareOpen?.data?.projectId,
    //     userId: data?.user?.user_id,
    //   });
    // }
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
          {!status?.loading &&
            !status?.error &&
            status?.success &&
            !error_project_data &&
            !fetching_project_data &&
            project_data_success && (
              <>
                <UserSearch
                  shared_users={sharedUsers || []}
                  type={ShareOpen?.type}
                  project_data={project_data}
                  metadata={ShareOpen?.data}
                />

                {sharedUsers?.length > 0 && (
                  <>
                    <Typography variant="body1" sx={{ fontWeight: 600, mt: 2 }}>
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
                            key={user?.user_id}
                            deleteUser={true}
                            editRole={false}
                            user={user}
                            type={ShareOpen?.type}
                            metadata={ShareOpen?.data}
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
                      value={"Commenter"}
                      onChange={() => { }}
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
                      <MenuItem value={"Commenter"}>Commenter</MenuItem>
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
            !status?.loading && (
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
