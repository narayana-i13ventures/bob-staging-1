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
import {
  selectedCardsSlice,
  selectedThinkbeyond,
} from "@/lib/redux/slices/SelectedSlice";
import {
  thinkbeyondSlice,
  useSelectThinkbeyondCardMutation,
  useUpdateThinkbeyondCardMutation,
} from "@/lib/redux/ThinkbeyondApi";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
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
      // dispatch(
      //   thinkbeyondSlice.util.updateQueryData(
      //     "getThinkbeyondCanvas",
      //     {
      //       projectId: projectId,
      //       userId: data?.user?.user_id,
      //     },
      //     (draft: any) => {
      //       for (const ThinkbeyondCard of draft) {
      //         for (const key in ThinkbeyondCard) {
      //           if (
      //             typeof ThinkbeyondCard[key] === "object" &&
      //             ThinkbeyondCard[key] !== null
      //           ) {
      //             if (ThinkbeyondCard[key].cardNumber !== card?.cardNumber) {
      //               ThinkbeyondCard[key].selected = false;
      //             } else if (card?.cardNumber !== (4 || 7 || 10)) {
      //               ThinkbeyondCard[key].selected = true;
      //             }
      //           }
      //         }
      //       }
      //     }
      //   )
      // );
      // dispatch(selectedCardsSlice.actions.setSelectedThinkbeyondCard(card));
      // dispatch(appSlice.actions.toggleThinkbeyondModalOpen(true));

      if (selectedCard && selectedCard.cardNumber !== card.cardNumber) {
        selectThinkbeyondCard({
          projectId,
          userId: data?.user?.user_id,
          next_card_number: card.cardNumber,
          current_card_number: selectedCard.cardNumber,
        });
      }
    }
  };

  return (
    <Paper
      elevation={card?.locked ? 0 : 2}
      onClick={selectCard}
      component={"div"}
      sx={{
        p: 2,
        mx: "auto",
        width: width,
        height: "100%",
        borderRadius: 2,
        overflow: "hidden",
        transition: "all ease-in 200ms",
        cursor: !card?.locked ? "pointer" : "auto",
        // backgroundColor: "#fff",
        backgroundColor: !card?.selected ? "#fff" : "#f6f5f4",
        border: card?.locked ? "2px solid #00000040" : "2px solid #000",
      }}
    >
      {!isLoading ? (
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            height:'100%'
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: card?.locked ? "#00000040" : "" }}
          >
            {card?.cardName === "Microframeworks"
              ? "Micro Frameworks"
              : card?.cardName}
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
              backgroundColor: card?.selected ? "black" : "white",
              color: card?.selected ? "white" : "black",
              "&:hover": {
                // backgroundColor: "white",
                backgroundColor: card?.selected ? "black" : "white",
                transition: "all ease-in 200ms",
              },
            }}
          >
            {card?.locked ? (
              <LockOutlinedIcon />
            ) : card?.cardNumber === 4 ||
              card?.cardNumber === 7 ||
              card?.cardNumber === 10 ? (
              <SpaceDashboardOutlinedIcon />
            ) : (
              <ModeEditOutlineOutlinedIcon />
            )}
          </IconButton>
          {/* <IconButton
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
          </IconButton> */}
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
