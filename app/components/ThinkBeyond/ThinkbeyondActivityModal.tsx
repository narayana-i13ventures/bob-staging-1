"use client";
import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import SlideTransition from "../Utils/Slide";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import {
  Button,
  CircularProgress,
  DialogActions,
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import { useSession } from "next-auth/react";
import {
  useNextThinknbeyondCardMutation,
  usePrefillFuture3Mutation,
} from "@/lib/redux/ThinkbeyondApi";
import { useParams } from "next/navigation";
import { selectedThinkbeyond } from "@/lib/redux/slices/SelectedSlice";
import { usePrefillFutuer1BMCMutation } from "@/lib/redux/BMCApi";
const ThinkbeyondActivityModal = () => {
  const dispatch = useDispatch();
  const { data }: any = useSession();
  const { projectId } = useParams();
  const { ThinkbeyondActivity }: any = useSelector(selectApp);
  const [status, setStatus] = useState({
    loading: false,
    error: false,
    success: true,
  });
  const [
    nextThinkbeyondCard,
    {
      isLoading: next_card_loading,
      isError: next_card_error,
      isSuccess: next_card_success,
    },
  ] = useNextThinknbeyondCardMutation();

  const [
    prefillFuture3Thinkbeyond,
    {
      isSuccess: prefillFuture3ThinkbeyondSuccess,
      isLoading: prefillFuture3ThinkbeyondLoading,
      isError: prefillFuture3ThinkbeyondError,
    },
  ] = usePrefillFuture3Mutation();

  const [
    prefillFuture1BMC,
    {
      isSuccess: prefillFuture1BMCSuccess,
      isLoading: prefillFuture1BMCLoading,
      isError: prefillFuture1Error,
    },
  ] = usePrefillFutuer1BMCMutation();

  useEffect(() => {
    setStatus({
      loading: prefillFuture3ThinkbeyondLoading || prefillFuture1BMCLoading,
      error: prefillFuture3ThinkbeyondError || prefillFuture1Error,
      success: prefillFuture3ThinkbeyondSuccess && prefillFuture1BMCSuccess,
    });
  }, [
    prefillFuture3ThinkbeyondSuccess,
    prefillFuture3ThinkbeyondLoading,
    prefillFuture3ThinkbeyondError,
    prefillFuture1BMCSuccess,
    prefillFuture1BMCLoading,
    prefillFuture1Error,
  ]);

  const closeThinkbeyondActivity = () => {
    // dispatch(
    //   appSlice.actions.toggleThinkbeyondActivity({ open: false, type: "" })
    // );
  };

  useEffect(() => {
    if (prefillFuture3ThinkbeyondSuccess && prefillFuture1BMCSuccess) {
      dispatch(
        appSlice.actions.toggleThinkbeyondActivity({ open: false, type: "" })
      );
    }
  }, [prefillFuture3ThinkbeyondSuccess, prefillFuture1BMCSuccess]);

  useEffect(() => {
    if (
      ThinkbeyondActivity?.open &&
      ThinkbeyondActivity?.type === "future1_microframeworks"
    ) {
      prefillFuture1BMC({
        userId: data?.user?.user_id,
        projectId,
      });
      prefillFuture3Thinkbeyond({ userId: data?.user?.user_id, projectId });
    }
  }, [
    projectId,
    data?.user?.user_id,
    ThinkbeyondActivity?.open,
    ThinkbeyondActivity?.type,
  ]);

  const retryPrefillBMC = () => {
    if (
      ThinkbeyondActivity?.open &&
      ThinkbeyondActivity?.type === "future1_microframeworks"
    ) {
      prefillFuture1BMC({
        userId: data?.user?.user_id,
        projectId,
      });
    }
  };
  const retryThinkbeyondFuture = () => {
    if (
      ThinkbeyondActivity?.open &&
      ThinkbeyondActivity?.type === "future1_microframeworks"
    ) {
      prefillFuture3Thinkbeyond({ userId: data?.user?.user_id, projectId });
    }
  };
  const fullRetry = () => {
    if (
      ThinkbeyondActivity?.open &&
      ThinkbeyondActivity?.type === "future1_microframeworks"
    ) {
      prefillFuture1BMC({
        userId: data?.user?.user_id,
        projectId,
      });
      prefillFuture3Thinkbeyond({ userId: data?.user?.user_id, projectId });
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
        open={ThinkbeyondActivity?.open}
        // open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            borderRadius: 2,
            backgroundColor: "#fff",
          },
        }}
      >
        {/* <DialogTitle
          component={"div"}
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <IconButton size="small" onClick={closeThinkbeyondActivity}>
            <CloseIcon />
          </IconButton>
        </DialogTitle> */}

        {/* <Divider /> */}
        <DialogContent
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={1}
            sx={{
              width: "100%",
              mb: status?.loading ? 2 : 5,
              mt: 3,
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: "25px", color: "black" }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Bob
            </Typography>
          </Stack>
          <CircularProgress size={18} sx={{ mb: 5 }} />
          <Typography variant="body1">
            Thank you {data?.user?.name} for your inputs. It's time to relax
            while bob works on your project. You will receive an email when Bob
            completes your canvas. Please do not close this tab while bob is
            working on your project.
          </Typography>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ mt: 5 }}
          >
            {prefillFuture1Error &&
              !prefillFuture3ThinkbeyondError &&
              !status?.loading && (
                <Button
                  onClick={retryPrefillBMC}
                  size="small"
                  variant="contained"
                >
                  Retry
                </Button>
              )}

            {!prefillFuture1Error &&
              prefillFuture3ThinkbeyondError &&
              !status?.loading && (
                <Button
                  onClick={retryThinkbeyondFuture}
                  size="small"
                  variant="contained"
                >
                  Retry
                </Button>
              )}
            {prefillFuture1Error &&
              prefillFuture3ThinkbeyondError &&
              !status?.loading && (
                <Button onClick={fullRetry} size="small" variant="contained">
                  Retry
                </Button>
              )}
          </Stack>
        </DialogContent>
        {/* <Divider />
        <DialogActions
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            disabled={nextCardTransition}
            variant="outlined"
            onClick={goToMicroframeworks}
          >
            Continue To{" "}
            {ThinkbeyondActivity?.type === "future1_microframeworks"
              ? "Future 1 Micro Frameworks"
              : ""}
          </Button>
          <Button
            disabled={nextCardTransition}
            variant="contained"
            onClick={goToNextFuture}
          >
            Go To{" "}
            {ThinkbeyondActivity?.type === "future1_microframeworks"
              ? "Future 3"
              : ""}
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
};

export default ThinkbeyondActivityModal;
