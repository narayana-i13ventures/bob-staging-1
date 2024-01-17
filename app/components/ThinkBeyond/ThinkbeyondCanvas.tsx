"use client";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import ThinkbeyondCard from "./ThinkbeyondCard";
import { useLazyGetThinkbeyondCanvasQuery } from "@/lib/redux/ThinkbeyondApi";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import ThinkBeyondSettings from "./ThinkbeyondSettings";
import ShareModal from "../Shared/ShareModal";
import ThinkbeyondNewModal from "./ThinkbeyondNewModal";
import ThinkbeyondActivityModal from "./ThinkbeyondActivityModal";

const ThinkbeyondCanvas = () => {
  const { data }: any = useSession();
  const { projectId } = useParams();
  const [
    getThinkbeyondCanvas,
    { data: ThinkbeyondCanvasCards, isLoading, isError, isSuccess, isFetching },
  ] = useLazyGetThinkbeyondCanvasQuery();

  useEffect(() => {
    getThinkbeyondCanvas({ projectId, userId: data?.user?.user_id });
  }, [projectId]);

  const retry = () => {
    getThinkbeyondCanvas({ projectId, userId: data?.user?.user_id });
  };

  return (
    <>
      {!isError && isSuccess && !isFetching && (
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
          <ThinkbeyondNewModal ThinkbeyondCards={ThinkbeyondCanvasCards} />
          <ThinkbeyondActivityModal />
        </Stack>
      )}
      {isFetching && !isError && (
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
      {isError && !isSuccess && !isFetching && (
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
