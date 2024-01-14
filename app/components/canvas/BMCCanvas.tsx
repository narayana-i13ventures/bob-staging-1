import React, { useEffect } from "react";
import CanvasCard from "./CanvasCard";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useLazyGetFuture1BMCCanvasQuery } from "@/lib/redux/BMCApi";
import { useParams } from "next/navigation";

const BMCCanvas = () => {
  const { projectId, futureId } = useParams();
  const [GetBMCCanvas, { data: BMCCanvas, isLoading, isError, isSuccess }] =
    useLazyGetFuture1BMCCanvasQuery();
  const future =
    futureId === "Future1"
      ? 1
      : futureId === "Future2"
        ? 2
        : futureId === "Future3"
          ? 3
          : 0;
  useEffect(() => {
    GetBMCCanvas({ projectId, future });
  }, [projectId, futureId, future]);
  const retry = () => {
    GetBMCCanvas({ projectId, future });
  };
  return (
    <>
      {!isLoading && !isError && isSuccess && (
        <Box
          sx={{
            gap: 2,
            flexGrow: 1,
            width: "100%",
            height: "100%",
            display: "grid",
            overflow: "hidden",
            gridTemplateColumns: "repeat(10, 1fr)",
            gridTemplateRows: "repeat(6, 1fr)",
          }}
        >
          <Box sx={{ gridColumn: "span 2", gridRow: "span 4" }}>
            <CanvasCard
              // color={"#F5D6C3"}
              card={BMCCanvas?.find(
                (card: any) => card?.cardName === "Key Partners"
              )}
            />
          </Box>
          <Box sx={{ gridColumn: "span 2", gridRow: "span 4" }}>
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
                  card={BMCCanvas?.find(
                    (card: any) => card?.cardName === "Key Activities"
                  )}
                />
              </Box>
              <Box sx={{ gridColumn: "span 12", gridRow: "span 3" }}>
                <CanvasCard
                  color={"#FFC0B7"}
                  card={BMCCanvas?.find(
                    (card: any) => card?.cardName === "Key Resources"
                  )}
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{ gridColumn: "span 2", gridRow: "span 4" }}>
            <CanvasCard
              color={"#FFDE83"}
              card={BMCCanvas?.find(
                (card: any) => card?.cardName === "Value Propositions"
              )}
            />
          </Box>
          <Box sx={{ gridColumn: "span 2", gridRow: "span 4" }}>
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
                  card={BMCCanvas?.find((card: any) => card?.cardName === 'Customer Relationships')}
                />
              </Box>
              <Box sx={{ gridColumn: "span 12", gridRow: "span 3" }}>
                <CanvasCard
                  color={"#ACE1E1"}
                  card={BMCCanvas?.find((card: any) => card?.cardName === 'Channels')}
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{ gridColumn: "span 2", gridRow: "span 4" }}>
            <CanvasCard
              color={"#BACFF4"}
              card={BMCCanvas?.find((card: any) => card?.cardName === 'Customer Segments')}
            />
          </Box>
          <Box sx={{ gridColumn: "span 5", gridRow: "span 2" }}>
            <CanvasCard
              color={"#FFC2DB"}
              card={BMCCanvas?.find((card: any) => card?.cardName === 'Cost Structure')}
            />
          </Box>
          <Box sx={{ gridColumn: "span 5", gridRow: "span 2" }}>
            <CanvasCard
              color={"#E6CDF4"}
              card={BMCCanvas?.find((card: any) => card?.cardName === 'Revenue Streams')}
            />
          </Box>
        </Box>
      )}
      {isLoading && !isError && !isSuccess && (
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
      {!isLoading && isError && !isSuccess && (
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

export default BMCCanvas;
