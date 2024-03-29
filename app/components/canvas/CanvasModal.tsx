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
  useUpdateBMCCardMutation,
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
import {
  useCreateCommentMutation,
  useLazyGetAllCommentsQuery,
} from "@/lib/redux/CommentApi";
const CanvasModal = (props: any) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const pathName = usePathname();
  const { project, canvas } = props;
  const { data }: any = useSession();
  const { projectId, futureId } = useParams();
  const [activeBubble, setActiveBubble] = useState("bob");
  const Future1BMCCard = useSelector(selectedFuture1BMCCard);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [
    getChat,
    { data: chat, isLoading: chat_loading, isFetching: chat_fetching },
  ] = useLazyGetChatQuery();

  const [saveChat, { isLoading: save_chat_loading }] = useSaveChatMutation();

  const { canvasModalOpen, bobThinking, bobGenerating }: any =
    useSelector(selectApp);

  const [
    postComment,
    {
      isLoading: comment_loading,
      isSuccess: comment_success,
      isError: comment_error,
    },
  ] = useCreateCommentMutation();

  const [
    getComments,
    {
      data: comments,
      isLoading: get_comments_loading,
      isFetching: get_comments_fetching,
      isError: get_comments_error,
    },
  ] = useLazyGetAllCommentsQuery();

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
    updateBMCCard,
    {
      isError: UpdateFuture1BMCError,
      isSuccess: UpdateFuture1BMCSuccess,
      isLoading: UpdateFuture1BMCLoading,
    },
  ] = useUpdateBMCCardMutation();

  useEffect(() => {
    getThinkbeyondCanvas({ projectId, userId: data?.user?.user_id });
  }, [projectId, data?.user?.user_id]);

  useEffect(() => {
    if (pathName.includes("BMC")) {
      setCardStatus({
        error: UpdateFuture1BMCError,
        loading: UpdateFuture1BMCLoading,
        success: UpdateFuture1BMCSuccess,
      });
    }
  }, [UpdateFuture1BMCError, UpdateFuture1BMCSuccess, UpdateFuture1BMCLoading]);

  useEffect(() => {
    if (pathName.includes("BMC")) {
      setSelectedCard(Future1BMCCard);
    } else {
      setSelectedCard(null);
    }
    return () => {
      setSelectedCard(null);
    };
  }, [pathName, Future1BMCCard]);

  useEffect(() => {
    if (canvasModalOpen === true) {
      if (!project?.project?.is_owner) {
        setActiveBubble("comment");
      } else {
        setActiveBubble("bob");
      }
    }
  }, [project?.project?.is_owner, canvasModalOpen]);

  useEffect(() => {
    if (
      selectedCard !== null &&
      selectedCard !== undefined &&
      canvasModalOpen === true
    ) {
      if (pathName.includes("/Future1/Microframeworks/BMC")) {
        getChat({
          userId: data?.user?.user_id,
          projectId,
          future: currentFuture,
          canvas_type: 2,
          cardNumber: selectedCard?.cardNumber,
        });

        getComments({
          userId: data?.user?.user_id,
          projectId,
          future: currentFuture,
          canvas_type: 2,
          cardNumber: selectedCard?.cardNumber,
        });
      }
      if (pathName.includes("/Future1/Microframeworks/CVP")) {
        getChat({
          userId: data?.user?.user_id,
          projectId,
          future: 1,
          canvas_type: 3,
          cardNumber: selectedCard?.cardNumber,
        });

        getComments({
          userId: data?.user?.user_id,
          projectId,
          future: 1,
          canvas_type: 3,
          cardNumber: selectedCard?.cardNumber,
        });
      }
      if (pathName.includes("/Future2/Microframeworks/CVP")) {
        getChat({
          userId: data?.user?.user_id,
          projectId,
          future: 2,
          canvas_type: 3,
          cardNumber: selectedCard?.cardNumber,
        });

        getComments({
          userId: data?.user?.user_id,
          projectId,
          future: 2,
          canvas_type: 3,
          cardNumber: selectedCard?.cardNumber,
        });
      }
      if (pathName.includes("/Future3/Microframeworks/CVP")) {
        getChat({
          userId: data?.user?.user_id,
          projectId,
          future: 3,
          canvas_type: 3,
          cardNumber: selectedCard?.cardNumber,
        });

        getComments({
          userId: data?.user?.user_id,
          projectId,
          future: 3,
          canvas_type: 3,
          cardNumber: selectedCard?.cardNumber,
        });
      }
    }
  }, [selectedCard?.cardNumber, projectId, data?.user?.user_id]);

  const closeCanvasModal = () => {
    setActiveBubble("bob");
    dispatch(appSlice.actions.toggleCanvasModalOpen(false));
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
      if (pathName.includes("BMC")) {
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

  const postUserComment = (content: any) => {
    if (selectedCard !== undefined) {
      if (content === "") {
        return;
      }

      if (pathName.includes("BMC")) {
        postComment({
          userId: data?.user?.user_id,
          projectId: projectId,
          future: currentFuture,
          cardNumber: selectedCard?.cardNumber,
          canvas_type: 2,
          content,
        });
      }
    }
  };

  const generateKeypoints = (next: any) => {
    const ResponseCard: any = { ...selectedCard };
    ResponseCard.loadingKeyPoints = true;
    ResponseCard.keyPoints = "";
    if (pathName.includes("BMC")) {
      if (currentFuture === 1) {
        dispatch(
          selectedCardsSlice.actions.updateSelectedFuture1BMCCard(ResponseCard)
        );
      }
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
                  loadingKeyPoints: true,
                  keyPoints: "",
                };
              } else {
                return card;
              }
            });
          }
        )
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
      chat: chat?.map((message: any) => ({
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
            ...chat?.map((message: any) => ({
              role: message?.role_text,
              content: message?.chat_text,
              time: message?.created_at,
            })),
            message,
          ],
        };
        if (pathName.includes("BMC")) {
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
              if (pathName.includes("BMC")) {
                if (currentFuture === 1) {
                  dispatch(
                    selectedCardsSlice.actions.updateFuture1BMCKeyPoints(
                      suggestion
                    )
                  );
                }
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
                            loadingKeyPoints: false,
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
              if (pathName.includes("BMC")) {
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
                            temp: true,
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
            if (pathName.includes("BMC")) {
              updateBMCCard({
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
          if (pathName.includes("BMC")) {
            if (keypoints) {
              updateBMCCard({
                card: ResponseCard,
                projectId,
                future: currentFuture,
                userId: data?.user?.user_id,
              })
                .unwrap()
                .then((response: any) => {
                  fullKeypoints = "";
                  dispatch(appSlice.actions.toggleBobGenerating(false));
                })
                .catch((error: any) => {
                  dispatch(appSlice.actions.toggleBobGenerating(false));
                });
            } else {
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
                          (chat: any, index: any) => chat?.temp !== true
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
  const testNextCard = () => {
    if (pathName.includes("/Future1/Microframeworks/BMC")) {
      if (selectedCard?.cardNumber + 1 < 9) {
        dispatch(
          selectedCardsSlice.actions.setSelectedFuture1BMCCard(
            canvas?.find(
              (canvasCard: any) =>
                canvasCard?.cardNumber === selectedCard?.cardNumber + 1
            )
          )
        );
      } else {
        dispatch(
          selectedCardsSlice.actions.setSelectedFuture1BMCCard(
            canvas?.find((canvasCard: any) => canvasCard?.cardNumber === 0)
          )
        );
      }
    }
  };
  const testPreviousCard = () => {
    if (pathName.includes("/Future1/Microframeworks/BMC")) {
      if (selectedCard?.cardNumber - 1 >= 0) {
        dispatch(
          selectedCardsSlice.actions.setSelectedFuture1BMCCard(
            canvas?.find(
              (canvasCard: any) =>
                canvasCard?.cardNumber === selectedCard?.cardNumber - 1
            )
          )
        );
      } else {
        dispatch(
          selectedCardsSlice.actions.setSelectedFuture1BMCCard(
            canvas?.find((canvasCard: any) => canvasCard?.cardNumber === 8)
          )
        );
      }
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
                <Box component={"div"} sx={{ width: "90%", pr: 4 }}>
                  {project?.project?.is_owner && (
                    <>
                      {activeBubble === "bob" && (
                        <MessageBox
                          header={false}
                          height={1000}
                          sendMessage={userMessage}
                          messages={chat}
                          color={`#f6f5f4`}
                          textbox={project?.project?.is_owner}
                          loading={chat_fetching}
                          saving={save_chat_loading}
                        />
                      )}
                    </>
                  )}
                  {activeBubble === "comment" && (
                    <CommentBox
                      postComment={postUserComment}
                      comments={comments}
                      color={`#f6f5f4`}
                      loading={get_comments_fetching}
                      saving={comment_loading}
                    />
                  )}
                </Box>
                <Stack
                  spacing={2}
                  direction={"column"}
                  alignItems={"flex-end"}
                  justifyContent={"flex-start"}
                  sx={{
                    width: "10%",
                    pt: 1,
                  }}
                >
                  {project?.project?.is_owner && (
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
                  )}
                  <IconButton
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
            justifyContent={"space-between"}
            sx={{
              width: "100%",
            }}
          >
            <Button
              disableElevation
              disabled={nextCardTransition || bobGenerating}
              onClick={testPreviousCard}
              size="small"
              variant="contained"
              color="primary"
            >
              Previous Card
            </Button>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-end"}
            >
              {project?.project?.is_owner && (
                <Button
                  disableElevation
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
                disableElevation
                disabled={nextCardTransition || bobGenerating}
                // onClick={nextCard}
                onClick={testNextCard}
                size="small"
                variant="contained"
                color="primary"
              >
                Next Card
              </Button>
            </Stack>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CanvasModal;
