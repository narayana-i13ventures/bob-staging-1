"use client";
import React from "react";
import { Box, Container, Stack, useTheme } from "@mui/material";
import DashboardSpace from "../components/Dashboard/DashboardSpace";
import Header from "../components/Shared/Header";

const Dashboard = () => {
    const theme = useTheme();
    return (
        <>
            <Stack
                direction={"column"}
                alignItems={"flex-start"}
                justifyContent={"flex-start"}
                sx={{
                    minHeight: "100vh",
                    maxHeight: "100vh",
                }}
            >
                <Header />
                <DashboardSpace />
            </Stack>
        </>
    );
};

export default Dashboard;

// export const metadata = {
//     title: "Bob - Dashboard",
// };
