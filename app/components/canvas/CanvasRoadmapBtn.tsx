"use client";
import React, { useRef } from "react";
import GrowTransition from "../Utils/Grow";
import { useRouter } from "next/navigation";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IconButton, Popover, Stack, Typography, useTheme } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
const CanvasRoadmapBtn = (props: any) => {
    const { canvasName } = props;
    const theme = useTheme();
    const router = useRouter();
    const dispatch = useDispatch();
    const CanvasSettingsRef = useRef(null);
    const { canvasRoadmap } = useSelector(selectApp);

    const openCanvasSettings = () => {
        dispatch(
            appSlice.actions.toggleCanvasRoadmap(Boolean(CanvasSettingsRef?.current))
        );
    };

    const NavigateRoadmap = (event: React.SyntheticEvent, nodeIds: any) => {
        console.log(nodeIds);
        if (nodeIds === "3") {
            router.push("BMC");
            dispatch(appSlice.actions.toggleCanvasRoadmap(false));
        } else if (nodeIds === "4") {
            router.push("CVP");
            dispatch(appSlice.actions.toggleCanvasRoadmap(false));
        }
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
                <AccountTreeOutlinedIcon fontSize="small" />
            </IconButton>
            <Popover
                disablePortal
                TransitionComponent={GrowTransition}
                anchorEl={CanvasSettingsRef?.current}
                open={canvasRoadmap}
                onClose={() => dispatch(appSlice.actions.toggleCanvasRoadmap(false))}
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
                        mt: 1,
                        p: 1,
                        zIndex: 100,
                        width: "260px",
                        borderRadius: 2,
                        overflowY: "hidden",
                        backgroundColor: "#fff",
                    },
                }}
            >
                <TreeView
                    expanded={["1", "2"]}
                    selected={
                        canvasName === "BMC" ? "3" : canvasName === "CVP" ? "4" : ""
                    }
                    onNodeSelect={NavigateRoadmap}
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                >
                    <TreeItem
                        sx={{
                            my: 0.5,
                            "& .MuiTreeItem-label": {
                                fontSize: "13px !important",
                            },
                            "& .MuiTreeItem-content": {
                                py: 1,
                                borderRadius: 2,
                            },
                            "& .Mui-selected": {
                                backgroundColor: `#f6f5f4`,
                            },
                        }}
                        nodeId="1"
                        label="Think Beyond"
                    >
                        <TreeItem
                            sx={{
                                my: 0.5,
                                "& .MuiTreeItem-label": {
                                    fontSize: "13px",
                                },
                                "& .MuiTreeItem-content": {
                                    py: 1,
                                    borderRadius: 2,
                                },
                                "& .Mui-selected": {
                                    backgroundColor: `#f6f5f4`,
                                },
                            }}
                            nodeId="2"
                            label="Microframeworks"
                        >
                            <TreeItem
                                sx={{
                                    my: 0.5,
                                    "& .MuiTreeItem-label": {
                                        fontSize: "13px",
                                    },
                                    "& .MuiTreeItem-content": {
                                        py: 1,
                                        borderRadius: 2,
                                    },
                                    "& .Mui-selected": {
                                        backgroundColor: `#f6f5f4`,
                                    },
                                }}
                                nodeId="3"
                                label="Business Model Canvas"
                            />
                            <TreeItem
                                sx={{
                                    my: 0.5,
                                    "& .MuiTreeItem-label": {
                                        fontSize: "14px",
                                    },
                                    "& .MuiTreeItem-content": {
                                        py: 1,
                                        borderRadius: 2,
                                    },
                                    "& .Mui-selected": {
                                        backgroundColor: `#f6f5f4`,
                                    },
                                }}
                                nodeId="4"
                                label="Value Proposition Canvas"
                            />
                            <TreeItem
                                disabled
                                sx={{
                                    my: 0.5,
                                    "& .MuiTreeItem-label": {
                                        fontSize: "14px",
                                    },
                                    "& .MuiTreeItem-content": {
                                        py: 1,
                                        borderRadius: 2,
                                    },
                                    "& .Mui-selected": {
                                        backgroundColor: `#f6f5f4`,
                                    },
                                }}
                                nodeId="5"
                                label={
                                    <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'}>
                                        <LockOutlinedIcon fontSize="small" />
                                        <Typography sx={{ fontSize: '13px', ml: 2 }}>Empathy Canvas</Typography>
                                    </Stack>
                                }
                            />
                            <TreeItem
                                disabled
                                sx={{
                                    my: 0.5,
                                    "& .MuiTreeItem-label": {
                                        fontSize: "14px",
                                    },
                                    "& .MuiTreeItem-content": {
                                        py: 1,
                                        borderRadius: 2,
                                    },
                                    "& .Mui-selected": {
                                        backgroundColor: `#f6f5f4`,
                                    },
                                }}
                                nodeId="6"
                                label={
                                    <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'}>
                                        <LockOutlinedIcon fontSize="small" />
                                        <Typography sx={{ fontSize: '13px', ml: 2 }}>Persona Canvas</Typography>
                                    </Stack>
                                }
                            />
                        </TreeItem>
                    </TreeItem>
                </TreeView>
            </Popover>
        </>
    );
};

export default CanvasRoadmapBtn;
