"use client";
import React from "react";
import Dialog from "@mui/material/Dialog";
import ProjectStages from "./ProjectStages";
import SlideTransition from "../Utils/Slide";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider, IconButton, Typography } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";

const CreateProjectModal = () => {
    const dispatch = useDispatch();
    const { newProjectOpen }: any = useSelector(selectApp);

    const closeCreateNewProject = () => {
        dispatch(appSlice.actions.toggleNewProjectOpen(false));
    };
    return (
        <>
            <Dialog
                TransitionComponent={SlideTransition}
                keepMounted
                // fullScreen
                maxWidth={"sm"}
                fullWidth
                disableEscapeKeyDown
                open={newProjectOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    component={"div"}
                    sx={{
                        p: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h6">Create New Project</Typography>
                    <IconButton size="small" onClick={closeCreateNewProject}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Divider />
                <DialogContent sx={{ p: 2 }}>
                    <ProjectStages />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CreateProjectModal;
