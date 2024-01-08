"use client";
import React, { useRef } from "react";
import GrowTransition from "../Utils/Grow";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import {
    Badge,
    IconButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Popover,
    Stack,
    useTheme,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
const CanvasSettingsBtn = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const CanvasSettingsRef = useRef(null);
    const { canvasSettings } = useSelector(selectApp);
    const openCanvasSettings = () => {
        dispatch(
            appSlice.actions.toggleCanvasSettings(Boolean(CanvasSettingsRef?.current))
        );
    };
    return (
        <>
            <IconButton
                size="small"
                color="primary"
                ref={CanvasSettingsRef}
                disableFocusRipple
                onClick={openCanvasSettings}
                sx={{
                    mr: 2,
                }}
            >
                <SettingsOutlinedIcon  fontSize="small"/>
            </IconButton>
            <Popover
                disablePortal
                TransitionComponent={GrowTransition}
                anchorEl={CanvasSettingsRef?.current}
                open={canvasSettings}
                onClose={() => dispatch(appSlice.actions.toggleCanvasSettings(false))}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                PaperProps={{
                    elevation: 1,
                    sx: {
                        p: 1,
                        borderRadius: 3,
                        overflowY: "hidden",
                        zIndex: 100,
                    },
                }}
            >
                <MenuList>
                    <MenuItem
                        sx={{
                            borderRadius: 3,
                            mb: 1,
                            "&:hover": {
                                backgroundColor: `${theme?.palette?.primary?.main}20`,
                            },
                        }}
                    >
                        <ListItemIcon>
                            <LockOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}
                        >
                            Lock Canvas
                        </ListItemText>
                    </MenuItem>
                    <MenuItem
                        sx={{
                            borderRadius: 3,
                            my: 1,
                            "&:hover": {
                                backgroundColor: `${theme?.palette?.primary?.main}20`,
                            },
                        }}
                    >
                        <ListItemIcon>
                            <AutorenewOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}
                        >
                            Refill Canvas
                        </ListItemText>
                    </MenuItem>
                    <MenuItem
                        sx={{
                            borderRadius: 3,
                            my: 1,
                            "&:hover": {
                                backgroundColor: `${theme?.palette?.primary?.main}20`,
                            },
                        }}
                    >
                        <ListItemIcon>
                            <ShareOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}
                        >
                            Share Canvas
                        </ListItemText>
                    </MenuItem>
                    <MenuItem
                        sx={{
                            borderRadius: 3,
                            my: 1,
                            "&:hover": {
                                backgroundColor: `${theme?.palette?.primary?.main}20`,
                            },
                        }}
                    >
                        <ListItemIcon>
                            <RedoOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}
                        >
                            Next Canvas
                        </ListItemText>
                    </MenuItem>
                </MenuList>
            </Popover>
        </>
    );
};

export default CanvasSettingsBtn;
