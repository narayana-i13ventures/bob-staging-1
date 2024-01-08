"use client";
import React, { JSXElementConstructor, ChangeEvent } from "react";
import Dialog from "@mui/material/Dialog";
import {
    Box,
    Button,
    DialogActions,
    Divider,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import SlideTransition from "../Utils/Slide";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {
    selectedCards,
    selectedThinkbeyond,
} from "@/lib/redux/slices/SelectedSlice";
import {
    useGetCompanyByIdQuery,
    useNextThinkBeyondMutation,
} from "@/lib/redux/Api";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import { useParams } from "next/navigation";
const ThinkbeyondModal = (props: any) => {
    const dispatch = useDispatch();
    const { projectId } = useParams();
    const [setNextCard] = useNextThinkBeyondMutation();
    const { ThinkbeyondModalOpen, BobMessages }: any = useSelector(selectApp);
    const selectedThinkbeyondCard = useSelector(selectedThinkbeyond);
    const {
        data: company,
        isLoading: companyLoading,
        isError: companyError,
    } = useGetCompanyByIdQuery(projectId);

    const closeThinkbeyondModalOpen = () => {
        dispatch(appSlice.actions.toggleThinkbeyondModalOpen(false));
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLTextAreaElement>,
        heading: string
    ) => {
        const updatedText = e?.target?.value;
        dispatch(
            selectedCards.actions.updateThinkbeyondText({
                heading,
                text: updatedText,
            })
        );
    };

    const nextCard = () => {
        const shouldSendRequest = selectedThinkbeyondCard?.cardInfo?.every(
            (info: any) => info?.text && info.text.trim() !== ""
        );

        if (shouldSendRequest) {
            setNextCard(selectedThinkbeyondCard)
                .unwrap()
                .then((data: any) => {
                    dispatch(appSlice.actions.toggleThinkbeyondModalOpen(false));
                });
        } else {
            dispatch(
                appSlice.actions.setGlobalSnackBar({
                    open: true,
                    content: `Complete The Card Information to go to Next Card`,
                })
            );
        }
    };

    const handleAskBobHelp = () => {
        if (ThinkbeyondModalOpen) {
            addMessage();
        }
    };

    async function addMessage() {
        dispatch(appSlice.actions.toggleBobOpen(true));
        // if (!companyLoading && !companyError) {
        //     const data: any = {
        //         cardIndex: selectedThinkbeyondCard?.cardNumber,
        //         card: selectedThinkbeyondCard?.cardInfo,
        //         project: {
        //             ...company,
        //             shared: undefined,
        //             id: undefined,
        //             createdAt: undefined,
        //             can_modify: undefined,
        //             is_active: undefined,
        //             is_owner: undefined,
        //             milvus_collection: undefined,
        //             modified_on: undefined,
        //             user_id: undefined,
        //             project_id: undefined,
        //         },
        //         bobMessages: BobMessages?.slice(
        //             Math.max(BobMessages.length - 5, 0)
        //         ).map((message: any) => message.content),
        //     };

        //     const shouldSendRequest = selectedThinkbeyondCard?.cardInfo?.every(
        //         (info: any) => info?.text && info.text.trim() !== ""
        //     );

        //     if (shouldSendRequest) {
        //         dispatch(
        //             appSlice.actions.setGlobalSnackBar({
        //                 open: true,
        //                 content: "Card is Empty",
        //             })
        //         );
        //         return;
        //     }
        //     dispatch(appSlice.actions.setBobMessages());
        //     dispatch(appSlice.actions.toggleBobThinking(true));
        //     dispatch(appSlice.actions.toggleBobOpen(true));
        //     try {
        //         const apiUrl =
        //             "https://bobapi.i13ventures.com/v1/think_beyond/suggestion";
        //         if (data) {
        //             const response = await fetch(apiUrl, {
        //                 method: "POST",
        //                 headers: {
        //                     "Content-Type": "application/json",
        //                 },
        //                 body: JSON.stringify(data),
        //             });
        //             if (!response.ok) {
        //                 throw new Error("Network response was not ok");
        //             }
        //             const responseData = await response.json();
        //             dispatch(appSlice.actions.updateBobMessages(responseData?.message));
        //         } else {
        //             dispatch(
        //                 appSlice.actions.setGlobalSnackBar({
        //                     open: true,
        //                     content: "Data Not Present",
        //                 })
        //             );
        //         }
        //     } catch (error) {
        //         console.error("Error:", error);
        //         dispatch(appSlice.actions.removeBobMessages());
        //         dispatch(
        //             appSlice.actions.setGlobalSnackBar({
        //                 open: true,
        //                 content: "Bob is Not Able to think",
        //             })
        //         );
        //     } finally {
        //         dispatch(appSlice.actions.toggleBobThinking(false));
        //     }
        // }
    }

    return (
        <>
            <Dialog
                TransitionComponent={SlideTransition}
                keepMounted
                maxWidth={"sm"}
                fullWidth
                disableEscapeKeyDown
                disablePortal
                open={ThinkbeyondModalOpen}
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                    }
                }}
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
                    <Typography variant="h6">
                        {selectedThinkbeyondCard?.cardName}
                    </Typography>
                    <IconButton size="small" onClick={closeThinkbeyondModalOpen}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Divider />
                <DialogContent sx={{ p: 2 }}>
                    {selectedThinkbeyondCard?.cardInfo?.map(
                        (info: any, index: number) => {
                            return (
                                <Box component={"div"} key={index}>
                                    <Typography variant="body1" sx={{ mb: 2 }}>
                                        {info?.heading}
                                    </Typography>
                                    <TextField
                                        id={`think-beyond-answer-${index}`}
                                        placeholder={info?.placeholder}
                                        multiline
                                        fullWidth
                                        value={info?.text}
                                        minRows={4}
                                        maxRows={4}
                                        onChange={(e: any) => handleInputChange(e, info.heading)}
                                        InputProps={{
                                            sx: {
                                                p: 1,
                                                mb:
                                                    selectedThinkbeyondCard?.cardInfo?.length - 1 ===
                                                        index
                                                        ? 0
                                                        : 2,
                                                fontSize: "14px",
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    borderWidth: "1px !important",
                                                },
                                            },
                                        }}
                                    />
                                </Box>
                            );
                        }
                    )}
                </DialogContent>
                <Divider />
                <DialogActions sx={{ p: 2 }}>
                    <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        sx={{
                            width: "100%",
                        }}
                    >
                        <Button
                            onClick={handleAskBobHelp}
                            size="small"
                            variant="outlined"
                            color="primary"
                        >
                            Ask Bob's Help
                        </Button>
                        <Stack component={"div"} direction={"row"} alignItems={"center"}>
                            <Button
                                onClick={nextCard}
                                size="small"
                                variant="outlined"
                                color="primary"
                                sx={{ mr: 2 }}
                            >
                                Next Card
                            </Button>
                            <Button
                                onClick={closeThinkbeyondModalOpen}
                                size="small"
                                variant="contained"
                                color="primary"
                            >
                                Save
                            </Button>
                        </Stack>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ThinkbeyondModal;
