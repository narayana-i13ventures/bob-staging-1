"use client";
import React from "react";
// import Bob from "@/app/components/Bob/Bob";
import Header from "@/app/components/Shared/Header";
import ThinkbeyondCanvas from "@/app/components/ThinkBeyond/ThinkbeyondCanvas";
import { Stack } from "@mui/material";

const Thinkbeyond = () => {
  return (
    <>
      <Stack
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        direction={"column"}
        sx={{
          minHeight: "100vh",
          maxHeight: "100vh",
        }}
      >
        <Header />
        <ThinkbeyondCanvas />
      </Stack>
    </>
  );
};

export default Thinkbeyond;
