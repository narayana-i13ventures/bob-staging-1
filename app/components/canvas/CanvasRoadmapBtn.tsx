"use client";
import React, { useRef } from "react";
import GrowTransition from "../Utils/Grow";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IconButton, Popover, useTheme } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import { useRouter } from "next/navigation";

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
            router.push("Microframeworks?canvas=BMC");
            dispatch(appSlice.actions.toggleCanvasRoadmap(false));
        } else if (nodeIds === "4") {
            router.push("Microframeworks?canvas=CVP");
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
                        p: 1,
                        width: "300px",
                        borderRadius: 3,
                        overflowY: "hidden",
                        zIndex: 100,
                    },
                }}
            >
                <TreeView
                    expanded={["1", "2"]}
                    selected={canvasName === "BMC" ? "3" : canvasName === "CVP" ? "4" : ""}
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
                                borderRadius: 3,
                            },
                            "& .Mui-selected": {
                                backgroundColor: `${theme?.palette?.primary?.main}30`,
                            },
                        }}
                        nodeId="1"
                        label="Think Beyond"
                    >
                        <TreeItem
                            sx={{
                                my: 0.5,
                                "& .MuiTreeItem-label": {
                                    fontSize: "14px",
                                },
                                "& .MuiTreeItem-content": {
                                    py: 1,
                                    borderRadius: 3,
                                },
                                "& .Mui-selected": {
                                    backgroundColor: `${theme?.palette?.primary?.main}30`,
                                },
                            }}
                            nodeId="2"
                            label="Microframeworks"
                        >
                            <TreeItem
                                sx={{
                                    my: 0.5,
                                    "& .MuiTreeItem-label": {
                                        fontSize: "14px",
                                    },
                                    "& .MuiTreeItem-content": {
                                        py: 1,
                                        borderRadius: 3,
                                    },
                                    "& .Mui-selected": {
                                        backgroundColor: `${theme?.palette?.primary?.main}30`,
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
                                        borderRadius: 3,
                                    },
                                    "& .Mui-selected": {
                                        backgroundColor: `${theme?.palette?.primary?.main}30`,
                                    },
                                }}
                                nodeId="4"
                                label="Value Proposition Canvas"
                            />
                            <TreeItem
                                sx={{
                                    my: 0.5,
                                    "& .MuiTreeItem-label": {
                                        fontSize: "14px",
                                    },
                                    "& .MuiTreeItem-content": {
                                        py: 1,
                                        borderRadius: 3,
                                    },
                                    "& .Mui-selected": {
                                        backgroundColor: `${theme?.palette?.primary?.main}30`,
                                    },
                                }}
                                nodeId="5"
                                label="Empathy Canvas"
                            />
                            <TreeItem
                                sx={{
                                    my: 0.5,
                                    "& .MuiTreeItem-label": {
                                        fontSize: "14px",
                                    },
                                    "& .MuiTreeItem-content": {
                                        py: 1,
                                        borderRadius: 3,
                                    },
                                    "& .Mui-selected": {
                                        backgroundColor: `${theme?.palette?.primary?.main}30`,
                                    },
                                }}
                                nodeId="6"
                                label="Persona Canvas"
                            />
                        </TreeItem>
                    </TreeItem>
                </TreeView>
            </Popover>
        </>
    );
};

export default CanvasRoadmapBtn;
