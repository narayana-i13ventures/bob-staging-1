import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import {
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import SettingsOverscanOutlinedIcon from "@mui/icons-material/SettingsOverscanOutlined";
import { useParams, usePathname } from "next/navigation";
import {
  selectedCardsSlice,
  selectedFuture1BMCCard,
} from "@/lib/redux/slices/SelectedSlice";
import {
  BMCSlice,
  useSelectFuture1BMCCardMutation,
  useUpdateBMCCardMutation,
} from "@/lib/redux/BMCApi";
import { useSession } from "next-auth/react";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { CVPSlice } from "@/lib/redux/CVPApi";
const CanvasCard = (props: any) => {
  const { card }: any = props;
  const pathName = usePathname();
  const dispatch = useDispatch();
  const { data }: any = useSession();
  const { projectId, futureId } = useParams();
  const Future1BMCCard = useSelector(selectedFuture1BMCCard);
  const [selectedCard, setSelectedCard] = useState<any>(null);
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

  useEffect(() => {
    if (pathName.includes("/Future1/Microframeworks/BMC")) {
      setSelectedCard(Future1BMCCard);
    } else {
      setSelectedCard(null);
    }
    return () => {
      setSelectedCard(null);
    };
  }, [pathName, Future1BMCCard]);

  const openCanvasModal = () => {
    dispatch(appSlice.actions.toggleCanvasModalOpen(true));
  };

  const [
    updateBMCCard,
    {
      isError: UpdateFuture1BMCError,
      isSuccess: UpdateFuture1BMCSuccess,
      isLoading: UpdateFuture1BMCLoading,
    },
  ] = useUpdateBMCCardMutation();

  const [
    selectFuture1BMCCard,
    {
      isError: selectFuture1BMCError,
      isSuccess: selectFuture1BMCSuccess,
      isLoading: selectFuture1BMCLoading,
    },
  ] = useSelectFuture1BMCCardMutation();

  const selectCard = () => {
    if (!card?.locked) {
      if (selectedCard && selectedCard.cardNumber !== card.cardNumber) {
        if (pathName.includes("/Future1/Microframeworks/BMC")) {
          const updatedSelectedCard = { ...selectedCard, selected: false };
          selectFuture1BMCCard({
            projectId,
            future,
            current_card_number: selectedCard.cardNumber,
            next_card_number: card?.cardNumber,
            userId: data?.user?.user_id,
          });
        }
      } else if (selectedCard === null || selectedCard === undefined) {
        const updatedCard = { ...card, selected: true };
        selectFuture1BMCCard({
          projectId,
          future,
          current_card_number: 7,
          next_card_number: card?.cardNumber,
          userId: data?.user?.user_id,
        });
      }
    }
  };
  const testSelectCard = () => {
    if (futureId === "Future1") {
      if (pathName.includes("BMC")) {
        dispatch(
          BMCSlice.util.updateQueryData(
            "GetBMCCanvas",
            {
              projectId: projectId,
              future: future,
              userId: data?.user?.user_id,
            },
            (draft: any) => {
              draft?.map((CanvasCard: any) => {
                if (CanvasCard?.cardNumber === card?.cardNumber) {
                  return { ...CanvasCard, selected: true };
                } else {
                  return { ...CanvasCard, selected: false };
                }
              });
            }
          )
        );
        dispatch(selectedCardsSlice.actions.setSelectedFuture1BMCCard(card));
        dispatch(appSlice.actions.toggleCanvasModalOpen(true));
      }
      if (pathName.includes("CVP")) {
        dispatch(
          CVPSlice.util.updateQueryData(
            "GetCVPCanvas",
            {
              projectId: projectId,
              future: future,
              userId: data?.user?.user_id,
            },
            (draft: any) => {
              draft?.map((CanvasCard: any) => {
                if (CanvasCard?.cardNumber === card?.cardNumber) {
                  return { ...CanvasCard, selected: true };
                } else {
                  return { ...CanvasCard, selected: false };
                }
              });
            }
          )
        );
        dispatch(selectedCardsSlice.actions.setSelectedFuture1CVPCard(card));
        dispatch(appSlice.actions.toggleCanvasModalOpen(true));
      }
    }
    if (futureId === "Future2") {
      if (pathName.includes("BMC")) {
        dispatch(
          BMCSlice.util.updateQueryData(
            "GetBMCCanvas",
            {
              projectId: projectId,
              future: future,
              userId: data?.user?.user_id,
            },
            (draft: any) => {
              draft?.map((CanvasCard: any) => {
                if (CanvasCard?.cardNumber === card?.cardNumber) {
                  return { ...CanvasCard, selected: true };
                } else {
                  return { ...CanvasCard, selected: false };
                }
              });
            }
          )
        );
        dispatch(selectedCardsSlice.actions.setSelectedFuture2BMCCard(card));
        dispatch(appSlice.actions.toggleCanvasModalOpen(true));
      }
      if (pathName.includes("CVP")) {
        dispatch(
          CVPSlice.util.updateQueryData(
            "GetCVPCanvas",
            {
              projectId: projectId,
              future: future,
              userId: data?.user?.user_id,
            },
            (draft: any) => {
              draft?.map((CanvasCard: any) => {
                if (CanvasCard?.cardNumber === card?.cardNumber) {
                  return { ...CanvasCard, selected: true };
                } else {
                  return { ...CanvasCard, selected: false };
                }
              });
            }
          )
        );
        dispatch(selectedCardsSlice.actions.setSelectedFuture2CVPCard(card));
        dispatch(appSlice.actions.toggleCanvasModalOpen(true));
      }
    }
    if (futureId === "Future3") {
      if (pathName.includes("BMC")) {
        dispatch(
          BMCSlice.util.updateQueryData(
            "GetBMCCanvas",
            {
              projectId: projectId,
              future: future,
              userId: data?.user?.user_id,
            },
            (draft: any) => {
              draft?.map((CanvasCard: any) => {
                if (CanvasCard?.cardNumber === card?.cardNumber) {
                  return { ...CanvasCard, selected: true };
                } else {
                  return { ...CanvasCard, selected: false };
                }
              });
            }
          )
        );
        dispatch(selectedCardsSlice.actions.setSelectedFuture3BMCCard(card));
        dispatch(appSlice.actions.toggleCanvasModalOpen(true));
      }
      if (pathName.includes("CVP")) {
        dispatch(
          CVPSlice.util.updateQueryData(
            "GetCVPCanvas",
            {
              projectId: projectId,
              future: future,
              userId: data?.user?.user_id,
            },
            (draft: any) => {
              draft?.map((CanvasCard: any) => {
                if (CanvasCard?.cardNumber === card?.cardNumber) {
                  return { ...CanvasCard, selected: true };
                } else {
                  return { ...CanvasCard, selected: false };
                }
              });
            }
          )
        );
        dispatch(selectedCardsSlice.actions.setSelectedFuture3CVPCard(card));
        dispatch(appSlice.actions.toggleCanvasModalOpen(true));
      }
    }
  };

  useEffect(() => {
    if (pathName.includes("/Future1/Microframeworks/BMC")) {
      setCardStatus({
        error: UpdateFuture1BMCError || selectFuture1BMCError,
        loading: UpdateFuture1BMCLoading || selectFuture1BMCLoading,
        success: UpdateFuture1BMCSuccess || selectFuture1BMCSuccess,
      });
    }
  }, [
    UpdateFuture1BMCError,
    UpdateFuture1BMCSuccess,
    UpdateFuture1BMCLoading,
    selectFuture1BMCError,
    selectFuture1BMCLoading,
    selectFuture1BMCSuccess,
  ]);
  return (
    <>
      <Stack
        component={"div"}
        onClick={testSelectCard}
        direction={"column"}
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        sx={{
          p: 1,
          width: "100%",
          height: "100%",
          borderRadius: 2,
          // backgroundColor: props?.color,
          opacity: card?.locked ? 0.38 : 1,
          // backgroundColor: !card?.selected ? "#f6f5f4" : "#fff",
          backgroundColor: "#f6f5f4",
          border: "1px solid #000",
          overflow: "hidden",
          cursor: card?.locked ? "auto" : "pointer",
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
          {!card?.locked && (
            <Stack
              direction={"row"}
              justifyContent={"flex-end"}
              alignItems={"center"}
              spacing={2}
            >
              {/* {card?.selected && (
                <IconButton size="small" onClick={openCanvasModal}>
                  <SettingsOverscanOutlinedIcon fontSize="small" />
                </IconButton>
              )} */}
              <Tooltip
                title={`Surety : ${card?.surety}%`}
                arrow
                placement="bottom"
              >
                <TipsAndUpdatesIcon
                  sx={{
                    fontSize: "20px",
                    color:
                      card?.surety < "80"
                        ? "red"
                        : card?.surety < "95"
                        ? "orange"
                        : "green",
                  }}
                />
              </Tooltip>
            </Stack>
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
          {!card?.locked ? (
            <>
              {!card?.loadingKeyPoints && (
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
              {card?.loadingKeyPoints && (
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
            </>
          ) : (
            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ width: "100%", mt: 6 }}
            >
              <LockOutlinedIcon sx={{ fontSize: "90px" }} />
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default CanvasCard;
