'use client';
import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "@/app/components/Shared/Header";

const Profile = () => {
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
            </Box>
        </>
    );
};

export default Profile;

// export const metadata = {
//     title: "Bob - Dashboard",
// };
