"use client";
import React, { useEffect } from "react";
import BMCCanvas from "./BMCCanvas";
import CVPCanvas from "./CVPCanvas";
import Dialog from "@mui/material/Dialog";
import { useParams, useRouter } from "next/navigation";
import SlideTransition from "../Utils/Slide";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
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
import {
  useLazyGetAllCanvasQuery,
  useLazyGetProjectByIdQuery,
} from "@/lib/redux/projectApi";
import { useSession } from "next-auth/react";
import CanvasSettingsBtn from "./CanvasSettingsBtn";
import CanvasdActivityModal from "./CanvasActivityModal";

const Canvas = (props: any) => {
  const router = useRouter();
  const { canvasName } = props;
  const dispatch = useDispatch();
  const { data }: any = useSession();
  const { projectId, futureId } = useParams();
  const currentFuture =
    futureId === "Future1"
      ? 1
      : futureId === "Future2"
        ? 2
        : futureId === "Future3"
          ? 3
          : 0;
  const closeCanvas = () => {
    router.push(`/${projectId}/${futureId}/Microframeworks`);
  };

  const openCanvasShare = () => {
    dispatch(
      appSlice.actions.toggleShareModal({
        open: true,
        data: { projectId, future: currentFuture },
        type: canvasName,
      })
    );
  };

  const [
    getProjectById,
    { data: project_data, isLoading, isSuccess, isFetching, isError },
  ] = useLazyGetProjectByIdQuery();
  const [
    getAllCanvas,
    {
      data: canvas_data,
      isLoading: canvas_data_loading,
      isError: canvas_data_error,
    },
  ] = useLazyGetAllCanvasQuery();

  useEffect(() => {
    getAllCanvas({
      userId: data?.user?.user_id,
      projectId: projectId,
    });
    getProjectById({ projectId, userId: data?.user?.user_id });
  }, [projectId, data?.user?.user_id]);

  const retry = () => {
    getProjectById({ projectId, userId: data?.user?.user_id });
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
          <>
            {isLoading && !isError && <CircularProgress size={20} />}
            {!isLoading && !isError && (
              <Breadcrumbs aria-label="breadcrumb">
                <Link href={`/${projectId}/Thinkbeyond`}>
                  <Typography color="text.primary">
                    {project_data?.project?.project_name}
                  </Typography>
                </Link>
                <Link href={`/${projectId}/Future1/Microframeworks`}>
                  <Typography color="text.primary">
                    {futureId.slice(0, -1)} {currentFuture}
                  </Typography>
                </Link>
                {canvasName === "BMC" && (
                  <Typography color="text.primary" sx={{ cursor: "auto" }}>
                    Business Model Canvas
                  </Typography>
                )}
                {canvasName === "CVP" && (
                  <Typography color="text.primary" sx={{ cursor: "auto" }}>
                    Value Proposition Canvas
                  </Typography>
                )}
              </Breadcrumbs>
            )}
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-end"}
              spacing={2}
            >
              {!isLoading && !isError && (
                <>
                  {/* {project_data?.project?.is_owner && (
                    <Tooltip
                      title={project_data?.project?.owner?.[0]?.preferred_name}
                      arrow
                    >
                      <img
                        referrerPolicy="no-referrer"
                        className="!bg-indigo-500"
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "100%",
                        }}
                        src={data?.user?.image}
                      />
                    </Tooltip>
                  )} */}
                  {project_data?.project?.is_owner && (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={openCanvasShare}
                    >
                      Share
                    </Button>
                  )}
                  <CanvasRoadmapBtn
                    loading={canvas_data_loading}
                    canvasName={canvasName}
                    canvas={canvas_data}
                  />
                  <CanvasSettingsBtn canvas={canvas_data} />
                </>
              )}
              <IconButton size="small" onClick={closeCanvas}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Stack>
          </>
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
          {!isLoading && !isError && (
            <>
              {canvasName === "BMC" ? (
                <BMCCanvas project={project_data} />
              ) : (
                <CVPCanvas project={project_data}/>
              )}
            </>
          )}
          {isLoading && !isError && (
            <Stack
              flexGrow={1}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ width: "100%", height: "100%" }}
            >
              <CircularProgress />
            </Stack>
          )}
          {!isLoading && isError && (
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
      </Dialog>
      <ShareModal />
      <CanvasdActivityModal canvas={canvas_data} />
    </>
  );
};

export default Canvas;
