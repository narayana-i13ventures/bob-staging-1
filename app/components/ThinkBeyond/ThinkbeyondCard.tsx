"use client";
import React from "react";
import { appSlice, useDispatch, useSelector } from "@/lib/redux";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { Box, Chip, IconButton, Paper, Stack, Typography } from "@mui/material";
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
        // backgroundColor: card?.complete
        //   ? "#8BD52390"
        //   : card?.locked
        //   ? "#00000010"
        //   : "#fae588",
        backgroundColor: !card?.selected ? '#fff' : '',
        cursor: !card?.locked ? "pointer" : "auto",
        transition: "all ease-in 200ms",
        border: card?.locked ? '2px solid #00000040' : '2px solid #000'
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="body1" sx={{ color: card?.locked ? '#00000040' : '' }} >
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
              <LockOpenOutlinedIcon sx={{ color: card?.selected ? '#fff' : '' }} />
            )
          ) : card?.locked ? (
            <LockOutlinedIcon />
          ) : card?.complete ? (
            card?.selected ? (
              <ModeEditOutlineOutlinedIcon sx={{ color: card?.selected ? '#fff' : '' }} />
            ) : (
              <CheckCircleOutlineOutlinedIcon sx={{ color: card?.selected ? '#fff' : '' }} />
            )
          ) : (
            <ModeEditOutlineOutlinedIcon />
          )}
        </IconButton>
      </Stack>
    </Paper>
  );
};

export default ThinkbeyondCard;
