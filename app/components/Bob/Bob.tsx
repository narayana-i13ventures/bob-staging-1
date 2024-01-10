"use client";
import MessageBox from "./MessageBox";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import { IconButton, Stack, Tooltip, useTheme } from "@mui/material";
import AutoAwesomeSharpIcon from '@mui/icons-material/AutoAwesomeSharp';

const Bob = () => {
    const theme = useTheme();
    const controls = useAnimation();
    const dispatch = useDispatch();
    const {
        BobOpen,
        BobMessages,
        ThinkbeyondModalOpen,
    } = useSelector(selectApp);

    useEffect(() => {
        controls.start(BobOpen ? "open" : "closed");
    }, [BobOpen, controls]);

    const OpenBob = () => {
        dispatch(appSlice.actions.toggleBobOpen(!BobOpen));
    };

    const handleSendMessage = (message: any) => {
        console.log(message);
    };

    const messageBoxVariants = {
        open: {
            y: 0,
            x: 0,
            scale: 1,
            display: "block",
            opacity: 1,
            originX: 1,
            originY: 1,
            transition: {
                duration: 0.1,
                ease: "easeOut",
            },
        },
        closed: {
            y: 40,
            x: -30,
            scale: 0,
            display: "none",
            opacity: 0,
            originX: 1,
            originY: 1,
            transition: {
                duration: 0.1,
                ease: "easeOut",
            },
        },
    };

    return (
        <Stack
            direction={"column"}
            justifyContent={"flex-end"}
            alignItems={"flex-end"}
            component={"div"}
            sx={{
                position: "absolute",
                bottom: 20,
                right: 20,
                zIndex: ThinkbeyondModalOpen ? 10000 : 1,
            }}
        >
            <motion.div
                className={`mb-4`}
                initial="closed"
                animate={controls}
                variants={messageBoxVariants}
            >
                <MessageBox
                    sendMessage={handleSendMessage}
                    height={500}
                    header={true}
                    messages={BobMessages}
                />
            </motion.div>
            <Tooltip title={`${!BobOpen ? "Bob" : ""}`} placement="top" arrow>
                <IconButton
                    size="large"
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        "&:hover": {
                            backgroundColor: theme.palette.primary.main,
                        },
                        p: 1
                    }}
                    onClick={OpenBob}
                >
                    <AutoAwesomeSharpIcon sx={{ color: "white", fontSize: '27px' }} />
                </IconButton>
            </Tooltip>
        </Stack>
    );
};

export default Bob;
