"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import MessageBox from "../Bob/MessageBox";
import SlideTransition from "../Utils/Slide";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import {
  Box,
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
import { useSession } from "next-auth/react";
import {
  chatSlice,
  useLazyGetChatQuery,
  useSaveChatMutation,
} from "@/lib/redux/ChatApi";
import { useLazyGetProjectByIdQuery } from "@/lib/redux/projectApi";
const CanvasModal = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const pathName = usePathname();
  const { data }: any = useSession();
  const { projectId, futureId } = useParams();
  const [activeBubble, setActiveBubble] = useState("bob");
  const Future1BMCCard = useSelector(selectedFuture1BMCCard);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [CardChat, setCardChat] = useState<any>([]);
  const [
    getChat,
    { data: chat, isLoading: chat_loading, isFetching: chat_fetching },
  ] = useLazyGetChatQuery();
  const [saveChat, { isLoading: save_chat_loading }] = useSaveChatMutation();
  const [
    getProjectById,
    {
      data: project_data,
      isLoading: project_data_loading,
      isError: project_data_error,
      isFetching: project_data_fetching,
    },
  ] = useLazyGetProjectByIdQuery();

  const { canvasModalOpen, bobThinking, bobGenerating }: any =
    useSelector(selectApp);
  const currentFuture =
    futureId === "Future1"
      ? 1
      : futureId === "Future2"
      ? 2
      : futureId === "Future3"
      ? 3
      : 0;
  useEffect(() => {
    if (selectedCard !== null && canvasModalOpen) {
      getProjectById({
        projectId: projectId,
        userId: data?.user?.user_id,
      });
    }
  }, [
    projectId,
    data?.user?.user_id,
    canvasModalOpen,
    selectedCard?.cardNumber,
  ]);
  const [cardStatus, setCardStatus] = useState({
    loading: false,
    error: false,
    success: true,
  });

  useEffect(() => {
    if (
      pathName.includes("/Future1/Microframeworks/BMC") &&
      selectedCard !== null &&
      canvasModalOpen &&
      project_data?.project?.owner?.[0]?.user_id !== undefined
    ) {
      getChat({
        userId: project_data?.project?.owner?.[0]?.user_id,
        projectId,
        future: currentFuture,
        canvas_type: 2,
        cardNumber: selectedCard?.cardNumber,
      });
    }
  }, [
    currentFuture,
    projectId,
    selectedCard?.cardNumber,
    canvasModalOpen,
    project_data?.project?.owner?.[0]?.user_id,
  ]);

  useEffect(() => {
    if (
      pathName.includes("/Future1/Microframeworks/BMC") &&
      selectedCard !== null
    ) {
      setCardChat(chat);
    }
  }, [
    currentFuture,
    data?.user?.user_id,
    projectId,
    selectedCard?.cardNumber,
    chat,
    dispatch,
  ]);

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
    getThinkbeyondCanvas({ projectId, userId: data?.user?.user_id });
  }, [projectId, data?.user?.user_id]);

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
      if (message === "" || bobThinking) {
        return;
      }
      if (pathName.includes("/Future1/Microframeworks/BMC")) {
        saveChat({
          userId: data?.user?.user_id,
          projectId,
          future: currentFuture,
          canvas_type: 2,
          cardNumber: selectedCard?.cardNumber,
          chat: [
            {
              role: "user",
              content: message,
              time: moment(Date.now()).format(
                "ddd, DD MMM YYYY HH:mm:ss [GMT]"
              ),
            },
          ],
        })
          .unwrap()
          .then(({ chat }: any) => {
            streamResponse(selectedCard, false, false, {
              role: chat?.role_text,
              content: chat?.chat_text,
              time: moment(chat?.created_at).format(
                "ddd, DD MMM YYYY HH:mm:ss [GMT]"
              ),
            });
          });
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
      streamResponse(ResponseCard, true, next, null);
    }
  };

  const streamResponse = async (
    card: any,
    keypoints = false,
    next: any,
    message: any
  ) => {
    const ResponseCard: any = { ...card };
    let fullMessage = "";
    let fullKeypoints = "";
    let endpoint = "keypoints";
    let streamBody: any = {
      user_id: data?.user?.user_id,
      project_id: projectId,
      future: currentFuture,
      card_number: ResponseCard?.cardNumber,
      chat: CardChat.map((message: any) => ({
        role: message?.role_text,
        content: message?.chat_text,
        time: message?.created_at,
      })),
    };
    if (!!card) {
      if (!keypoints) {
        endpoint = "message";
        streamBody = {
          futureData: getFutureData(),
          chat: [
            ...CardChat.map((message: any) => ({
              role: message?.role_text,
              content: message?.chat_text,
              time: message?.created_at,
            })),
            message,
          ],
        };
        if (pathName.includes("/Future1/Microframeworks/BMC")) {
          dispatch(
            chatSlice.util.updateQueryData(
              "getChat",
              {
                userId: data?.user?.user_id,
                projectId,
                future: currentFuture,
                canvas_type: 2,
                cardNumber: selectedCard?.cardNumber,
              },
              (draft: any) => {
                draft?.push({ role_text: "assistant", chat_text: "" });
              }
            )
          );
        }
      }
      dispatch(appSlice.actions.toggleBobThinking(true));
      dispatch(appSlice.actions.toggleBobGenerating(true));
      const baseUrl = "https://bobapi.azurewebsites.net/v1";
      let apiUrl = `${baseUrl}/bmc`;
      await fetchEventSource(`${apiUrl}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(streamBody),
        onopen: async function (response: Response) {
          if (keypoints) {
            ResponseCard.loadingKeyPoints = false;
            dispatch(
              selectedCardsSlice.actions.updateSelectedFuture1BMCCard(
                ResponseCard
              )
            );
          }
          return Promise.resolve();
        },
        onmessage: function (res: any) {
          const { data: streamResponse, type } = res;
          if (!!streamResponse) {
            const { suggestion } = JSON.parse(streamResponse);
            if (suggestion === "") return;
            if (keypoints) {
              fullKeypoints = fullKeypoints + suggestion;
              ResponseCard.keyPoints = fullKeypoints;
              if (pathName.includes("/Future1/Microframeworks/BMC")) {
                dispatch(
                  selectedCardsSlice.actions.updateFuture1BMCKeyPoints(
                    suggestion
                  )
                );
                dispatch(
                  BMCSlice.util.updateQueryData(
                    "GetFuture1BMCCanvas",
                    {
                      projectId: projectId,
                      future: currentFuture,
                      userId: data?.user?.user_id,
                    },
                    (draft: any) => {
                      return draft.map((card: any) => {
                        if (card.cardNumber === ResponseCard?.cardNumber) {
                          return {
                            ...card,
                            keyPoints: fullKeypoints,
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
              if (pathName.includes("/Future1/Microframeworks/BMC")) {
                fullMessage = fullMessage + suggestion;
                dispatch(
                  chatSlice.util.updateQueryData(
                    "getChat",
                    {
                      userId: data?.user?.user_id,
                      projectId,
                      future: currentFuture,
                      canvas_type: 2,
                      cardNumber: selectedCard?.cardNumber,
                    },
                    (draft: any) => {
                      return draft?.map((chat: any, index: any) => {
                        if (index === draft?.length - 1) {
                          return {
                            ...chat,
                            chat_text: chat?.chat_text + suggestion,
                          };
                        } else {
                          return chat;
                        }
                      });
                    }
                  )
                );
              }
            }
          }
        },
        onerror: function (error: any) {
          dispatch(appSlice.actions.toggleBobThinking(false));
          dispatch(appSlice.actions.toggleBobGenerating(false));
          console.log(error);
          if (keypoints) {
            ResponseCard.loadingKeyPoints = false;
            if (pathName.includes("/Future1/Microframeworks/BMC")) {
              updateFuture1BMCCard({
                card: ResponseCard,
                projectId,
                currentFuture,
                userId: data?.user?.user_id,
              });
            }
          }
        },
        onclose: function () {
          console.log("connection closed");
          dispatch(appSlice.actions.toggleBobThinking(false));
          if (pathName.includes("/Future1/Microframeworks/BMC")) {
            // if (next && ResponseCard?.cardName !== "Revenue Streams") {
            //   setNextCardTransition(true);
            //   nextFuture1BMCCard({
            //     projectId,
            //     future: currentFuture,
            //     cardNumber: ResponseCard?.cardNumber,
            //     userId: data?.user?.user_id,
            //   })
            //     .unwrap()
            //     .then((response: any) => {
            //       setNextCardTransition(false);
            //       dispatch(appSlice.actions.toggleBobGenerating(false));
            //     })
            //     .catch((error: any) => {
            //       setNextCardTransition(false);
            //     });
            //   // updateFuture1BMCCard({
            //   //   card: ResponseCard,
            //   //   projectId,
            //   //   future: currentFuture,
            //   //   userId: data?.user?.user_id,
            //   // })
            //   //   .unwrap()
            //   //   .then((response: any) => {
            //   //     fullKeypoints = "";
            //   //     dispatch(appSlice.actions.toggleBobGenerating(false));
            //   //     setNextCardTransition(true);
            //   //     nextFuture1BMCCard({
            //   //       projectId,
            //   //       future: currentFuture,
            //   //       cardNumber: ResponseCard?.cardNumber,
            //   //       userId: data?.user?.user_id,
            //   //     })
            //   //       .unwrap()
            //   //       .then((response: any) => {
            //   //         setNextCardTransition(false);
            //   //       })
            //   //       .catch((error: any) => {
            //   //         setNextCardTransition(false);
            //   //       });
            //   //   });
            // }
            if (!next && keypoints) {
              updateFuture1BMCCard({
                card: ResponseCard,
                projectId,
                future: currentFuture,
                userId: data?.user?.user_id,
              })
                .unwrap()
                .then((response: any) => {
                  fullKeypoints = "";
                  dispatch(appSlice.actions.toggleBobGenerating(false));
                });
            }
            if (!next && !keypoints) {
              saveChat({
                userId: data?.user?.user_id,
                projectId,
                future: currentFuture,
                canvas_type: 2,
                cardNumber: ResponseCard?.cardNumber,
                chat: [
                  {
                    role: "assistant",
                    content: fullMessage,
                    time: moment(Date.now()).format(
                      "ddd, DD MMM YYYY HH:mm:ss [GMT]"
                    ),
                  },
                ],
                cacheUpdate: false,
              })
                .unwrap()
                .then((response: any) => {
                  fullMessage = "";
                  dispatch(appSlice.actions.toggleBobGenerating(false));
                  dispatch(
                    chatSlice.util.updateQueryData(
                      "getChat",
                      {
                        userId: data?.user?.user_id,
                        projectId,
                        future: currentFuture,
                        canvas_type: 2,
                        cardNumber: selectedCard?.cardNumber,
                      },
                      (draft: any) => {
                        return draft?.filter(
                          (chat: any, index: any) => index !== draft.length - 1
                        );
                      }
                    )
                  );
                });
            }
          }
        },
      });
    }
  };

  const nextCard = () => {
    setNextCardTransition(true);
    nextFuture1BMCCard({
      projectId,
      future: currentFuture,
      cardNumber: selectedCard?.cardNumber,
      userId: data?.user?.user_id,
    })
      .unwrap()
      .then((response: any) => {
        setNextCardTransition(false);
      })
      .catch((error: any) => {
        setNextCardTransition(false);
      });
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
                {!selectedCard?.loadingKeyPoints ? (
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
                  // <>
                  //   {!cardStatus?.loading && !cardStatus?.error && (
                  //     <>
                  //       {selectedCard?.keyPoints !== "" &&
                  //       selectedCard?.keyPoints !== null ? (
                  //         <ul
                  //           style={{
                  //             margin: "0px",
                  //             padding: "0px 0px 0px 20px",
                  //           }}
                  //         >
                  //           {selectedCard?.keyPoints
                  //             ?.split("--")
                  //             .filter((keypoint: any) => keypoint !== "")
                  //             .map((keypoint: any, index: number) => (
                  //               <li key={index}>
                  //                 <Typography
                  //                   variant="body1"
                  //                   sx={{ fontSize: "14px", mb: 1 }}
                  //                 >
                  //                   {keypoint}
                  //                 </Typography>
                  //               </li>
                  //             ))}
                  //         </ul>
                  //       ) : (
                  //         <Typography
                  //           variant="h6"
                  //           sx={{
                  //             my: 5,
                  //             width: "100%",
                  //             fontSize: "16PX",
                  //             textAlign: "center",
                  //           }}
                  //         >
                  //           No Information Available
                  //         </Typography>
                  //       )}
                  //     </>
                  //   )}
                  //   {cardStatus?.loading && !cardStatus?.error && (
                  //     <Stack
                  //       direction={"column"}
                  //       flexGrow={1}
                  //       justifyContent={"center"}
                  //       alignItems={"center"}
                  //       sx={{ width: "100%" }}
                  //     >
                  //       <CircularProgress />
                  //     </Stack>
                  //   )}
                  //   {!cardStatus?.loading && cardStatus?.error && (
                  //     <Stack
                  //       direction={"column"}
                  //       flexGrow={1}
                  //       justifyContent={"center"}
                  //       alignItems={"center"}
                  //       sx={{ width: "100%" }}
                  //     >
                  //       <Typography>Something went Wrong..!</Typography>
                  //     </Stack>
                  //   )}
                  // </>
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
                <Box component={'div'} sx={{width:'90%',pr:4}}>
                  {activeBubble === "bob" ? (
                    <MessageBox
                      header={false}
                      height={1000}
                      sendMessage={userMessage}
                      messages={CardChat}
                      color={`#f6f5f4`}
                      textbox={project_data?.project?.is_owner}
                      loading={chat_fetching}
                      saving={save_chat_loading}
                    />
                  ) : (<></>
                    // <CommentBox
                    //   postComment={() => {}}
                    //   comments={[
                    //     {
                    //       content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    //   similique libero fuga`,
                    //       owner: false,
                    //     },
                    //     {
                    //       content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    //   similique libero fuga`,
                    //       owner: false,
                    //     },
                    //   ]}
                    //   color={`#f6f5f4`}
                    // />
                  )}
                </Box>
                <Stack
                  spacing={2}
                  direction={"column"}
                  alignItems={"flex-end"}
                  justifyContent={"flex-start"}
                  sx={{
                    width:'10%',
                    pt: 1,
                  }}
                >
                  <IconButton
                    onClick={() => setActiveBubble("bob")}
                    sx={{
                      p: 1.5,
                      backgroundColor: `${theme.palette.primary.main}${
                        activeBubble === "bob" ? "" : "30"
                      }`,
                      "&:hover": {
                        backgroundColor: `${theme.palette.primary.main}${
                          activeBubble === "bob" ? "" : "30"
                        }`,
                      },
                    }}
                  >
                    <AutoAwesomeIcon
                      sx={{
                        color: `${activeBubble === "bob" ? "white" : ""}`,
                        fontSize: "20px",
                      }}
                    />
                  </IconButton>
                  {/* <IconButton
                    onClick={() => setActiveBubble("comment")}
                    sx={{
                      p: 1.5,
                      backgroundColor: `${theme.palette.primary.main}${
                        activeBubble === "comment" ? "" : "30"
                      }`,
                      "&:hover": {
                        backgroundColor: `${theme.palette.primary.main}${
                          activeBubble === "comment" ? "" : "30"
                        }`,
                      },
                    }}
                  >
                    <ChatBubbleOutlineOutlinedIcon
                      sx={{
                        color: `${activeBubble === "comment" ? "white" : ""}`,
                        fontSize: "20px",
                      }}
                    />
                  </IconButton> */}
                  {/* <IconButton
                    sx={{
                      p: 1.5,
                      backgroundColor: `${theme.palette.primary.main}${
                        activeBubble === "settings" ? "" : "30"
                      }`,
                      "&:hover": {
                        backgroundColor: `${theme.palette.primary.main}${
                          activeBubble === "settings" ? "" : "30"
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
                  </IconButton> */}
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
            {project_data?.project?.is_owner && (
              <Button
                disabled={nextCardTransition || bobGenerating}
                onClick={() => generateKeypoints(false)}
                size="small"
                variant="outlined"
                color="primary"
                sx={{ mr: 2 }}
              >
                Load Keypoints
              </Button>
            )}
            <Button
              disabled={nextCardTransition || bobGenerating}
              // onClick={() => generateKeypoints(true)}
              onClick={nextCard}
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
