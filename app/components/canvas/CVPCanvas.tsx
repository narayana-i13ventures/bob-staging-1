import React from "react";
import CanvasCard from "./CanvasCard";
import { Box } from "@mui/material";

const CVPCanvas = () => {
  return (
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
            <CanvasCard color={"#FFC493"} card={{ card_name: 'Client Gains' }} />
          </Box>
          <Box sx={{ gridColumn: "span 12", gridRow: "span 3" }}>
            <CanvasCard color={"#FFC0B7"} card={{ card_name: 'Client Pains' }} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ gridColumn: "span 2", gridRow: "span 6" }}>
        <CanvasCard color={"#F5D6C3"} card={{ card_name: 'Client Jobs' }} />
      </Box>
      <Box sx={{ gridColumn: "span 1", gridRow: "span 6" }}>
      </Box>
      <Box sx={{ gridColumn: "span 2", gridRow: "span 6" }}>
        <CanvasCard color={"#BACFF4"} card={{ card_name: 'Products & Serveices' }} />
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
            <CanvasCard color={"#B7E6CC"} card={{ card_name: 'Gain Creators' }} />
          </Box>
          <Box sx={{ gridColumn: "span 12", gridRow: "span 3" }}>
            <CanvasCard color={"#ACE1E1"} card={{ card_name: 'Pain Relievers' }} />
          </Box>
        </Box>
      </Box>

    </Box>
  );
};

export default CVPCanvas;
