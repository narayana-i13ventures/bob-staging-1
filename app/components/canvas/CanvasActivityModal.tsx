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
import { useParams, useRouter } from "next/navigation";
import {
  usePrefillFutuer1CVPMutation,
  usePrefillFutuer2CVPMutation,
  usePrefillFutuer3CVPMutation,
} from "@/lib/redux/CVPApi";
const CanvasdActivityModal = (props: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { projectId, futureId } = useParams();
  const { data }: any = useSession();
  const { canvasActivity }: any = useSelector(selectApp);
  const [status, setStatus] = useState({
    loading: false,
    error: false,
    success: true,
  });
  const [
    prefillFuture1CVP,
    {
      isLoading: prefill_future1_cvp_loading,
      isError: prefill_future1_cvp_error,
      isSuccess: prefill_future1_cvp_success,
    },
  ] = usePrefillFutuer1CVPMutation();
  const [
    prefillFuture2CVP,
    {
      isLoading: prefill_future2_cvp_loading,
      isError: prefill_future2_cvp_error,
      isSuccess: prefill_future2_cvp_success,
    },
  ] = usePrefillFutuer2CVPMutation();
  const [
    prefillFuture3CVP,
    {
      isLoading: prefill_future3_cvp_loading,
      isError: prefill_future3_cvp_error,
      isSuccess: prefill_future3_cvp_success,
    },
  ] = usePrefillFutuer3CVPMutation();

  useEffect(() => {
    setStatus({
      loading: prefill_future1_cvp_loading || prefill_future2_cvp_loading || prefill_future3_cvp_loading,
      error: prefill_future1_cvp_error || prefill_future2_cvp_error || prefill_future3_cvp_error,
      success: prefill_future1_cvp_success || prefill_future3_cvp_success || prefill_future3_cvp_success,
    });
  }, [
    prefill_future1_cvp_success,
    prefill_future1_cvp_loading,
    prefill_future1_cvp_error,
    prefill_future2_cvp_success,
    prefill_future2_cvp_loading,
    prefill_future2_cvp_error,
    prefill_future3_cvp_success,
    prefill_future3_cvp_loading,
    prefill_future3_cvp_error,
  ]);

  useEffect(() => {
    if (
      prefill_future1_cvp_success ||
      prefill_future2_cvp_success ||
      prefill_future3_cvp_success
    ) {
      dispatch(
        appSlice.actions.setCanvasActivity({ open: false, type: "" })
      );
    }
  }, [
    prefill_future1_cvp_success,
    prefill_future2_cvp_success,
    prefill_future3_cvp_success,
  ]);

  useEffect(() => {
    if (canvasActivity?.open) {
      if (canvasActivity?.type === "cvp" && futureId === "Future1") {
        prefillFuture1CVP({ userId: data?.user?.user_id, projectId });
      }
      if (canvasActivity?.type === "cvp" && futureId === "Future2") {
        prefillFuture2CVP({ userId: data?.user?.user_id, projectId });
      }
      if (canvasActivity?.type === "cvp" && futureId === "Future3") {
        prefillFuture3CVP({ userId: data?.user?.user_id, projectId });
      }
    }
  }, [
    canvasActivity?.open,
    canvasActivity?.type,
    data?.user?.user_id,
    projectId,
    futureId,
  ]);
  useEffect(() => {
    if (prefill_future1_cvp_success) {
      dispatch(appSlice.actions.setCanvasActivity({ open: false, type: "" }));
    }
  }, [prefill_future1_cvp_success]);
  const retry = () => {
    if (canvasActivity?.open) {
      if (
        prefill_future1_cvp_error &&
        canvasActivity?.type === "cvp" &&
        futureId === "Future1"
      ) {
        prefillFuture1CVP({ userId: data?.user?.user_id, projectId });
      }
      if (
        prefill_future2_cvp_error &&
        canvasActivity?.type === "cvp" &&
        futureId === "Future2"
      ) {
        prefillFuture2CVP({ userId: data?.user?.user_id, projectId });
      }
      if (
        prefill_future3_cvp_error &&
        canvasActivity?.type === "cvp" &&
        futureId === "Future3"
      ) {
        prefillFuture3CVP({ userId: data?.user?.user_id, projectId });
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
        open={canvasActivity?.open}
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
          {canvasActivity?.type === "cvp" && (
            <Typography variant="body1">
              Thank you {data?.user?.name} for your inputs. It's time to relax
              while bob works on your Value Proposition Canvas. You will receive
              an email when Bob completes your canvas. Please do not close this
              tab while bob is working on your project.
            </Typography>
          )}
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ mt: 5 }}
          >
            {status?.error && !status?.loading && (
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

export default CanvasdActivityModal;
