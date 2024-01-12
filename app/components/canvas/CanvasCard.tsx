import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { appSlice, useDispatch, useSelector } from "@/lib/redux";
import {
    Button,
    CircularProgress,
    Divider,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import SettingsOverscanOutlinedIcon from "@mui/icons-material/SettingsOverscanOutlined";
import { useParams, usePathname } from "next/navigation";
import { selectedFuture1BMCCard } from "@/lib/redux/slices/SelectedSlice";
import { useUpdateBMCCardMutation } from "@/lib/redux/BMCApi";
const CanvasCard = (props: any) => {
    const { card }: any = props;
    const pathName = usePathname();
    const dispatch = useDispatch();
    const { projectId, futureId } = useParams();
    const selectedCard = useSelector(selectedFuture1BMCCard);
    const future =
        futureId === "Future1"
            ? 1
            : futureId === "Future2"
                ? 2
                : futureId === "Future3"
                    ? 3
                    : 0;
    const [cardStatus, setCardStatus] = useState({
        loading: false,
        error: false,
        success: true,
    });

    const openCanvasModal = () => {
        dispatch(appSlice.actions.toggleCanvasModalOpen(true));
    };
    const [
        updateFuture1BMCCard,
        {
            isError: UpdateFuture1BMCError,
            isSuccess: UpdateFuture1BMCSuccess,
            isLoading: UpdateFuture1BMCLoading,
        },
    ] = useUpdateBMCCardMutation();
    useEffect(() => {
        if (pathName.includes("/Future1/Microframeworks/BMC")) {
            setCardStatus({
                error: UpdateFuture1BMCError,
                loading: UpdateFuture1BMCLoading,
                success: UpdateFuture1BMCSuccess,
            });
        }
    }, [UpdateFuture1BMCError, UpdateFuture1BMCSuccess, UpdateFuture1BMCLoading]);
    const selectCard = () => {
        console.log(selectedCard);
        
        if (!card?.locked) {
            if (selectedCard && selectedCard.cardNumber !== card.cardNumber) {
                if (pathName.includes("/Future1/Microframeworks/BMC")) {
                    const updatedSelectedCard = { ...selectedCard, selected: false };
                    updateFuture1BMCCard({ card: updatedSelectedCard, projectId, future })
                        .unwrap()
                        .then((data: any) => {
                            const updatedCard = { ...card, selected: true };
                            updateFuture1BMCCard({
                                card: updatedCard,
                                projectId,
                                future,
                            });
                        });
                }
            }
        }
    };
    return (
        <>
            <Stack
                component={"div"}
                onClick={selectCard}
                direction={"column"}
                alignItems={"flex-start"}
                justifyContent={"flex-start"}
                sx={{
                    p: 1,
                    width: "100%",
                    height: "100%",
                    borderRadius: 2,
                    // backgroundColor: props?.color,
                    backgroundColor: !card?.selected ? "#f6f5f4" : "#fff",
                    border: "1px solid #000",
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: !card?.selected ? 2 : 0,
                }}
            >
                <Stack
                    direction={"row"}
                    justifyContent="space-between"
                    alignItems={"center"}
                    sx={{
                        width: "100%",
                        minHeight: "30px",
                    }}
                >
                    <Typography variant="body1">{card?.cardName}</Typography>
                    {!card?.selected && (
                        <IconButton size="small" onClick={openCanvasModal}>
                            <SettingsOverscanOutlinedIcon fontSize="small" />
                        </IconButton>
                    )}
                </Stack>
                <Divider sx={{ width: "100%", my: 1 }} />
                <Stack
                    direction={"column"}
                    alignItems={"flex-start"}
                    justifyContent={"flex-start"}
                    sx={{
                        flexGrow: 1,
                        width: "100%",
                        overflowY: "auto",
                        maxHeight: "calc(100% - 37px)",
                    }}
                >
                    {!cardStatus?.loading && !cardStatus?.error && (
                        <>
                            {card?.keyPoints !== "" && card?.keyPoints !== null ? (
                                <ul style={{ margin: "0px", padding: "0px 0px 0px 20px" }}>
                                    {card?.keyPoints
                                        ?.split("--")
                                        .filter((keypoint: any) => keypoint !== "")
                                        .map((keypoint: any, index: number) => (
                                            <li key={index}>
                                                <Typography
                                                    variant="body1"
                                                    sx={{ fontSize: "14px", mb: 1 }}
                                                >
                                                    {keypoint}
                                                </Typography>
                                            </li>
                                        ))}
                                </ul>
                            ) : (
                                <Typography
                                    variant="h6"
                                    sx={{
                                        my: 5,
                                        width: "100%",
                                        fontSize: "16PX",
                                        textAlign: "center",
                                    }}
                                >
                                    No Information Available
                                </Typography>
                            )}
                        </>
                    )}
                    {cardStatus?.loading && !cardStatus?.error && (
                        <Stack
                            direction={"column"}
                            flexGrow={1}
                            justifyContent={"center"}
                            alignItems={"center"}
                            sx={{ width: "100%" }}
                        >
                            <CircularProgress />
                        </Stack>
                    )}
                </Stack>
            </Stack>
        </>
    );
};

export default CanvasCard;
