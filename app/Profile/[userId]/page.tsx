"use client";
import ProfileMenu from "@/app/components/Profile/ProfileMenu";
import ProfileScreenContainer from "@/app/components/Profile/ProfileScreenContainer";
import Header from "@/app/components/Shared/Header";
import { Container, Stack } from "@mui/material";
import React from "react";

const Profile = () => {
  return (
    <>
      <Stack
        direction={"column"}
        justifyContent={"flex-grow"}
        alignItems={"flex-start"}
        sx={{ minHeight: "100vh", maxHeight: "100vh", overflow: "hidden" }}
      >
        <Header />
        <Container maxWidth={"xl"}>
          <Stack
            direction={"row"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            sx={{ mt: 5 }}
          >
            <ProfileMenu />
            <ProfileScreenContainer />
          </Stack>
        </Container>
      </Stack>
    </>
  );
};

export default Profile;
