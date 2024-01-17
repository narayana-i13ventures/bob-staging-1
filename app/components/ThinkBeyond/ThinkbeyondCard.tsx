"use client";
import React, { useEffect } from "react";
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
import {
  useSelectThinkbeyondCardMutation,
  useUpdateThinkbeyondCardMutation,
} from "@/lib/redux/ThinkbeyondApi";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { useSession } from "next-auth/react";
const ThinkbeyondCard = (props: any) => {
  const router = useRouter();
  const { width, card } = props;
  const dispatch = useDispatch();
  const { data }: any = useSession();
  const { projectId, futureId } = useParams();
  const selectedCard = useSelector(selectedThinkbeyond);
  const [selectThinkbeyondCard, { isLoading, isSuccess, isError }] =
    useSelectThinkbeyondCardMutation();

  // const [updatedThinkbeyondCard, { isLoading, isSuccess, isError }] =
  //   useUpdateThinkbeyondCardMutation();

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

  useEffect(() => {
    if (isError === true) {
      dispatch(
        appSlice.actions.setGlobalSnackBar({
          open: true,
          content: "Error Updating Card",
          clossable: true,
        })
      );
    }
  }, [isError]);

  const selectCard = () => {
    if (!card?.locked) {
      if (selectedCard && selectedCard.cardNumber !== card.cardNumber) {
        selectThinkbeyondCard({
          userId: data?.user?.user_id,
          projectId,
          current_card_number: selectedCard.cardNumber,
          next_card_number: card.cardNumber,
        });
        // const updatedSelectedCard = { ...selectedCard, selected: false };
        // updatedThinkbeyondCard({
        //   card: updatedSelectedCard,
        //   projectId,
        //   userId: data?.user?.user_id,
        // })
        //   .unwrap()
        //   .then((response: any) => {
        //     const updatedCard = { ...card, selected: true };
        //     updatedThinkbeyondCard({
        //       card: updatedCard,
        //       projectId,
        //       userId: data?.user?.user_id,
        //     });
        //   });
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
        backgroundColor: !card?.selected ? "#fff" : "#f6f5f4  ",
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
            {card?.cardName === "Microframeworks" ? "Micro Frameworks" : card?.cardName}
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
