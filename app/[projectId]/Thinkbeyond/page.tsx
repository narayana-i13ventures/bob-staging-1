"use client";
import Bob from "@/app/components/Bob/Bob";
import Header from "@/app/components/Shared/Header";
import ShareModal from "@/app/components/Shared/ShareModal";
import ThinkbeyondCanvas from "@/app/components/ThinkBeyond/ThinkbeyondCanvas";
import ThinkbeyondMindmap from "@/app/components/ThinkBeyond/ThinkbeyondMindmap";
import ThinkbeyondModal from "@/app/components/ThinkBeyond/ThinkbeyondModal";
import ThinkbeyondNewModal from "@/app/components/ThinkBeyond/ThinkbeyondNewModal";
import ThinkBeyondSettings from "@/app/components/ThinkBeyond/ThinkbeyondSettings";
import { Box, Container, Stack, useTheme } from "@mui/material";
import React from "react";

const Thinkbeyond = () => {
    const theme = useTheme();
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
                {/* <ThinkbeyondMindmap /> */}
                {/* <Bob /> */}
                <ThinkBeyondSettings />
                <ShareModal />
                {/* <ThinkbeyondModal /> */}
                <ThinkbeyondNewModal />
            </Stack>
        </>
    );
};

export default Thinkbeyond;
