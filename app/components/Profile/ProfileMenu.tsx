"use client";
import React from "react";
import {
    List,
    ListItemButton,
    useTheme,
    Card,
    Box,
    Typography,
} from "@mui/material";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupsIcon from "@mui/icons-material/Groups";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { SettingsInputComponentTwoTone } from "@mui/icons-material";
const ProfileMenu = () => {
    const theme: any = useTheme();
    const dispatch = useDispatch();
    const { activeProfileTab } = useSelector(selectApp);

    const handleProfileMenuChange = (menuItem: any) => {
        dispatch(appSlice.actions.toggleActiveProfileTab(menuItem));
    };
    return (
        <Box component={"div"}>
            <List sx={{ width: "250px" }}>
                <ListItemButton
                    sx={{
                        mb: 1,
                        borderRadius: 2,
                        "& .MuiTypography-root": {
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        },
                        "&.Mui-selected , &:hover.Mui-selected": {
                            backgroundColor: theme.palette.primary.main,
                            color: "white",
                        },
                    }}
                    selected={activeProfileTab === "profile"}
                    onClick={(event) => handleProfileMenuChange("profile")}
                >
                    <Typography>
                        <PersonIcon sx={{ mr: 2 }} />
                        Profile
                    </Typography>
                </ListItemButton>
                <ListItemButton
                    disabled
                    sx={{
                        mb: 1,
                        borderRadius: 2,
                        "& .MuiTypography-root": {
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        },
                        "&.Mui-selected , &:hover.Mui-selected": {
                            backgroundColor: theme.palette.primary.main,
                            color: "white",
                        },
                    }}
                    selected={activeProfileTab === "settings"}
                    onClick={(event) => handleProfileMenuChange("settings")}
                >
                    <Typography>
                        <SettingsInputComponentTwoTone sx={{ mr: 2 }} />
                        Settings
                    </Typography>
                </ListItemButton>
                <ListItemButton
                    disabled
                    sx={{
                        mb: 1,
                        borderRadius: 2,
                        "& .MuiTypography-root": {
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        },
                        "&.Mui-selected , &:hover.Mui-selected": {
                            backgroundColor: theme.palette.primary.main,
                            color: "white",
                        },
                    }}
                    selected={activeProfileTab === "teams"}
                    onClick={(event) => handleProfileMenuChange("teams")}
                >
                    <Typography>
                        <GroupsIcon sx={{ mr: 2 }} />
                        Teams
                    </Typography>
                </ListItemButton>
                <ListItemButton
                    disabled
                    sx={{
                        mb: 1,
                        borderRadius: 2,
                        "& .MuiTypography-root": {
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        },
                        "&.Mui-selected , &:hover.Mui-selected": {
                            backgroundColor: theme.palette.primary.main,
                            color: "white",
                        },
                    }}
                    selected={activeProfileTab === "payments"}
                    onClick={(event) => handleProfileMenuChange("payments")}
                >
                    <Typography>
                        <CreditCardIcon sx={{ mr: 2 }} />
                        Payments
                    </Typography>
                </ListItemButton>
                <ListItemButton
                    disabled
                    sx={{
                        mb: 1,
                        borderRadius: 2,
                        "& .MuiTypography-root": {
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        },
                        "&.Mui-selected , &:hover.Mui-selected": {
                            backgroundColor: theme.palette.primary.main,
                            color: "white",
                        },
                    }}
                    selected={activeProfileTab === "subscriptions"}
                    onClick={(event) => handleProfileMenuChange("subscriptions")}
                >
                    <Typography>
                        <VerifiedUserIcon sx={{ mr: 2 }} />
                        Subscriptions
                    </Typography>
                </ListItemButton>
            </List>
        </Box>
    );
};

export default ProfileMenu;
