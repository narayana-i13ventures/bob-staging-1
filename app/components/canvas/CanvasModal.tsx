"use client";
import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import MessageBox from "../Bob/MessageBox";
import SlideTransition from "../Utils/Slide";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import {
  Button,
  ButtonBase,
  CircularProgress,
  DialogActions,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import TuneSharpIcon from "@mui/icons-material/TuneSharp";
import CommentBox from "./CommentBox";
import {
  selectedCardsSlice,
  selectedFuture1BMCCard,
} from "@/lib/redux/slices/SelectedSlice";
import { useParams, usePathname } from "next/navigation";
import {
  BMCSlice,
  useNextFuture1BMCCardMutation,
  useUpdateFuture1BMCCardMutation,
} from "@/lib/redux/BMCApi";
import { useLazyGetThinkbeyondCanvasQuery } from "@/lib/redux/ThinkbeyondApi";
import { fetchEventSource } from "@microsoft/fetch-event-source";
const CanvasModal = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const pathName = usePathname();
  const { projectId, futureId } = useParams();
  const [activeBubble, setActiveBubble] = useState("bob");
  const Future1BMCCard = useSelector(selectedFuture1BMCCard);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const { canvasModalOpen, bobThinking }: any = useSelector(selectApp);
  const currentFuture =
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
  const [nextCardTransition, setNextCardTransition] = useState(false);

  const [getThinkbeyondCanvas, { data: ThinkbeyondCanvas }] =
    useLazyGetThinkbeyondCanvasQuery();

  const [
    nextFuture1BMCCard,
    {
      isLoading: nextFuture1BMCLoading,
      isError: nextFuture1BMCError,
      isSuccess: nextFuture1BMCSuccess,
    },
  ] = useNextFuture1BMCCardMutation();

  const [
    updateFuture1BMCCard,
    {
      isError: UpdateFuture1BMCError,
      isSuccess: UpdateFuture1BMCSuccess,
      isLoading: UpdateFuture1BMCLoading,
    },
  ] = useUpdateFuture1BMCCardMutation();

  useEffect(() => {
    getThinkbeyondCanvas(projectId);
  }, [projectId]);

  useEffect(() => {
    if (pathName.includes("/Future1/Microframeworks/BMC")) {
      setCardStatus({
        error: UpdateFuture1BMCError,
        loading: UpdateFuture1BMCLoading,
        success: UpdateFuture1BMCSuccess,
      });
    }
  }, [UpdateFuture1BMCError, UpdateFuture1BMCSuccess, UpdateFuture1BMCLoading]);

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

  const closeCanvasModal = () => {
    dispatch(appSlice.actions.toggleCanvasModalOpen(false));
    setActiveBubble("bob");
  };

  useEffect(() => {
    if (selectedCard) {
      const updatedCard = { ...selectedCard };
      if (canvasModalOpen) {
        if (updatedCard?.chat?.length === 0) {
          updatedCard.chat = [
            {
              role: "system",
              content: `You are Bob, a helpful and experienced business advisor, and i13 venture builder, that is helping someone put together their ${selectedCard?.cardCanvas}. You work for i13. You are currently talking about ${selectedCard?.cardName}! Your questions should only relate to ${selectedCard?.cardName}. Never ask about any other sections of the business model canvas except for the one you are currently working on. This is very important. You are asking the user questions to help them build a good ${selectedCard?.cardName} section. Engage in the conversation until you have helped the user piece together a good ${selectedCard?.cardName} section. The user will always end their latest message with information about their business. Keep this in mind and try to use that information in your responses. Only ever ask 1 question at a time. Once you have asked enough questions, you have enough information for this section or you are ready to move on to the next section, respond with exactly the following: "That's all my questions now; it's your turn to ask me anything!" and nothing else.`,
              time: "",
            },
          ];
          updatedCard.chat = [
            ...updatedCard.chat,
            {
              role: "user",
              content: `Hi Bob, I am starting a new company and I am trying to figure out my ${selectedCard?.cardName}!`,
              time: "",
            },
          ];

          if (pathName.includes("/Future1/Microframeworks/BMC")) {
            // updateFuture1BMCCard({
            //   projectId,
            //   card: updatedCard,
            //   currentFuture,
            // }).then(({ data }: any) => {
            //   streamResponse(data, false, false);
            // });
            dispatch(
              selectedCardsSlice.actions.updateSelectedFuture1BMCCard(
                updatedCard
              )
            );
          }
        }
      }
    }
  }, [canvasModalOpen, dispatch, selectedCard, pathName]);

  const getFutureData = () => {
    if (ThinkbeyondCanvas && ThinkbeyondCanvas?.length > 0) {
      const change = ThinkbeyondCanvas?.[0]?.change;
      const moonshot = ThinkbeyondCanvas?.[0]?.moonshot;

      let future,
        okrs = null;

      switch (currentFuture) {
        case 1:
          future = ThinkbeyondCanvas?.[0]?.future_1;
          okrs = ThinkbeyondCanvas?.[0]?.future_1_okrs;
          break;
        case 2:
          future = ThinkbeyondCanvas?.[0]?.future_2;
          okrs = ThinkbeyondCanvas?.[0]?.future_2_okrs;
          break;
        case 3:
          future = ThinkbeyondCanvas?.[0]?.future_3;
          okrs = ThinkbeyondCanvas?.[0]?.future_3_okrs;
          break;
        default:
          break;
      }

      if (
        future === null ||
        okrs === null ||
        change === null ||
        moonshot === null
      ) {
        return null;
      } else {
        const changeData = `${change?.cardInfo?.[0]?.heading}:\n${change?.cardInfo?.[0]?.text}`;
        const moonshotData = `${moonshot?.cardInfo?.[0]?.heading}:\n${moonshot?.cardInfo?.[0]?.text}`;
        const futureData = future?.cardInfo
          ?.map((item: any) => `${item?.heading}:\n${item?.text}`)
          .join("\n");
        const okrsData = okrs?.cardInfo
          ?.map((item: any) => `${item?.heading}:\n${item?.text}`)
          .join("\n");
        if (changeData && moonshotData && futureData && okrsData) {
          const result = {
            change: changeData,
            moonshot: moonshotData,
            currentFuture: `currentFuture ${currentFuture}:\n${futureData}`,
            okrs: `OKRs:\n${okrsData}`,
          };
          return result;
        }
      }
    }
    return null;
  };

  const userMessage = (message: any) => {
    if (selectedCard !== undefined) {
      const updatedCard: any = { ...selectedCard };
      if (message === "" || bobThinking) {
        return;
      }
      if (!updatedCard.chat) {
        updatedCard.chat = [];
      }
      updatedCard.chat = [
        ...updatedCard.chat,
        { role: "user", content: message },
      ];
      if (pathName.includes("/Future1/Microframeworks/BMC")) {
        dispatch(
          selectedCardsSlice.actions.updateSelectedFuture1BMCCard(updatedCard)
        );
        streamResponse(updatedCard, false, false);
        // updateFuture1BMCCard({ card: updatedCard, projectId, currentFuture })
        //   .unwrap()
        //   .then((data) => {
        //     streamResponse(data, false, false);
        //   });
      }
    }
  };

  const generateKeypoints = (next: any) => {
    const ResponseCard: any = { ...selectedCard };
    ResponseCard.loadingKeyPoints = true;
    ResponseCard.keyPoints = "";
    if (pathName.includes("/Future1/Microframeworks/BMC")) {
      dispatch(
        selectedCardsSlice.actions.updateSelectedFuture1BMCCard(ResponseCard)
      );
      updateFuture1BMCCard({
        card: ResponseCard,
        projectId,
        future: currentFuture,
      })
        .unwrap()
        .then((data: any) => {
          streamResponse(ResponseCard, true, next);
        });
    }
  };

  const streamResponse = async (card: any, keypoints = false, next: any) => {
    const ResponseCard: any = { ...card };
    let endpoint = "keypoints";
    let streamBody: any = {
      user_id: 3,
      project_id: projectId,
      future: currentFuture,
      card_number: ResponseCard?.cardNumber,
      chat: ResponseCard?.chat,
    };
    if (!!card) {
      if (!keypoints) {
        endpoint = "message";
        streamBody = {
          futureData: getFutureData(),
          chat: ResponseCard?.chat,
        };
        ResponseCard.chat = [
          ...(ResponseCard?.chat || []),
          { role: "assistant", content: "" },
        ];
        if (pathName.includes("/Future1/Microframeworks/BMC")) {
          dispatch(
            selectedCardsSlice.actions.updateSelectedFuture1BMCCard(
              ResponseCard
            )
          );
        }
      }
      dispatch(appSlice.actions.toggleBobThinking(true));
      const baseUrl = "https://bobapi.azurewebsites.net/v1";
      let apiUrl = `${baseUrl}/bmc`;
      await fetchEventSource(`${apiUrl}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(streamBody),
        onopen: async function (response: Response) {
          if (!keypoints) {
            if (response?.status === 500) {
              dispatch(appSlice.actions.toggleBobThinking(false));
              ResponseCard.chat = ResponseCard?.chat?.slice(
                0,
                ResponseCard?.chat?.length - 1
              );
              dispatch(
                selectedCardsSlice.actions.updateSelectedFuture1BMCCard(
                  ResponseCard
                )
              );
            }
          }
          return Promise.resolve();
        },
        onmessage: function (res: any) {
          const { data, type } = res;
          if (!!data) {
            const { suggestion } = JSON.parse(data);
            if (suggestion === "") return;
            if (keypoints) {
              ResponseCard.loadingKeyPoints = false;
              ResponseCard.keyPoints = ResponseCard.keyPoints + suggestion;
              dispatch(appSlice.actions.toggleBobThinking(false));
              if (pathName.includes("/Future1/Microframeworks/BMC")) {
                dispatch(
                  selectedCardsSlice.actions.updateFuture1BMCKeyPoints(
                    suggestion
                  )
                );
                dispatch(
                  BMCSlice.util.updateQueryData(
                    "GetFuture1BMCCanvas",
                    { projectId: projectId, future: currentFuture },
                    (draft: any) => {
                      return draft.map((card: any) => {
                        if (card.cardNumber === ResponseCard?.cardNumber) {
                          return {
                            ...card,
                            keyPoints: card.keyPoints + suggestion,
                          };
                        } else {
                          return card;
                        }
                      });
                    }
                  )
                );
              }
            } else {
              ResponseCard.chat = [...ResponseCard.chat];
              const lastMessage = {
                ...ResponseCard?.chat?.[ResponseCard.chat.length - 1],
              };
              lastMessage.content = lastMessage.content + suggestion;
              ResponseCard.chat[ResponseCard.chat.length - 1] = lastMessage;
              if (pathName.includes("/Future1/Microframeworks/BMC")) {
                dispatch(
                  selectedCardsSlice.actions.updateFuture1BMCChat(suggestion)
                );
              }
            }
          }
        },
        onerror: function (error: any) {
          dispatch(appSlice.actions.toggleBobThinking(false));
          console.log(error);
          if (keypoints) {
            ResponseCard.loadingKeyPoints = false;
            if (pathName.includes("/Future1/Microframeworks/BMC")) {
              updateFuture1BMCCard({
                card: ResponseCard,
                projectId,
                currentFuture,
              });
            }
          }
        },
        onclose: function () {
          console.log("connection closed");
          if (pathName.includes("/Future1/Microframeworks/BMC")) {
            if (next && ResponseCard?.cardName !== "Revenue Streams") {
              updateFuture1BMCCard({
                card: ResponseCard,
                projectId,
                future: currentFuture,
              })
                .unwrap()
                .then((data: any) => {
                  nextFuture1BMCCard({
                    projectId,
                    future: currentFuture,
                    cardNumber: ResponseCard?.cardNumber,
                  });
                });
            }
            if (!next && keypoints) {
              updateFuture1BMCCard({
                card: ResponseCard,
                projectId,
                future: currentFuture,
              });
            }
          }
        },
      });
    }
  };

  return (
    <>
      <Dialog
        TransitionComponent={SlideTransition}
        keepMounted
        maxWidth={"md"}
        fullWidth
        disableEscapeKeyDown
        open={canvasModalOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            borderRadius: 2,
            backgroundColor: "#fff",
          },
        }}
      >
        <DialogTitle
          component={"div"}
          sx={{
            py: 1,
            px: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {!nextCardTransition ? (
            <Typography variant="body1">{selectedCard?.cardName}</Typography>
          ) : (
            <CircularProgress size={20} />
          )}
          <IconButton size="small" onClick={closeCanvasModal}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ p: 2 }}>
          {!nextFuture1BMCLoading && !nextFuture1BMCError && (
            <Stack
              direction={"row"}
              alignItems={"stretch"}
              justifyContent={"flex-start"}
              sx={{ width: "100%" }}
            >
              <Stack
                direction={"column"}
                justifyContent={"flex-start"}
                alignItems={"flext-start"}
                sx={{
                  pr: 2,
                  width: "50%",
                  height: "65vh",
                  overflowY: "auto",
                }}
              >
                {!bobThinking ? (
                  <>
                    {!cardStatus?.loading && !cardStatus?.error && (
                      <>
                        {selectedCard?.keyPoints !== "" &&
                          selectedCard?.keyPoints !== null ? (
                          <ul
                            style={{
                              margin: "0px",
                              padding: "0px 0px 0px 20px",
                            }}
                          >
                            {selectedCard?.keyPoints
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
                    {!cardStatus?.loading && cardStatus?.error && (
                      <Stack
                        direction={"column"}
                        flexGrow={1}
                        justifyContent={"center"}
                        alignItems={"center"}
                        sx={{ width: "100%" }}
                      >
                        <Typography>Something went Wrong..!</Typography>
                      </Stack>
                    )}
                  </>
                ) : (
                  <Stack
                    flexGrow={1}
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{ width: "100%" }}
                  >
                    <CircularProgress />
                  </Stack>
                )}
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"flex-start"}
                alignItems={"flext-start"}
                sx={{
                  pl: 2,
                  width: "50%",
                  height: "65vh",
                }}
              >
                {activeBubble === "bob" ? (
                  <MessageBox
                    header={false}
                    height={1000}
                    sendMessage={userMessage}
                    messages={selectedCard?.chat}
                    color={`#f6f5f4`}
                    textbox={true}
                  />
                ) : (
                  <CommentBox
                    postComment={() => { }}
                    comments={[
                      {
                        content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga`,
                        owner: false,
                      },
                      {
                        content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga`,
                        owner: false,
                      },
                    ]}
                    color={`#f6f5f4`}
                  />
                )}
                <Stack
                  spacing={2}
                  direction={"column"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  sx={{
                    pt: 1,
                  }}
                >
                  <IconButton
                    onClick={() => setActiveBubble("bob")}
                    sx={{
                      p: 1.5,
                      backgroundColor: `${theme.palette.primary.main}${activeBubble === "bob" ? "" : "30"
                        }`,
                      "&:hover": {
                        backgroundColor: `${theme.palette.primary.main}${activeBubble === "bob" ? "" : "30"
                          }`,
                      },
                    }}
                  >
                    <AutoAwesomeIcon
                      sx={{
                        color: `${activeBubble === "bob" ? "white" : ""}`,
                        fontSize: "30px",
                      }}
                    />
                  </IconButton>
                  <IconButton
                    onClick={() => setActiveBubble("comment")}
                    sx={{
                      p: 1.5,
                      backgroundColor: `${theme.palette.primary.main}${activeBubble === "comment" ? "" : "30"
                        }`,
                      "&:hover": {
                        backgroundColor: `${theme.palette.primary.main}${activeBubble === "comment" ? "" : "30"
                          }`,
                      },
                    }}
                  >
                    <ChatBubbleOutlineOutlinedIcon
                      sx={{
                        color: `${activeBubble === "comment" ? "white" : ""}`,
                        fontSize: "25px",
                      }}
                    />
                  </IconButton>
                  <IconButton
                    sx={{
                      p: 1.5,
                      backgroundColor: `${theme.palette.primary.main}${activeBubble === "settings" ? "" : "30"
                        }`,
                      "&:hover": {
                        backgroundColor: `${theme.palette.primary.main}${activeBubble === "settings" ? "" : "30"
                          }`,
                      },
                    }}
                  >
                    <TuneSharpIcon
                      sx={{
                        color: `${activeBubble === "settings" ? "white" : ""}`,
                        fontSize: "25px",
                      }}
                    />
                  </IconButton>
                </Stack>
              </Stack>
            </Stack>
          )}
          {nextFuture1BMCLoading && !nextFuture1BMCError && (
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              sx={{ width: "100%", height: "65vh" }}
            >
              <CircularProgress />
            </Stack>
          )}
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2 }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            sx={{
              width: "100%",
            }}
          >
            <Button
              disabled={nextCardTransition}
              onClick={() => generateKeypoints(false)}
              size="small"
              variant="outlined"
              color="primary"
              sx={{ mr: 2 }}
            >
              Load Keypoints
            </Button>
            <Button
              disabled={nextCardTransition}
              onClick={() => generateKeypoints(true)}
              size="small"
              variant="contained"
              color="primary"
            >
              Next Card
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CanvasModal;
