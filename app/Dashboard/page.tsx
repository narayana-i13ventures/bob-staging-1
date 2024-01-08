'use client';
import React from "react";
import { Box, useTheme } from "@mui/material";
import DashboardSpace from "../components/Dashboard/DashboardSpace";
import Header from "../components/Shared/Header";

const Dashboard = () => {
    const theme = useTheme();
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexDirection: 'column',
                    minHeight: "100vh",
                    maxHeight: "100vh",
                    backgroundColor: `${theme?.palette?.primary?.main}20`,
                }}
            >
                <Header />
                <DashboardSpace />
            </Box>
        </>
    );
};

export default Dashboard;

// export const metadata = {
//     title: "Bob - Dashboard",
// };
