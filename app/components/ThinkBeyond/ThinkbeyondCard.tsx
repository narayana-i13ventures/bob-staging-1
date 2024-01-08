"use client";
import React from "react";
import { appSlice, useDispatch, useSelector } from "@/lib/redux";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { selectedThinkbeyond } from "@/lib/redux/slices/SelectedSlice";
import { useUpdateThinkBeyondMutation } from "@/lib/redux/Api";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useParams, useRouter } from "next/navigation";
const ThinkbeyondCard = (props: any) => {
  const router = useRouter();
  const { projectId } = useParams();
  const { width, card } = props;
  const dispatch = useDispatch();
  const selectedCard = useSelector(selectedThinkbeyond);
  const [updatedThinkbeyondCard] = useUpdateThinkBeyondMutation();
  const openThinkbeyondModalOpen = () => {
    switch (card?.type) {
      case "future_1_bmc":
        router.push(`/${projectId}/Future1/Microframeworks`);
        break;
      case "future_2_bmc":
        router.push(`/${projectId}/Future2/Microframeworks`);
        break;
      case "future_3_bmc":
        router.push(`/${projectId}/Future3/Microframeworks`);
        break;

      default:
        dispatch(appSlice.actions.toggleThinkbeyondModalOpen(true));
        break;
    }
  };

  const selectCard = () => {
    if (!card?.locked) {
      if (selectedCard && selectedCard.id !== card.id) {
        const updatedSelectedCard = { ...selectedCard, selected: false };
        updatedThinkbeyondCard(updatedSelectedCard)
          .unwrap()
          .then((data: any) => {
            const updatedCard = { ...card, selected: true };
            updatedThinkbeyondCard(updatedCard);
          });
      }
    }
  };
  return (
    <Box
      onClick={selectCard}
      component={"div"}
      sx={{
        p: 2,
        mx: "auto",
        width: width,
        borderRadius: 5,
        overflow: "hidden",
        backgroundColor: card?.complete
          ? "#8BD52390"
          : card?.locked
          ? "#00000010"
          : "#fae588",
        boxShadow: card?.selected ? 5 : 0,
        cursor: !card?.locked ? "pointer" : "auto",
        transition: "all ease-in 200ms",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="body1">
          {card?.cardName === "BMC" ? "Microframeworks" : card?.cardName}
        </Typography>
        <IconButton
          disableRipple
          disableFocusRipple
          disableTouchRipple
          disabled={card?.locked}
          onClick={() =>
            card?.selected ? openThinkbeyondModalOpen() : () => {}
          }
          size="large"
          sx={{
            backgroundColor: card?.selected ? "white" : "transparent",
            boxShadow: !card?.locked ? (card?.selected ? 1 : 0) : 0,
            "&:hover": {
              backgroundColor: card?.selected ? "white" : "transparent",
              transition: "all ease-in 200ms",
            },
          }}
        >
          {card?.type ===
          ("future_1_bmc" || "future_2_bmc" || "future_3_bmc") ? (
            card?.locked ? (
              <LockOutlinedIcon />
            ) : (
              <LockOpenOutlinedIcon />
            )
          ) : card?.locked ? (
            <LockOutlinedIcon />
          ) : card?.complete ? (
            card?.selected ? (
              <ModeEditOutlineOutlinedIcon />
            ) : (
              <CheckCircleOutlineOutlinedIcon />
            )
          ) : (
            <ModeEditOutlineOutlinedIcon />
          )}
        </IconButton>
      </Stack>
    </Box>
  );
};

export default ThinkbeyondCard;
