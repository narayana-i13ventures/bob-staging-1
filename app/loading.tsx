import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";

import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";
const loading = () => {
    return (
        <Stack
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ minHeight: "100vh" }}
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
                    <MemoryOutlinedIcon fontSize="large" />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Bob
                </Typography>
            </Stack>
            <Typography variant="h6">Loading...</Typography>
        </Stack>
    );
};

export default loading;
