"use client";
import React from "react";
import Link from "next/link";
import { Box, Container, useTheme } from "@mui/material";
import NotificationBtn from "./NotificationBtn/NotificationBtn";
import UserProfileBtn from "./UserProfileBtn/UserProfileBtn";

const Header = () => {
    const theme = useTheme();
    return (
        <>
            <Container
                maxWidth={"xl"}
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 0.5,
                }}
            >
                <Link href={"/"}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                        }}
                    >
                        <img src={"/images/i13logo.png"} alt="logo" width={200} />
                    </Box>
                </Link>
                <Box
                    component={"div"}
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}
                >
                    <NotificationBtn />
                    <UserProfileBtn />
                </Box>
            </Container>
        </>
    );
};

export default Header;
