"use client";
import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import SlideTransition from "../Utils/Slide";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import { useSession } from "next-auth/react";
import {
  usePrefillFuture2Mutation,
  usePrefillFuture3Mutation,
} from "@/lib/redux/ThinkbeyondApi";
import { useParams } from "next/navigation";
import {
  usePrefillFutuer1BMCMutation,
  usePrefillFutuer2BMCMutation,
  usePrefillFutuer3BMCMutation,
} from "@/lib/redux/BMCApi";
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
    prefillFuture3Thinkbeyond,
    {
      isSuccess: prefill_future3_thinkbeyond_success,
      isLoading: prefill_future3_thinkbeyond_loading,
      isError: prefill_future3_thinkbeyond_error,
    },
  ] = usePrefillFuture3Mutation();
  const [
    prefillFuture2Thinkbeyond,
    {
      isSuccess: prefill_future2_thinkbeyond_success,
      isLoading: prefill_future2_thinkbeyond_loading,
      isError: prefill_future2_thinkbeyond_error,
    },
  ] = usePrefillFuture2Mutation();

  const [
    prefillFuture1BMC,
    {
      isSuccess: prefill_future1_bmc_success,
      isLoading: prefill_future1_bmc_loading,
      isError: prefill_future1_bmc_error,
    },
  ] = usePrefillFutuer1BMCMutation();
  const [
    prefillFuture2BMC,
    {
      isSuccess: prefill_future2_bmc_success,
      isLoading: prefill_future2_bmc_loading,
      isError: prefill_future2_bmc_error,
    },
  ] = usePrefillFutuer2BMCMutation();
  const [
    prefillFuture3BMC,
    {
      isSuccess: prefill_future3_bmc_success,
      isLoading: prefill_future3_bmc_loading,
      isError: prefill_future3_bmc_error,
    },
  ] = usePrefillFutuer3BMCMutation();

  useEffect(() => {
    setStatus({
      loading:
        prefill_future3_thinkbeyond_loading ||
        prefill_future2_thinkbeyond_loading ||
        prefill_future1_bmc_loading ||
        prefill_future2_bmc_loading ||
        prefill_future3_bmc_loading,
      error:
        prefill_future3_thinkbeyond_error ||
        prefill_future2_thinkbeyond_error ||
        prefill_future1_bmc_error ||
        prefill_future2_bmc_error ||
        prefill_future3_bmc_error,
      success:
        (prefill_future3_thinkbeyond_success && prefill_future1_bmc_success) ||
        (prefill_future3_bmc_success && prefill_future2_thinkbeyond_success) ||
        prefill_future2_bmc_success,
    });
  }, [
    prefill_future3_thinkbeyond_loading,
    prefill_future2_thinkbeyond_loading,
    prefill_future1_bmc_loading,
    prefill_future2_bmc_loading,
    prefill_future3_bmc_loading,
    prefill_future3_thinkbeyond_error,
    prefill_future2_thinkbeyond_error,
    prefill_future1_bmc_error,
    prefill_future2_bmc_error,
    prefill_future3_bmc_error,
    prefill_future3_thinkbeyond_success,
    prefill_future1_bmc_success,
    prefill_future3_bmc_success,
    prefill_future2_thinkbeyond_success,
    prefill_future2_bmc_success,
  ]);

  const closeThinkbeyondActivity = () => {
    // dispatch(
    //   appSlice.actions.toggleThinkbeyondActivity({ open: false, type: "" })
    // );
  };

  useEffect(() => {
    if (prefill_future3_thinkbeyond_success && prefill_future1_bmc_success) {
      dispatch(
        appSlice.actions.toggleThinkbeyondActivity({ open: false, type: "" })
      );
    }
    if (prefill_future2_thinkbeyond_success && prefill_future3_bmc_success) {
      dispatch(
        appSlice.actions.toggleThinkbeyondActivity({ open: false, type: "" })
      );
    }
    if (prefill_future2_bmc_success) {
      dispatch(
        appSlice.actions.toggleThinkbeyondActivity({ open: false, type: "" })
      );
    }
  }, [
    prefill_future3_thinkbeyond_success,
    prefill_future1_bmc_success,
    prefill_future2_thinkbeyond_success,
    prefill_future3_bmc_success,
    prefill_future2_bmc_success,
  ]);

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
    } else if (
      ThinkbeyondActivity?.open &&
      ThinkbeyondActivity?.type === "future2_microframeworks"
    ) {
      prefillFuture2BMC({
        userId: data?.user?.user_id,
        projectId,
      });
    } else if (
      ThinkbeyondActivity?.open &&
      ThinkbeyondActivity?.type === "future3_microframeworks"
    ) {
      prefillFuture3BMC({
        userId: data?.user?.user_id,
        projectId,
      });
      prefillFuture2Thinkbeyond({ userId: data?.user?.user_id, projectId });
    }
  }, [
    projectId,
    data?.user?.user_id,
    ThinkbeyondActivity?.open,
    ThinkbeyondActivity?.type,
  ]);
  const retry = () => {
    if (
      ThinkbeyondActivity?.open &&
      ThinkbeyondActivity?.type === "future1_microframeworks"
    ) {
      if (prefill_future1_bmc_error && prefill_future3_thinkbeyond_error) {
        prefillFuture1BMC({
          userId: data?.user?.user_id,
          projectId,
        });
        prefillFuture3Thinkbeyond({ userId: data?.user?.user_id, projectId });
      }
    }
    if (
      ThinkbeyondActivity?.open &&
      ThinkbeyondActivity?.type === "future3_microframeworks"
    ) {
      if (!prefill_future3_bmc_error && prefill_future2_thinkbeyond_error) {
        prefillFuture3BMC({
          userId: data?.user?.user_id,
          projectId,
        });
        prefillFuture2Thinkbeyond({ userId: data?.user?.user_id, projectId });
      }
    }
    if (
      ThinkbeyondActivity?.open &&
      ThinkbeyondActivity?.type === "future2_microframeworks"
    ) {
      if (prefill_future2_bmc_error) {
        prefillFuture2BMC({
          userId: data?.user?.user_id,
          projectId,
        });
      }
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
          {status?.loading && <CircularProgress size={18} sx={{ mb: 5 }} />}
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
            {!status?.loading && status?.error && (
              <Button onClick={retry} size="small" variant="contained">
                Retry
              </Button>
            )}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ThinkbeyondActivityModal;
