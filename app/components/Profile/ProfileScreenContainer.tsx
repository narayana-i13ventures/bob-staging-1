"use client";
import { selectApp, useSelector } from "@/lib/redux";
import React from "react";
import Profile from "./Profile";
import Settings from "./Settings";
import Teams from "./Teams";
import Payments from "./Payments";
import Subscriptions from "./Subscriptions";
import { Box } from "@mui/material";

const ProfileScreenContainer = () => {
    const { activeProfileTab }:any = useSelector(selectApp);
    const profileScreen = () => {
        switch (activeProfileTab) {
            case "profile":
                return <Profile />;
            case "settings":
                return <Settings />;
            case "teams":
                return <Teams />;
            case "payments":
                return <Payments />;
            case "subscriptions":
                return <Subscriptions />;
            default:
                break;
        }
    };
    return (
        <Box
            component={"div"}
            sx={{
                pl: 4,
                overflowY: "auto",
                maxHeight: "calc(100vh - 100px)",
                width: "100%",
            }}
        >
            {profileScreen()}
        </Box>
    );
};

export default ProfileScreenContainer;
