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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import TuneSharpIcon from '@mui/icons-material/TuneSharp';
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
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
    const openCanvasShare = () => {
        dispatch(appSlice.actions.toggleCanvasSettings(false));
        dispatch(appSlice.actions.toggleShareModal({ open: true, data: { name: 'Value Proposition Canvas' }, type: 'cvp' }))
    }
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
                <TuneSharpIcon fontSize="small" />
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
                        mt: 1,
                        zIndex: 100,
                        borderRadius: 2,
                        overflowY: "hidden",
                        backgroundColor: "#fff",
                    },
                }}
            >
                <MenuList>
                    <MenuItem
                        sx={{
                            borderRadius: 2,
                            mb: 1,
                            "&:hover": {
                                backgroundColor: `#f6f5f4`,
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
                            borderRadius: 2,
                            mb: 1,
                            "&:hover": {
                                backgroundColor: `#f6f5f4`,
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
                    {/* <MenuItem
                        onClick={openCanvasShare}
                        sx={{
                            borderRadius: 2,
                            mb: 1,
                            "&:hover": {
                                backgroundColor: `#f6f5f4`,
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
                    </MenuItem> */}
                    <MenuItem
                        sx={{
                            borderRadius: 2,
                            mb: 1,
                            "&:hover": {
                                backgroundColor: `#f6f5f4`,
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
