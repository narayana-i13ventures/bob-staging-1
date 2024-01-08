"use client";
import MicroframeworkCard from "@/app/components/Microframeworks/MicroframeworkCard";
import Header from "@/app/components/Shared/Header";
import ShareModal from "@/app/components/Shared/ShareModal";
import Canvas from "@/app/components/canvas/Canvas";
import { Divider, Stack, Typography, useTheme } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React from "react";

const Microframeworks = () => {
  const theme = useTheme();
  const params = useSearchParams();


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
            borderRadius: 3,
            width: "100%",
            p: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
            }}
          >
            Microframeworks
          </Typography>
          <Divider sx={{ width: "100%" }} />
          <Stack
            direction={"row"}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
            spacing={4}
            sx={{ py: 2 }}
          >
            <MicroframeworkCard route={'BMC'} name={'Business Model Canvas'} />
            <MicroframeworkCard route={'CVP'} name={'Value Proposition Canvas'} />
          </Stack>
        </Stack>
      </Stack>
      <ShareModal />
      <Canvas canvasName={params?.get('canvas')} />
    </>
  );
};

export default Microframeworks;
