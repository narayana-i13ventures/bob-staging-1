import React, { useEffect } from "react";
import CanvasCard from "./CanvasCard";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useLazyGetCVPCanvasQuery } from "@/lib/redux/CVPApi";
import { useParams } from "next/navigation";
import CanvasModal from "./CanvasModal";

const CVPCanvas = (props: any) => {
  const { project } = props;
  const { data }: any = useSession();
  const { projectId, futureId } = useParams();
  const [GetCVPCanvas, { data: CVPCanvas, isLoading, isError, isSuccess }] =
    useLazyGetCVPCanvasQuery();
  const future =
    futureId === "Future1"
      ? 1
      : futureId === "Future2"
        ? 2
        : futureId === "Future3"
          ? 3
          : 0;
  useEffect(() => {
    GetCVPCanvas({ projectId, future, userId: data?.user?.user_id });
  }, [projectId, future, data?.user?.user_id]);
  const retry = () => {
    GetCVPCanvas({ projectId, future, userId: data?.user?.user_id });
  };
  return (
    <>
      {!isLoading && !isError && (
        <>
          <Box
            sx={{
              gap: 2,
              flexGrow: 1,
              width: "100%",
              height: "100%",
              display: "grid",
              overflow: "hidden",
              gridTemplateColumns: "repeat(9, 1fr)",
              gridTemplateRows: "repeat(6, 1fr)",
            }}
          >
            <Box sx={{ gridColumn: "span 2", gridRow: "span 6" }}>
              <Box
                sx={{
                  gap: 2,
                  width: "100%",
                  height: "100%",
                  display: "grid",
                  flexGrow: 1,
                  gridTemplateColumns: "repeat(12, 1fr)",
                  gridTemplateRows: "repeat(6, 1fr)",
                }}
              >
                <Box sx={{ gridColumn: "span 12", gridRow: "span 3" }}>
                  <CanvasCard
                    color={"#FFC493"}
                    card={CVPCanvas?.find(
                      (card: any) => card?.cardName === "Customer Gains"
                    )}
                  />
                </Box>
                <Box sx={{ gridColumn: "span 12", gridRow: "span 3" }}>
                  <CanvasCard
                    color={"#FFC0B7"}
                    card={CVPCanvas?.find(
                      (card: any) => card?.cardName === "Customer Pains"
                    )}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ gridColumn: "span 2", gridRow: "span 6" }}>
              <CanvasCard
                color={"#F5D6C3"}
                card={CVPCanvas?.find(
                  (card: any) => card?.cardName === "Customer Jobs"
                )}
              />
            </Box>
            <Box sx={{ gridColumn: "span 1", gridRow: "span 6" }}></Box>
            <Box sx={{ gridColumn: "span 2", gridRow: "span 6" }}>
              <CanvasCard
                color={"#BACFF4"}
                card={CVPCanvas?.find(
                  (card: any) => card?.cardName === "Products & Services"
                )}
              />
            </Box>
            <Box sx={{ gridColumn: "span 2", gridRow: "span 6" }}>
              <Box
                sx={{
                  gap: 2,
                  width: "100%",
                  height: "100%",
                  display: "grid",
                  flexGrow: 1,
                  gridTemplateColumns: "repeat(12, 1fr)",
                  gridTemplateRows: "repeat(6, 1fr)",
                }}
              >
                <Box sx={{ gridColumn: "span 12", gridRow: "span 3" }}>
                  <CanvasCard
                    color={"#B7E6CC"}
                    card={CVPCanvas?.find(
                      (card: any) => card?.cardName === "Pain Relievers"
                    )}
                  />
                </Box>
                <Box sx={{ gridColumn: "span 12", gridRow: "span 3" }}>
                  <CanvasCard
                    color={"#ACE1E1"}
                    card={CVPCanvas?.find(
                      (card: any) => card?.cardName === "Gain Creators"
                    )}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <CanvasModal project={project} canvas={CVPCanvas} />
        </>
      )}
      {isLoading && !isError && (
        <Stack
          flexGrow={1}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <CircularProgress />
        </Stack>
      )}
      {!isLoading && isError && (
        <Stack
          flexGrow={1}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            width: "100%",
            height: "100%",
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

export default CVPCanvas;
