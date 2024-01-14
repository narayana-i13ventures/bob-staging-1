"use client";
import React from "react";
import { List, ListItemButton, useTheme, Card } from "@mui/material";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupsIcon from '@mui/icons-material/Groups';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
const ProfileMenu = () => {
    const theme: any = useTheme();
    const dispatch = useDispatch();
    const { activeProfileTab } = useSelector(selectApp);

    const handleProfileMenuChange = (menuItem: any) => {
        dispatch(appSlice.actions.toggleActiveProfileTab(menuItem));
    };
    return (
        <Card className="sticky top-[70px] flex min-w-[250px] w-[250px] flex-col justify-start items-start p-3 rounded-md shadow-md">
            <List
                component="nav"
                aria-label="main mailbox folders"
                className="w-full"
            >
                <ListItemButton
                    sx={{
                        "&.Mui-selected , &:hover.Mui-selected": {
                            backgroundColor: theme.palette.primary.main,
                            color: "white",
                        },
                    }}
                    className="!rounded-md !my-4"
                    selected={activeProfileTab === "profile"}
                    onClick={(event) => handleProfileMenuChange("profile")}
                >
                    <p className="!font-semibold flex items-center">
                        <PersonIcon className="mr-3" />
                        Profile
                    </p>
                </ListItemButton>
                <ListItemButton
                    sx={{
                        "&.Mui-selected , &:hover.Mui-selected": {
                            backgroundColor: theme.palette.primary.main,
                            color: "white",
                        },
                    }}
                    className="!rounded-md !my-4"
                    selected={activeProfileTab === "settings"}
                    onClick={(event) => handleProfileMenuChange("settings")}
                >
                    <p className="!font-semibold flex items-center">
                        <SettingsIcon className="mr-3" />
                        Settings
                    </p>
                </ListItemButton>
                <ListItemButton
                    sx={{
                        "&.Mui-selected , &:hover.Mui-selected": {
                            backgroundColor: theme.palette.primary.main,
                            color: "white",
                        },
                    }}
                    className="!rounded-md !my-4"
                    selected={activeProfileTab === "teams"}
                    onClick={(event) => handleProfileMenuChange("teams")}
                >
                    <p className="!font-semibold flex items-center">
                        <GroupsIcon className="mr-3" />
                        Teams
                    </p>
                </ListItemButton>
                <ListItemButton
                    sx={{
                        "&.Mui-selected , &:hover.Mui-selected": {
                            backgroundColor: theme.palette.primary.main,
                            color: "white",
                        },
                    }}
                    className="!rounded-md !my-4"
                    selected={activeProfileTab === "payments"}
                    onClick={(event) => handleProfileMenuChange("payments")}
                >
                    <p className="!font-semibold flex items-center">
                        <CreditCardIcon className="mr-3" />
                        Payments
                    </p>
                </ListItemButton>
                <ListItemButton
                    sx={{
                        "&.Mui-selected , &:hover.Mui-selected": {
                            backgroundColor: theme.palette.primary.main,
                            color: "white",
                        },
                    }}
                    className="!rounded-md !my-4"
                    selected={activeProfileTab === "subscriptions"}
                    onClick={(event) => handleProfileMenuChange("subscriptions")}
                >
                    <p className="!font-semibold flex items-center">
                        <VerifiedUserIcon className="mr-3" />
                        Subscriptions
                    </p>
                </ListItemButton>
            </List>
        </Card>
    );
};

export default ProfileMenu;
