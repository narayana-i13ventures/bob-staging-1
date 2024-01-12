"use client";
import React from "react";
import BMCCanvas from "./BMCCanvas";
import CVPCanvas from "./CVPCanvas";
import CanvasModal from "./CanvasModal";
import Dialog from "@mui/material/Dialog";
import { useParams, useRouter } from "next/navigation";
import SlideTransition from "../Utils/Slide";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import CanvasSettingsBtn from "./CanvasSettingsBtn";
import DialogContent from "@mui/material/DialogContent";
import {
  Avatar,
  Breadcrumbs,
  Button,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import CanvasRoadmapBtn from "./CanvasRoadmapBtn";
import ShareModal from "../Shared/ShareModal";
import { appSlice, useDispatch } from "@/lib/redux";
import Link from "next/link";

const Canvas = (props: any) => {
  const { canvasName } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const { projectId, futureId } = useParams();

  const closeCanvas = () => {
    // router.replace("Microframeworks", undefined);
    router.push(`/${projectId}/${futureId}/Microframeworks`);
  };

  const openCanvasShare = () => {
    dispatch(
      appSlice.actions.toggleShareModal({
        open: true,
        data: {},
        type: canvasName,
      })
    );
  };
  
  return (
    <>
      <Dialog
        TransitionComponent={SlideTransition}
        keepMounted
        fullScreen
        fullWidth
        disableEscapeKeyDown
        open={canvasName !== null}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          component={"div"}
          sx={{
            px: 2,
            py: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#f6f5f4",
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link href={`/${projectId}/Thinkbeyond`}>
              <Typography color="text.primary">Uber for Helicopter</Typography>
            </Link>
            <Link href={`/${projectId}/Future1/Microframeworks`}>
              <Typography color="text.primary">Future1</Typography>
            </Link>
            {canvasName === "BMC" && (
              <Typography color="text.primary" sx={{ cursor: 'auto' }}>
                Business Model Canvas
              </Typography>
            )}
            {canvasName === "CVP" && (
              <Typography color="text.primary" sx={{ cursor: 'auto' }}>
                Value Proposition Canvas
              </Typography>
            )}
          </Breadcrumbs>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            spacing={2}
          >
            <Tooltip title="Narayana Lvsaln (me)">
              <Avatar
                sx={{
                  width: 25,
                  height: 25,
                  backgroundColor: "orange",
                  mr: 2,
                  fontSize: "14px",
                }}
              >
                N
              </Avatar>
            </Tooltip>
            <Button variant="contained" size="small" onClick={openCanvasShare}>
              Share
            </Button>
            <CanvasRoadmapBtn canvasName={canvasName} />
            <CanvasSettingsBtn />
            <IconButton size="small" onClick={closeCanvas}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            backgroundColor: "#fff",
          }}
        >
          {canvasName === "BMC" ? <BMCCanvas /> : <CVPCanvas />}
        </DialogContent>
      </Dialog>
      <CanvasModal />
      <ShareModal />
    </>
  );
};

export default Canvas;
