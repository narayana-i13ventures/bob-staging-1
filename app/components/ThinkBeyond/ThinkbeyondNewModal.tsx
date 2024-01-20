"use client";
import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  useBobSuggestionMutation,
  useNextThinknbeyondCardMutation,
  usePrefillFuture3Mutation,
  useUpdateThinkbeyondCardMutation,
} from "@/lib/redux/ThinkbeyondApi";
import {
  selectedCardsSlice,
  selectedThinkbeyond,
} from "@/lib/redux/slices/SelectedSlice";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import MessageBox from "../Bob/MessageBox";
import { useParams } from "next/navigation";
import SlideTransition from "../Utils/Slide";
import CommentBox from "../canvas/CommentBox";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import React, { ChangeEvent, useEffect, useState } from "react";
import DialogContent from "@mui/material/DialogContent";
import TuneSharpIcon from "@mui/icons-material/TuneSharp";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useSession } from "next-auth/react";
import { useLazyGetChatQuery, useSaveChatMutation } from "@/lib/redux/ChatApi";
import { useLazyGetProjectByIdQuery } from "@/lib/redux/projectApi";
import { usePrefillFutuer1BMCMutation } from "@/lib/redux/BMCApi";
import {
  useCreateCommentMutation,
  useLazyGetAllCommentsQuery,
} from "@/lib/redux/CommentApi";
const ThinkbeyondNewModal = (props: any) => {
  const { ThinkbeyondCards } = props;
  const theme = useTheme();
  const dispatch = useDispatch();
  const { data }: any = useSession();
  const { projectId } = useParams();
  const [activeBubble, setActiveBubble] = useState("bob");
  const selectedThinkbeyondCard = useSelector(selectedThinkbeyond);
  const { ThinkbeyondModalOpen, BobMessages, bobThinking }: any =
    useSelector(selectApp);
  const [bobSuggestion] = useBobSuggestionMutation();
  const [
    getProjectById,
    {
      data: project_data,
      isLoading: project_data_loading,
      isError: project_data_error,
      isFetching: project_data_fetching,
    },
  ] = useLazyGetProjectByIdQuery();
  const [bobHelpUpdating, setBobHelpUpdating] = useState(false);
  const [nextThinkbeyondCard] = useNextThinknbeyondCardMutation();
  const [nextCardTransition, setNextCardTransition] = useState(false);
  const [updatedThinkbeyondCard] = useUpdateThinkbeyondCardMutation();
  const [
    getChat,
    { data: chat, isLoading: chat_loading, isFetching: chat_fetching },
  ] = useLazyGetChatQuery();
  const [saveChat, { isLoading: save_chat_loading }] = useSaveChatMutation();

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
  useEffect(() => {
    if (
      selectedThinkbeyondCard !== null &&
      ThinkbeyondModalOpen &&
      project_data?.project?.owner?.[0]?.user_id !== undefined
      // && project_data?.project?.is_owner
    ) {
      getChat({
        // userId: data?.user?.user_id,
        userId: project_data?.project?.owner?.[0]?.user_id,
        projectId,
        future: 123,
        canvas_type: 1,
        cardNumber: 0,
      });
      getComments({
        userId: data?.user?.user_id,
        projectId,
        future: 123,
        canvas_type: 1,
        cardNumber: 0,
      });
    }
  }, [
    projectId,
    ThinkbeyondModalOpen,
    // project_data?.project?.is_owner,
    project_data?.project?.owner?.[0]?.user_id,
  ]);

  useEffect(() => {
    if (selectedThinkbeyondCard !== null && ThinkbeyondModalOpen) {
      getProjectById({
        projectId: projectId,
        userId: data?.user?.user_id,
      });
    }
  }, [projectId, data?.user?.user_id, ThinkbeyondModalOpen]);

  useEffect(() => {
    if (!project_data?.project?.is_owner) {
      setActiveBubble("bob");
    } else {
      setActiveBubble("bob");
    }
  }, [project_data?.project?.is_owner, ThinkbeyondModalOpen]);

  const closeThinkbeyondModal = () => {
    dispatch(appSlice.actions.toggleThinkbeyondModalOpen(false));
    if (project_data?.project?.is_owner) {
      setActiveBubble("bob");
      dispatch(
        appSlice.actions.setGlobalSnackBar({
          open: true,
          content: `Card Updating`,
          clossable: false,
        })
      );
      updatedThinkbeyondCard({
        card: selectedThinkbeyondCard,
        projectId,
        userId: data?.user?.user_id,
      })
        .unwrap()
        .then((response: any) => {
          dispatch(
            appSlice.actions.setGlobalSnackBar({
              open: true,
              content: `Card Updated`,
              clossable: false,
            })
          );
        });
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    heading: string
  ) => {
    const updatedText = e?.target?.value;
    dispatch(
      selectedCardsSlice.actions.updateThinkbeyondText({
        heading,
        text: updatedText,
      })
    );
  };
  const postUserComment = (content: any) => {
    if (selectedThinkbeyondCard !== undefined) {
      postComment({
        userId: data?.user?.user_id,
        projectId: projectId,
        future: 123,
        cardNumber: 0,
        canvas_type: 1,
        content,
      });
    }
  };
  const nextCard = () => {
    const shouldSendRequest = selectedThinkbeyondCard?.cardInfo?.every(
      (info: any) => info?.text && info.text.trim() !== ""
    );
    if (project_data?.project?.is_owner) {
      if (
        selectedThinkbeyondCard?.cardNumber !== 3 &&
        selectedThinkbeyondCard?.cardNumber !== 6 &&
        selectedThinkbeyondCard?.cardNumber !== 9
      ) {
        if (shouldSendRequest) {
          setNextCardTransition(true);
          updatedThinkbeyondCard({
            card: selectedThinkbeyondCard,
            projectId,
            userId: data?.user?.user_id,
          })
            .unwrap()
            .then((newCard: any) => {
              nextThinkbeyondCard({
                projectId,
                cardNumber: selectedThinkbeyondCard?.cardNumber,
                userId: data?.user?.user_id,
              })
                .unwrap()
                .then((data: any) => {
                  setNextCardTransition(false);
                })
                .catch(() => {
                  setNextCardTransition(false);
                  dispatch(
                    appSlice.actions.setGlobalSnackBar({
                      open: true,
                      content: `Error Going to next Card`,
                      clossable: true,
                    })
                  );
                });
            })
            .catch(() => {
              setNextCardTransition(false);
              dispatch(
                appSlice.actions.setGlobalSnackBar({
                  open: true,
                  content: `Error Going to next Card`,
                  clossable: true,
                })
              );
            });
        } else {
          dispatch(
            appSlice.actions.setGlobalSnackBar({
              open: true,
              content: `Complete The Card Information to go to Next Card`,
              clossable: true,
            })
          );
        }
      } else {
        setNextCardTransition(true);
        updatedThinkbeyondCard({
          card: selectedThinkbeyondCard,
          projectId,
          userId: data?.user?.user_id,
        })
          .unwrap()
          .then((response: any) => {
            if (
              selectedThinkbeyondCard?.cardNumber === 3 &&
              ThinkbeyondCards?.[0]?.future_1_mfs?.locked === true
            ) {
              setNextCardTransition(false);
              dispatch(appSlice.actions.toggleThinkbeyondModalOpen(false));
              dispatch(
                appSlice.actions.toggleThinkbeyondActivity({
                  open: true,
                  type: "future1_microframeworks",
                })
              );
            } else {
              nextThinkbeyondCard({
                projectId,
                cardNumber: selectedThinkbeyondCard?.cardNumber,
                userId: data?.user?.user_id,
              })
                .unwrap()
                .then((response: any) => {
                  setNextCardTransition(false);
                  dispatch(appSlice.actions.toggleThinkbeyondModalOpen(false));
                })
                .catch(() => {
                  setNextCardTransition(false);
                  dispatch(appSlice.actions.toggleThinkbeyondModalOpen(false));
                  dispatch(
                    appSlice.actions.setGlobalSnackBar({
                      open: true,
                      content: `Error Going to next Card`,
                      clossable: true,
                    })
                  );
                });
            }
            if (selectedThinkbeyondCard?.cardNumber === 6) {
              dispatch(
                appSlice.actions.toggleThinkbeyondActivity({
                  open: true,
                  type: "future2_microframeworks",
                })
              );
            } else if (selectedThinkbeyondCard?.cardNumber === 9) {
              dispatch(
                appSlice.actions.toggleThinkbeyondActivity({
                  open: true,
                  type: "future2_microframeworks",
                })
              );
            }
          })
          .catch(() => {
            setNextCardTransition(false);
            dispatch(
              appSlice.actions.setGlobalSnackBar({
                open: true,
                content: `Error Going to next Card`,
                clossable: true,
              })
            );
          });
      }
    } else {
      if (
        selectedThinkbeyondCard?.cardNumber !== 3 &&
        selectedThinkbeyondCard?.cardNumber !== 6 &&
        selectedThinkbeyondCard?.cardNumber !== 9
      ) {
        for (const card of ThinkbeyondCards) {
          for (const key in card) {
            if (typeof card[key] === "object" && card[key] !== null) {
              if (
                card[key]["cardNumber"] ===
                selectedThinkbeyondCard?.cardNumber + 1
              ) {
                if (card[key]["locked"] !== true) {
                  setNextCardTransition(true);
                  nextThinkbeyondCard({
                    projectId,
                    cardNumber: selectedThinkbeyondCard?.cardNumber,
                    userId: data?.user?.user_id,
                  })
                    .unwrap()
                    .then((response: any) => {
                      setNextCardTransition(false);
                    })
                    .catch(() => {
                      setNextCardTransition(false);
                      dispatch(
                        appSlice.actions.toggleThinkbeyondModalOpen(false)
                      );
                      dispatch(
                        appSlice.actions.setGlobalSnackBar({
                          open: true,
                          content: `Error Going to next Card`,
                          clossable: true,
                        })
                      );
                    });
                } else {
                  dispatch(appSlice.actions.toggleThinkbeyondModalOpen(false));
                  dispatch(
                    appSlice.actions.setGlobalSnackBar({
                      open: true,
                      content: `Next Card is Locked`,
                      clossable: true,
                    })
                  );
                }
              }
            }
          }
        }
      } else {
        setNextCardTransition(true);
        nextThinkbeyondCard({
          projectId,
          cardNumber: selectedThinkbeyondCard?.cardNumber,
          userId: data?.user?.user_id,
        })
          .unwrap()
          .then((response: any) => {
            setNextCardTransition(false);
            dispatch(appSlice.actions.toggleThinkbeyondModalOpen(false));
          })
          .catch(() => {
            setNextCardTransition(false);
            dispatch(appSlice.actions.toggleThinkbeyondModalOpen(false));
            dispatch(
              appSlice.actions.setGlobalSnackBar({
                open: true,
                content: `Error Going to next Card`,
                clossable: true,
              })
            );
          });
      }
    }
  };

  const handleAskBobHelp = () => {
    const shouldSendRequest = selectedThinkbeyondCard?.cardInfo?.every(
      (info: any) => info?.text && info.text.trim() !== ""
    );
    if (ThinkbeyondModalOpen && shouldSendRequest) {
      addMessage();
    } else {
      dispatch(
        appSlice.actions.setGlobalSnackBar({
          open: true,
          content: `Complete The Card Information to take Bob's Help`,
          clossable: true,
        })
      );
    }
  };

  async function addMessage() {
    setBobHelpUpdating(true);
    const bobData: any = {
      projectId,
      cardNumber: selectedThinkbeyondCard?.cardNumber,
      bobMessages:
        chat && chat.length > 0
          ? chat.map((message: any) => ({
              role: message?.role_text,
              content: message?.chat_text,
              time: message?.created_at,
            }))
          : [
              {
                content:
                  "Hi, I'm Bob! 👋 Start working on your ThinkBeyond Canvas and I'll gradually give you advice and suggestions!",
                role: "assistant",
              },
            ],
      userId: data?.user?.user_id,
    };
    const shouldSendRequest = selectedThinkbeyondCard?.cardInfo?.every(
      (info: any) => info?.text && info.text.trim() !== ""
    );
    if (!shouldSendRequest) {
      dispatch(
        appSlice.actions.setGlobalSnackBar({
          open: true,
          content: "Card is Empty",
          clossable: true,
        })
      );
      return;
    }
    dispatch(appSlice.actions.setBobMessages());
    dispatch(appSlice.actions.toggleBobThinking(true));
    updatedThinkbeyondCard({
      card: selectedThinkbeyondCard,
      projectId,
      userId: data?.user?.user_id,
    })
      .unwrap()
      .then((newData: any) => {
        bobSuggestion(bobData)
          .unwrap()
          .then((response: any) => {
            // dispatch(appSlice.actions.updateBobMessages(response?.message));
            setBobHelpUpdating(false);
            saveChat({
              userId: data?.user?.user_id,
              projectId,
              future: 123,
              canvas_type: 1,
              cardNumber: 0,
              chat: [
                {
                  role: "assistant",
                  content: response?.message,
                  time: moment(Date.now()).format(
                    "ddd, DD MMM YYYY HH:mm:ss [GMT]"
                  ),
                },
              ],
              cacheUpdate: false,
            });
          })
          .catch(() => {
            setBobHelpUpdating(false);
            dispatch(appSlice.actions.toggleBobThinking(false));
            dispatch(appSlice.actions.removeBobMessages());
            dispatch(
              appSlice.actions.setGlobalSnackBar({
                open: true,
                content: "Bob is Not Able to think",
                clossable: true,
              })
            );
          })
          .finally(() => {
            setBobHelpUpdating(false);
            dispatch(appSlice.actions.toggleBobThinking(false));
          });
      })
      .catch(() => {
        setBobHelpUpdating(false);
        dispatch(
          appSlice.actions.setGlobalSnackBar({
            open: true,
            content: "Error Updating Card",
            clossable: true,
          })
        );
      });
  }
  return (
    <>
      <Dialog
        TransitionComponent={SlideTransition}
        keepMounted
        maxWidth={"md"}
        fullWidth
        disableEscapeKeyDown
        open={ThinkbeyondModalOpen}
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
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {!nextCardTransition ? (
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {selectedThinkbeyondCard?.cardName}
            </Typography>
          ) : (
            <CircularProgress size={20} />
          )}
          <IconButton size="small" onClick={closeThinkbeyondModal}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ p: 2 }}>
          <Stack
            direction={"row"}
            alignItems={"stretch"}
            justifyContent={"flex-start"}
            sx={{ width: "100%" }}
          >
            {!nextCardTransition && (
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
                {selectedThinkbeyondCard?.cardInfo?.map(
                  (info: any, index: number) => {
                    return (
                      <Box component={"div"} key={index}>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                          {info?.heading}
                        </Typography>
                        <TextField
                          id={`think-beyond-answer-${index}`}
                          placeholder={"Enter your text here"}
                          disabled={!project_data?.project?.is_owner}
                          multiline
                          fullWidth
                          value={info?.text}
                          minRows={4}
                          maxRows={4}
                          onChange={(e: any) =>
                            handleInputChange(e, info.heading)
                          }
                          InputProps={{
                            sx: {
                              p: 1,
                              mb:
                                selectedThinkbeyondCard?.cardInfo?.length -
                                  1 ===
                                index
                                  ? 0
                                  : 3,
                              fontSize: "13px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderWidth: "1px !important",
                              },
                            },
                          }}
                        />
                      </Box>
                    );
                  }
                )}
              </Stack>
            )}
            {nextCardTransition && (
              <Stack
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  pr: 2,
                  width: "50%",
                  height: "65vh",
                  overflowY: "auto",
                }}
              >
                <CircularProgress />
              </Stack>
            )}
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
                {activeBubble === "bob" && project_data?.project?.is_owner && (
                  <MessageBox
                    header={false}
                    height={1000}
                    sendMessage={() => {}}
                    messages={chat}
                    textbox={false}
                    color={`#f6f5f4`}
                    loading={chat_fetching}
                    saving={save_chat_loading}
                  />
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
                alignItems={"center"}
                justifyContent={"flex-start"}
                sx={{
                  flexGrow: 1,
                  width: "10%",
                  pt: 1,
                }}
              >
                {project_data?.project?.is_owner && (
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
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2 }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={
              project_data?.project?.is_owner ? "space-between" : "flex-end"
            }
            sx={{
              width: "100%",
            }}
          >
            {project_data?.project?.is_owner && (
              <Button
                disabled={bobThinking || nextCardTransition || bobHelpUpdating}
                onClick={handleAskBobHelp}
                size="small"
                variant="outlined"
                color="primary"
              >
                {bobHelpUpdating && (
                  <CircularProgress size={15} sx={{ mr: 2 }} />
                )}
                Ask Bob Tips
              </Button>
            )}
            <Stack component={"div"} direction={"row"} alignItems={"center"}>
              <Button
                disabled={bobThinking || nextCardTransition || bobHelpUpdating}
                onClick={nextCard}
                size="small"
                variant="contained"
                color="primary"
                sx={{ mr: 2 }}
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

export default ThinkbeyondNewModal;
