'use client';
import React from "react";
import { Stack } from "@mui/material";
import Header from "../components/Shared/Header";
import DashboardSpace from "../components/Dashboard/DashboardSpace";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  
  return (
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
  );
};

export default Dashboard;

// export const metadata = {
//     title: "Bob - Dashboard",
// };
