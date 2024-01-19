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
import React from "react";

const Microframeworks = () => {
  const theme = useTheme();
  const { projectId, futureId } = useParams();
  const { data }: any = useSession();
  const dispatch = useDispatch();
  const { bobPrefill }:any = useSelector(selectApp);
  const [prefillFuture1BMC] = usePrefillFutuer1BMCMutation();
  
  const [
    getAllCanvas,
    {
      data: canvas_data,
      isLoading: canvas_data_loading,
      isError: canvas_data_error,
    },
  ] = useLazyGetAllCanvasQuery();
  
  const retry = () => {
    dispatch(
      appSlice.actions.toggleBobPrefill({
        loading: true,
        error: false,
        projectId,
        futureId: futureId,
        userId: data?.user?.user_id,
      })
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
            projectId,
            futureId: futureId,
            userId: data?.user?.user_id,
          })
        );
      })
      .catch((error: any) => {
        dispatch(
          appSlice.actions.toggleBobPrefill({
            loading: false,
            error: true,
            projectId,
            futureId: futureId,
            userId: data?.user?.user_id,
          })
        );
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
              <Link href={`/${projectId}/Thinkbeyond`}><ArrowBackIcon /></Link>
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
            {bobPrefill?.loading && !bobPrefill?.error && (
              <>
                {projectId === bobPrefill?.projectId &&
                  data?.user?.user_id === bobPrefill?.userId &&
                  futureId === futureId ? (
                  <>
                    <Stack
                      direction={"column"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      spacing={4}
                      sx={{ pt: 4 }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          lineHeight: 1.5,
                          mb: 3,
                          width: "100%",
                          textAlign: "center",
                          fontWeight: 600,
                        }}
                      >
                        Bob is Building your Micro Frameworks
                      </Typography>
                      <CircularProgress />
                    </Stack>
                  </>
                ) : (
                  <>
                    <Stack
                      direction={"row"}
                      alignItems={"flex-start"}
                      justifyContent={"flex-start"}
                      spacing={4}
                      sx={{ py: 1 }}
                    >
                      <MicroframeworkCard
                        route={"BMC"}
                        name={"Business Model Canvas"}
                        locked={false}
                      />
                      <MicroframeworkCard
                        route={"CVP"}
                        name={"Value Proposition Canvas"}
                        locked={true}
                      />
                    </Stack>
                  </>
                )}
              </>
            )}
            {!bobPrefill?.loading && bobPrefill?.error && (
              <>
                {projectId === bobPrefill?.projectId &&
                  data?.user?.user_id === bobPrefill?.userId &&
                  futureId === futureId ? (
                  <>
                    <Stack
                      direction={"column"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{ width: "100%" }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "14px", mb: 4 }}
                      >
                        Something went wrong..! Try again
                      </Typography>
                      <Button variant="contained" onClick={retry}>
                        Retry
                      </Button>
                    </Stack>
                  </>
                ) : (
                  <>
                    <Stack
                      direction={"row"}
                      alignItems={"flex-start"}
                      justifyContent={"flex-start"}
                      spacing={4}
                      sx={{ py: 1 }}
                    >
                      <MicroframeworkCard
                        route={"BMC"}
                        name={"Business Model Canvas"}
                      />
                      <MicroframeworkCard
                        route={"CVP"}
                        name={"Value Proposition Canvas"}
                      />
                    </Stack>
                  </>
                )}
              </>
            )}
            {!bobPrefill?.loading && !bobPrefill?.error && (
              <Stack
                direction={"row"}
                alignItems={"flex-start"}
                justifyContent={"flex-start"}
                spacing={4}
                sx={{ py: 1 }}
              >
                <MicroframeworkCard
                  route={"BMC"}
                  name={"Business Model Canvas"}
                  locked={false}
                />
                <MicroframeworkCard
                  route={"CVP"}
                  name={"Value Proposition Canvas"}
                  locked={true}
                />
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
