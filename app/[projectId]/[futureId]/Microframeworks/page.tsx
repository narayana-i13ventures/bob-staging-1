"use client";
import MicroframeworkCard from "@/app/components/Microframeworks/MicroframeworkCard";
import Header from "@/app/components/Shared/Header";
import ShareModal from "@/app/components/Shared/ShareModal";
import Canvas from "@/app/components/canvas/Canvas";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import { usePrefillFutuer1BMCMutation } from "@/lib/redux/BMCApi";
import { useLazyGetAllCanvasQuery } from "@/lib/redux/projectApi";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const Microframeworks = () => {
  const theme = useTheme();
  const { data }: any = useSession();
  const { projectId, futureId } = useParams();

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
  }, [projectId, data?.user?.user_id]);

  const retry = () => {
    getAllCanvas({
      userId: data?.user?.user_id,
      projectId: projectId,
    });
  };
  return (
    <>
      <Stack
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        direction={"column"}
        sx={{
          minHeight: "100vh",
          maxHeight: "100vh",
          backgroundColor: `${theme?.palette?.primary?.main}20`,
        }}
      >
        <Header />
        <Stack
          direction={"column"}
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
          sx={{
            flexGrow: 1,
            backgroundColor: "white",
            width: "100%",
            pt: 2,
          }}
        >
          <Container maxWidth={"xl"}>
            <Stack
              direction={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Link href={`/${projectId}/Thinkbeyond`}>
                <ArrowBackIcon />
              </Link>
              <Typography
                variant="h6"
                sx={{
                  ml: 2,
                  fontWeight: 600,
                }}
              >
                Micro Frameworks
              </Typography>
            </Stack>
            <Divider sx={{ width: "100%", mb: 2, mt: 1 }} />
            {!canvas_data_loading && !canvas_data_error && (
              <Stack
                direction={"row"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                sx={{ width: "100%" }}
                spacing={3}
              >
                {canvas_data?.frameworks?.[0]?.canvases
                  ?.filter(
                    (canvas: any) =>
                      canvas.canvas_type === 2 || canvas.canvas_type === 3
                  )
                  ?.map((canvas: any, index: any) => {
                    return <MicroframeworkCard key={index} canvas={canvas} />;
                  })}
              </Stack>
            )}
            {canvas_data_loading && !canvas_data_error && (
              <Stack
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                spacing={4}
                sx={{ pt: 4 }}
              >
                <CircularProgress />
              </Stack>
            )}
            {!canvas_data_loading && canvas_data_error && (
              <Stack
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{ width: "100%" }}
              >
                <Typography variant="body1" sx={{ fontSize: "14px", mb: 4 }}>
                  Something went wrong..! Try again
                </Typography>
                <Button variant="contained" onClick={retry}>
                  Retry
                </Button>
              </Stack>
            )}
          </Container>
        </Stack>
      </Stack>
      <ShareModal />
      {/* <Canvas canvasName={params?.get('canvas')} /> */}
    </>
  );
};

export default Microframeworks;
