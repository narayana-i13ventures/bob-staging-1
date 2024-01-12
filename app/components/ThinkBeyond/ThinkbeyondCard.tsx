"use client";
import React from "react";
import { appSlice, useDispatch, useSelector } from "@/lib/redux";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import {
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { selectedThinkbeyond } from "@/lib/redux/slices/SelectedSlice";
import { useUpdateThinkbeyondCardMutation } from "@/lib/redux/ThinkbeyondApi";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
const ThinkbeyondCard = (props: any) => {
  const router = useRouter();
  const { width, card } = props;
  const dispatch = useDispatch();
  const { projectId, futureId } = useParams();
  const selectedCard = useSelector(selectedThinkbeyond);

  const [updatedThinkbeyondCard, { isLoading, isSuccess, isError }] =
    useUpdateThinkbeyondCardMutation();

  const openThinkbeyondModalOpen = () => {
    if (card?.cardName === "Microframeworks" && card?.cardNumber === 4) {
      router.push(`/${projectId}/Future1/Microframeworks`);
    } else if (card?.cardName === "Microframeworks" && card?.cardNumber === 7) {
      router.push(`/${projectId}/Future2/Microframeworks`);
    } else if (
      card?.cardName === "Microframeworks" &&
      card?.cardNumber === 10
    ) {
      router.push(`/${projectId}/Future3/Microframeworks`);
    } else {
      dispatch(appSlice.actions.toggleThinkbeyondModalOpen(true));
    }
  };

  const selectCard = () => {
    if (!card?.locked) {
      if (selectedCard && selectedCard.cardNumber !== card.cardNumber) {
        const updatedSelectedCard = { ...selectedCard, selected: false };
        updatedThinkbeyondCard({ card: updatedSelectedCard, projectId })
          .unwrap()
          .then((data: any) => {
            const updatedCard = { ...card, selected: true };
            updatedThinkbeyondCard({ card: updatedCard, projectId });
          });
      }
    }
  };

  return (
    <Paper
      elevation={card?.locked ? 0 : 3}
      onClick={selectCard}
      component={"div"}
      sx={{
        p: 2,
        mx: "auto",
        width: width,
        borderRadius: 2,
        overflow: "hidden",
        transition: "all ease-in 200ms",
        cursor: !card?.locked ? "pointer" : "auto",
        backgroundColor: !card?.selected ? "#fff" : "",
        border: card?.locked ? "2px solid #00000040" : "2px solid #000",
      }}
    >
      {!isLoading ? (
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            variant="body1"
            sx={{ color: card?.locked ? "#00000040" : "" }}
          >
            {card?.cardName === "BMC" ? "Microframeworks" : card?.cardName}
          </Typography>
          <IconButton
            disableRipple
            disableFocusRipple
            disableTouchRipple
            disabled={card?.locked}
            onClick={() =>
              card?.selected ? openThinkbeyondModalOpen() : () => { }
            }
            size="large"
            sx={{
              backgroundColor: card?.selected ? "black" : "transparent",
              boxShadow: !card?.locked ? (card?.selected ? 1 : 0) : 0,
              "&:hover": {
                backgroundColor: card?.selected ? "black" : "transparent",
                transition: "all ease-in 200ms",
              },
            }}
          >
            {card?.type ===
              ("future_1_bmc" || "future_2_bmc" || "future_3_bmc") ? (
              card?.locked ? (
                <LockOutlinedIcon />
              ) : (
                <LockOpenOutlinedIcon
                  sx={{ color: card?.selected ? "#fff" : "" }}
                />
              )
            ) : card?.locked ? (
              <LockOutlinedIcon />
            ) : card?.complete ? (
              card?.selected ? (
                <ModeEditOutlineOutlinedIcon
                  sx={{ color: card?.selected ? "#fff" : "" }}
                />
              ) : (
                <CheckCircleOutlineOutlinedIcon
                  sx={{ color: card?.selected ? "#fff" : "" }}
                />
              )
            ) : (
              <ModeEditOutlineOutlinedIcon
                sx={{ color: card?.selected ? "#fff" : "" }}
              />
            )}
          </IconButton>
        </Stack>
      ) : (
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CircularProgress />
        </Stack>
      )}
    </Paper>
  );
};

export default ThinkbeyondCard;
