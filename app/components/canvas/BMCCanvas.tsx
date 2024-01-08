import React from "react";
import CanvasCard from "./CanvasCard";
import { Box } from "@mui/material";

const BMCCanvas = () => {
  return (
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
        <CanvasCard color={"#F5D6C3"} card={{ card_name: 'Key Partners' }} />
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
            <CanvasCard color={"#FFC493"} card={{ card_name: 'Key Activities' }} />
          </Box>
          <Box sx={{ gridColumn: "span 12", gridRow: "span 3" }}>
            <CanvasCard color={"#FFC0B7"} card={{ card_name: 'Key Resources' }} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ gridColumn: "span 2", gridRow: "span 4" }}>
        <CanvasCard color={"#FFDE83"} card={{ card_name: 'Value Propositions',selected:true }} />
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
            <CanvasCard color={"#B7E6CC"} card={{ card_name: 'Customer Relations' }} />
          </Box>
          <Box sx={{ gridColumn: "span 12", gridRow: "span 3" }}>
            <CanvasCard color={"#ACE1E1"} card={{ card_name: 'Channels' }} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ gridColumn: "span 2", gridRow: "span 4" }}>
        <CanvasCard color={"#BACFF4"} card={{ card_name: 'Customer Segments' }} />
      </Box>
      <Box sx={{ gridColumn: "span 5", gridRow: "span 2" }}>
        <CanvasCard color={"#FFC2DB"} card={{ card_name: 'Cost Structure' }} />
      </Box>
      <Box sx={{ gridColumn: "span 5", gridRow: "span 2" }}>
        <CanvasCard color={"#E6CDF4"} card={{ card_name: 'Revenue Streams' }} />
      </Box>
    </Box>
  );
};

export default BMCCanvas;
