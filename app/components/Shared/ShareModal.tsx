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
import Link from "next/link";

const ShareModal = (props: any) => {
  const dispatch = useDispatch();
  const { ShareOpen } = useSelector(selectApp);
  const [thinkbeyondChecked, setThinkbeyondChecked] = useState([false]);
  const [canvasChecked, setCanvasChecked] = React.useState([false, false]);
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
  console.log(ShareOpen?.type);

  const shareTitle = (
    <>
      {ShareOpen?.type === "project" && (
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="text.primary">Uber for Helicopter</Typography>
        </Breadcrumbs>
      )}
      {ShareOpen?.type === "thinkbeyond" && (
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="text.primary">Uber for Helicopter</Typography>
          <Typography color="text.primary">Thinkbeyond</Typography>
        </Breadcrumbs>
      )}
      {ShareOpen?.type !== "thinkbeyond" && ShareOpen?.type !== "project" && (
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="text.primary">Uber for Helicopter</Typography>
          <Typography color="text.primary">Future1</Typography>
          <Typography color="text.primary">{ShareOpen?.type}</Typography>
        </Breadcrumbs>
      )}
    </>
  );
  const test = {
    isLoading: false,
    isSuccess: true,
    isError: false,
  };

  const [
    getShareUsersProject,
    {
      data: shared_users,
      isLoading: loading_shared_users,
      isFetching: fetching_shared_users,
      isError: error_shared_users,
    },
  ] = useLazyGetSharedUsersProjectQuery();

  const [
    getProjectById,
    {
      data: project_data,
      isLoading: loading_project_data,
      isFetching: fetching_project_data,
      isError: error_project_data,
    },
  ] = useLazyGetProjectByIdQuery();

  useEffect(() => {
    if (ShareOpen?.type === "project" && ShareOpen?.data?.projectId !== "") {
      getShareUsersProject(ShareOpen?.data?.projectId);
      getProjectById(ShareOpen?.data?.projectId);
    }
  }, [ShareOpen]);

  const closeProjectShareModal = () => {
    dispatch(
      appSlice.actions.toggleShareModal({ open: false, data: {}, type: "" })
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
              // !loading_project_data &&
              //   !error_project_data &&
              //   !fetching_project_data &&
              //   !loading_shared_users &&
              //   !fetching_shared_users &&
              //   !error_shared_users
              !test?.isLoading && test?.isSuccess && !test?.isError
                ? "space-between"
                : "flex-end",
            alignItems: "center",
          }}
        >
          {
            // (!loading_project_data &&
            //   !error_project_data &&
            //   !fetching_project_data &&
            //   !loading_shared_users &&
            //   !fetching_shared_users &&
            //   !error_shared_users)
            !test?.isLoading && test?.isSuccess && !test?.isError && shareTitle
          }
          <IconButton size="small" onClick={closeProjectShareModal}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ p: 2 }}>
          {/* // !loading_project_data &&
          //   !error_project_data &&
          //   !fetching_project_data &&
          //   !loading_shared_users &&
          //   !fetching_shared_users &&
          //   !error_shared_users  */}
          {!test?.isLoading && test?.isSuccess && !test?.isError && (
            <>
              <UserSearch shared_users={shared_users || []} />
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
                {shared_users?.length > 0 ? (
                  <>
                    {shared_users?.map((user: any) => {
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
                  </>
                ) : (
                  <>
                    <Typography
                      variant="h5"
                      sx={{
                        width: "100%",
                        textAlign: "center",
                        py: 4,
                        color: "#00000050",
                      }}
                    >
                      No Users have access
                    </Typography>
                  </>
                )}
              </Stack>
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
          {test?.isLoading && !test?.isSuccess && !test?.isError && (
            <Stack
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{
                with: "100%",
                height: "200px",
              }}
            >
              <CircularProgress />
            </Stack>
          )}
          {!test?.isLoading && !test?.isSuccess && test?.isError && (
            <Stack
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              sx={{ width: "100%", height: "200px" }}
            >
              <Typography variant="body1" sx={{ fontSize: "14px", mb: 4 }}>
                Something went wrong..! Try again
              </Typography>
              <Button variant="contained">Retry</Button>
            </Stack>
          )}
        </DialogContent>
        {!test?.isLoading && test?.isSuccess && !test?.isError && (
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
