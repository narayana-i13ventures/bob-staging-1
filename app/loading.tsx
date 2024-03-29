'use client';
import { Avatar, CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
const Loading = () => {
    return (
        <Stack
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ minHeight: "100vh", maxHeight: '100vh', overflow: 'hidden' }}
        >
            <Stack
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={2}
                sx={{
                    width: "100%",
                    mt: 2,
                    mb: 4,
                }}
            >
                <Avatar
                    sx={{
                        backgroundColor: "#000",
                        width: 45,
                        height: 45,
                    }}
                >
                    <AutoAwesomeIcon fontSize="medium" />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Bob
                </Typography>
            </Stack>
            <CircularProgress />
            {/* <Typography variant="h6">Loading...</Typography> */}
        </Stack>
    );
};

export default Loading;
