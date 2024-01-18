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
  DialogActions,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import { useSession } from "next-auth/react";
import {
  useNextThinknbeyondCardMutation,
  usePrefillFuture3Mutation,
  useUpdateThinkbeyondCardMutation,
} from "@/lib/redux/ThinkbeyondApi";
import { useParams } from "next/navigation";
import { selectedThinkbeyond } from "@/lib/redux/slices/SelectedSlice";
import { usePrefillFutuer1BMCMutation } from "@/lib/redux/BMCApi";
const ThinkbeyondActivityModal = () => {
  const dispatch = useDispatch();
  const { data }: any = useSession();
  const { projectId } = useParams();
  const { ThinkbeyondActivity }: any = useSelector(selectApp);
  const selectedThinkbeyondCard = useSelector(selectedThinkbeyond);
  const [nextCardTransition, setNextCardTransition] = useState(false);
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
      isError: prefillFuture1ErrorError,
    },
  ] = usePrefillFutuer1BMCMutation();

  useEffect(() => {
    setStatus({
      loading: prefillFuture3ThinkbeyondLoading,
      error: prefillFuture3ThinkbeyondError,
      success: prefillFuture3ThinkbeyondSuccess,
    });
  }, [
    prefillFuture3ThinkbeyondSuccess,
    prefillFuture3ThinkbeyondLoading,
    prefillFuture3ThinkbeyondError,
  ]);

  const closeThinkbeyondActivity = () => {
    dispatch(
      appSlice.actions.toggleThinkbeyondActivity({ open: false, type: "" })
    );
  };

  const goToMicroframeworks = () => {
    setNextCardTransition(true);
    nextThinkbeyondCard({
      projectId,
      cardNumber: selectedThinkbeyondCard?.cardNumber,
      userId: data?.user?.user_id,
    })
      .unwrap()
      .then((response: any) => {
        setNextCardTransition(false);
        dispatch(
          appSlice.actions.toggleBobPrefill({
            loading: true,
            error: false,
            projectId,
            futureId:
              ThinkbeyondActivity?.type === "future1_microframeworks"
                ? "Future1"
                : "",
            userId: data?.user?.user_id,
          })
        );
        dispatch(
          appSlice.actions.toggleThinkbeyondActivity({ open: false, type: "" })
        );
        prefillFuture1BMC({
          userId: data?.user?.user_id,
          projectId,
        })
          .unwrap()
          .then((response: any) => {
            dispatch(
              appSlice.actions.toggleBobPrefill({
                loading: false,
                error: false,
                projectId: '',
                futureId: '',
                userId: '',
              })
            );
          })
          .catch((error: any) => {
            dispatch(
              appSlice.actions.toggleBobPrefill({
                loading: false,
                error: true,
                projectId,
                futureId:
                  ThinkbeyondActivity?.type === "future1_microframeworks"
                    ? "Future1"
                    : "",
                userId: data?.user?.user_id,
              })
            );
          });
      })
      .catch(() => {
        setNextCardTransition(false);
        dispatch(
          appSlice.actions.toggleThinkbeyondActivity({ open: false, type: "" })
        );
        dispatch(
          appSlice.actions.setGlobalSnackBar({
            open: true,
            content: `Error Going to next Card`,
            clossable: true,
          })
        );
      });
  };

  const goToNextFuture = () => {
    prefillFuture3Thinkbeyond({ userId: data?.user?.user_id, projectId })
      .unwrap()
      .then((response: any) => {
        dispatch(
          appSlice.actions.toggleThinkbeyondActivity({ open: false, type: "" })
        );
      })
      .catch((error: any) => {
        dispatch(
          appSlice.actions.toggleThinkbeyondActivity({ open: false, type: "" })
        );
      });
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
        <DialogTitle
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
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ p: 2 }}>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={1}
            sx={{
              width: "100%",
              mb: 2,
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: "25px", color: "black" }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Bob
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            sx={{ width: "100%" }}
          >
            {!nextCardTransition ? (
              <>
                {ThinkbeyondActivity?.type === "future1_microframeworks" &&
                  !status?.loading &&
                  !status?.error && (
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "15px", lineHeight: 1.5 }}
                    >
                      Congratulations..! {data?.user?.name} you have completed{" "}
                      {ThinkbeyondActivity?.type === "future1_microframeworks"
                        ? "Future 1"
                        : ""}{" "}
                      and {ThinkbeyondActivity?.type === "future1_microframeworks"
                        ? "Future 1"
                        : ""}{" "}OKRs, click on Continue to Micro Frameworks
                    </Typography>
                  )}
                {status?.loading && !status?.error && (
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "15px",
                      lineHeight: 1.5,
                      my: 2,
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    Bob is prefilling Future 3
                  </Typography>
                )}
              </>
            ) : (
              <Typography
                variant="body1"
                sx={{
                  fontSize: "15px",
                  lineHeight: 1.5,
                  my: 2,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Bob is Building your Micro Frameworks
              </Typography>
            )}
          </Stack>
        </DialogContent>
        <Divider />
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
          {/* <Button
            disabled={nextCardTransition}
            variant="contained"
            onClick={goToNextFuture}
          >
            Go To{" "}
            {ThinkbeyondActivity?.type === "future1_microframeworks"
              ? "Future 3"
              : ""}
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ThinkbeyondActivityModal;
