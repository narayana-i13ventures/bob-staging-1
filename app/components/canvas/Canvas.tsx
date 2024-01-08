"use client";
import React from "react";
import BMCCanvas from "./BMCCanvas";
import CVPCanvas from "./CVPCanvas";
import CanvasModal from "./CanvasModal";
import Dialog from "@mui/material/Dialog";
import { useRouter } from "next/navigation";
import SlideTransition from "../Utils/Slide";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import CanvasSettingsBtn from "./CanvasSettingsBtn";
import DialogContent from "@mui/material/DialogContent";
import { Divider, IconButton, Stack, Typography } from "@mui/material";
import CanvasRoadmapBtn from "./CanvasRoadmapBtn";

const Canvas = (props: any) => {
  const { canvasName } = props;
  const router = useRouter();

  const closeCanvas = () => {
    router.replace("Microframeworks", undefined);
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
            py:1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: '#00000010'
          }}
        >
          <Typography variant="h6">Business Model Canvas</Typography>

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            spacing={2}
          >
            <CanvasRoadmapBtn canvasName={canvasName} />
            <CanvasSettingsBtn />
            <IconButton size="small" onClick={closeCanvas}>
              <CloseIcon />
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
          }}
        >
          {canvasName === "BMC" ? <BMCCanvas /> : <CVPCanvas />}
        </DialogContent>
      </Dialog>
      <CanvasModal />
    </>
  );
};

export default Canvas;
