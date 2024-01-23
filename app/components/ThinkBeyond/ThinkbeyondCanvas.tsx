"use client";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ThinkbeyondCard from "./ThinkbeyondCard";
import { useLazyGetThinkbeyondCanvasQuery } from "@/lib/redux/ThinkbeyondApi";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import ThinkBeyondSettings from "./ThinkbeyondSettings";
import ShareModal from "../Shared/ShareModal";
import ThinkbeyondNewModal from "./ThinkbeyondNewModal";
import ThinkbeyondActivityModal from "./ThinkbeyondActivityModal";
import { useLazyGetProjectByIdQuery } from "@/lib/redux/projectApi";

const ThinkbeyondCanvas = () => {
  const { projectId } = useParams();
  const { data }: any = useSession();

  const [
    getThinkbeyondCanvas,
    {
      data: ThinkbeyondCanvasCards,
      isLoading: thinkbeyond_canvas_loading,
      isError: thinkbeyond_canvas_error,
      isSuccess: thinkbeyond_canvas_success,
      isFetching: thinkbeyond_canvas_fetching,
    },
  ] = useLazyGetThinkbeyondCanvasQuery();

  const [
    getProjectById,
    {
      data: project_data,
      isLoading: project_data_loading,
      isError: project_data_error,
      isFetching: project_data_fetching,
      isSuccess: project_data_success,
    },
  ] = useLazyGetProjectByIdQuery();

  const [status, setStatus] = useState({
    loading: true,
    error: false,
    success: false,
  });

  useEffect(() => {
    getThinkbeyondCanvas({ projectId, userId: data?.user?.user_id });
    getProjectById({
      projectId: projectId,
      userId: data?.user?.user_id,
    });
  }, [projectId, data?.user?.user_id]);

  useEffect(() => {
    setStatus({
      loading: thinkbeyond_canvas_loading || project_data_loading,
      error: thinkbeyond_canvas_error || project_data_error,
      success: thinkbeyond_canvas_success || project_data_success,
    });
  }, [
    project_data_error,
    project_data_loading,
    project_data_success,
    thinkbeyond_canvas_error,
    thinkbeyond_canvas_loading,
    thinkbeyond_canvas_success,
  ]);

  const retry = () => {
    getThinkbeyondCanvas({ projectId, userId: data?.user?.user_id });
  };

  return (
    <>
      {!status?.loading && status?.success && !status?.error && (
        <Stack
          component={"div"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            p: 2,
            flexGrow: 1,
            width: "100%",
            display: "flex",
            overflow: "hidden",
            backgroundColor: "white",
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              p: 1,
              gap: 1,
              flexGrow: 1,
              width: "70%",
              height: "100%",
              display: "grid",
              overflow: "hidden",
              gridTemplateColumns: "repeat(12, 1fr)",
              gridTemplateRows: "repeat(6, 1fr)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gridColumn: "span 12",
                gridRow: "span 1",
              }}
            >
              <ThinkbeyondCard
                width={"50%"}
                card={ThinkbeyondCanvasCards?.[0]?.change}
              />
            </Box>
            <Box sx={{ gridColumn: "span 12", gridRow: "span 4" }}>
              <Box
                sx={{
                  gap: 1,
                  width: "100%",
                  height: "100%",
                  display: "grid",
                  flexGrow: 1,
                  gridTemplateColumns: "repeat(12, 1fr)",
                  gridTemplateRows: "repeat(6, 1fr)",
                }}
              >
                <Box sx={{ gridColumn: "span 4", gridRow: "span 6" }}>
                  <Box
                    sx={{
                      gap: 1,
                      width: "100%",
                      height: "100%",
                      display: "grid",
                      flexGrow: 1,
                      gridTemplateColumns: "repeat(12, 1fr)",
                      gridTemplateRows: "repeat(6, 1fr)",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gridColumn: "span 12",
                        gridRow: "span 2",
                      }}
                    >
                      <ThinkbeyondCard
                        width={"100%"}
                        cardName={"Future 1"}
                        card={ThinkbeyondCanvasCards?.[0]?.future_1}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gridColumn: "span 12",
                        gridRow: "span 2",
                      }}
                    >
                      <ThinkbeyondCard
                        width={"100%"}
                        cardName={"Future 1 OKR"}
                        card={ThinkbeyondCanvasCards?.[0]?.future_1_okrs}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gridColumn: "span 12",
                        gridRow: "span 2",
                      }}
                    >
                      <ThinkbeyondCard
                        width={"100%"}
                        cardName={"Microframeworks"}
                        card={ThinkbeyondCanvasCards?.[0]?.future_1_mfs}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ gridColumn: "span 4", gridRow: "span 6" }}>
                  <Box
                    sx={{
                      gap: 1,
                      width: "100%",
                      height: "100%",
                      display: "grid",
                      flexGrow: 1,
                      gridTemplateColumns: "repeat(12, 1fr)",
                      gridTemplateRows: "repeat(6, 1fr)",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gridColumn: "span 12",
                        gridRow: "span 2",
                      }}
                    >
                      <ThinkbeyondCard
                        width={"100%"}
                        cardName={"Future 2"}
                        card={ThinkbeyondCanvasCards?.[0]?.future_2}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gridColumn: "span 12",
                        gridRow: "span 2",
                      }}
                    >
                      <ThinkbeyondCard
                        width={"100%"}
                        cardName={"Future 2 OKR"}
                        card={ThinkbeyondCanvasCards?.[0]?.future_2_okrs}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gridColumn: "span 12",
                        gridRow: "span 2",
                      }}
                    >
                      <ThinkbeyondCard
                        width={"100%"}
                        cardName={"Microframeworks"}
                        card={ThinkbeyondCanvasCards?.[0]?.future_2_mfs}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ gridColumn: "span 4", gridRow: "span 6" }}>
                  <Box
                    sx={{
                      gap: 1,
                      width: "100%",
                      height: "100%",
                      display: "grid",
                      flexGrow: 1,
                      gridTemplateColumns: "repeat(12, 1fr)",
                      gridTemplateRows: "repeat(6, 1fr)",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gridColumn: "span 12",
                        gridRow: "span 2",
                      }}
                    >
                      <ThinkbeyondCard
                        width={"100%"}
                        cardName={"Future 3"}
                        card={ThinkbeyondCanvasCards?.[0]?.future_3}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gridColumn: "span 12",
                        gridRow: "span 2",
                      }}
                    >
                      <ThinkbeyondCard
                        width={"100%"}
                        cardName={"Future3 OkR"}
                        card={ThinkbeyondCanvasCards?.[0]?.future_3_okrs}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gridColumn: "span 12",
                        gridRow: "span 2",
                      }}
                    >
                      <ThinkbeyondCard
                        width={"100%"}
                        cardName={"Microframeworks"}
                        card={ThinkbeyondCanvasCards?.[0]?.future_3_mfs}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gridColumn: "span 12",
                gridRow: "span 1",
              }}
            >
              <ThinkbeyondCard
                width={"50%"}
                cardName={"what is the moonshot?"}
                card={ThinkbeyondCanvasCards?.[0]?.moonshot}
              />
            </Box>
          </Box>
          <ShareModal />
          {/* <ThinkBeyondSettings /> */}
          <ThinkbeyondNewModal
            ThinkbeyondCards={ThinkbeyondCanvasCards}
            project={project_data}
          />
          <ThinkbeyondActivityModal />
        </Stack>
      )}
      {status?.loading && !status?.error && (
        <Stack
          component={"div"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            flexGrow: 1,
            width: "100%",
            overflow: "hidden",
          }}
        >
          <CircularProgress />
        </Stack>
      )}
      {status?.error && !status?.success && !status?.loading && (
        <Stack
          component={"div"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            flexGrow: 1,
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Typography variant="body1" sx={{ fontSize: "14px", mb: 4 }}>
            Something went wrong..! Try again
          </Typography>
          <Button variant="contained" onClick={retry}>
            Retry
          </Button>
        </Stack>
      )}
    </>
  );
};

export default ThinkbeyondCanvas;
