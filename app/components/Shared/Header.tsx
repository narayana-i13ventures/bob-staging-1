"use client";
import React from "react";
import Link from "next/link";
import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";
import {
    Avatar,
    Box,
    Container,
    Paper,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
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
                    py: 1,
                    backgroundColor: "#f6f5f4",
                }}
            >
                <Link href={"/"}>
                    <Stack
                        direction={"row"}
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                        spacing={1}
                    >
                        <Avatar
                            sx={{
                                backgroundColor: theme?.palette?.primary?.main,
                                width: 30,
                                height: 30,
                            }}
                        >
                            <MemoryOutlinedIcon sx={{ fontSize: '25px' }} />
                        </Avatar>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            Bob
                        </Typography>
                    </Stack>
                </Link>
                <Box
                    component={"div"}
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}
                >
                    {/* Scope - 2 */}
                    {/* <NotificationBtn /> */}
                    <UserProfileBtn />
                </Box>
            </Container>
        </>
    );
};

export default Header;
