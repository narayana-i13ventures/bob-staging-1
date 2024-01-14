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
  useUpdateThinkbeyondCardMutation,
} from "@/lib/redux/ThinkbeyondApi";
import {
  selectedCardsSlice,
  selectedThinkbeyond,
} from "@/lib/redux/slices/SelectedSlice";
import Dialog from "@mui/material/Dialog";
import MessageBox from "../Bob/MessageBox";
import { useParams } from "next/navigation";
import SlideTransition from "../Utils/Slide";
import CommentBox from "../canvas/CommentBox";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import React, { ChangeEvent, useState } from "react";
import DialogContent from "@mui/material/DialogContent";
import TuneSharpIcon from "@mui/icons-material/TuneSharp";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
const ThinkbeyondNewModal = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [activeBubble, setActiveBubble] = useState("bob");
  const selectedThinkbeyondCard = useSelector(selectedThinkbeyond);
  const { ThinkbeyondModalOpen, BobMessages, bobThinking }: any =
    useSelector(selectApp);
  const [bobSuggestion] = useBobSuggestionMutation();
  const [bobHelpUpdating, setBobHelpUpdating] = useState(false);
  const [nextThinkbeyondCard] = useNextThinknbeyondCardMutation();
  const [nextCardTransition, setNextCardTransition] = useState(false);
  const [updatedThinkbeyondCard] = useUpdateThinkbeyondCardMutation();

  const closeThinkbeyondModal = () => {
    setActiveBubble("bob");
    dispatch(appSlice.actions.toggleThinkbeyondModalOpen(false));
    dispatch(
      appSlice.actions.setGlobalSnackBar({
        open: true,
        content: `Card Updating`,
        clossable: false,
      })
    );
    updatedThinkbeyondCard({ card: selectedThinkbeyondCard, projectId })
      .unwrap()
      .then((data: any) => {
        dispatch(
          appSlice.actions.setGlobalSnackBar({
            open: true,
            content: `Card Updated`,
            clossable: false,
          })
        );
      });
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

  const nextCard = () => {
    const shouldSendRequest = selectedThinkbeyondCard?.cardInfo?.every(
      (info: any) => info?.text && info.text.trim() !== ""
    );
    if (selectedThinkbeyondCard?.cardNumber !== 3 && selectedThinkbeyondCard?.cardNumber !== 6 && selectedThinkbeyondCard?.cardNumber !== 9) {
      if (shouldSendRequest) {
        setNextCardTransition(true);
        updatedThinkbeyondCard({ card: selectedThinkbeyondCard, projectId })
          .unwrap()
          .then((data: any) => {
            nextThinkbeyondCard({
              projectId,
              cardNumber: selectedThinkbeyondCard?.cardNumber,
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
      updatedThinkbeyondCard({ card: selectedThinkbeyondCard, projectId })
        .unwrap()
        .then((data: any) => {
          dispatch(appSlice.actions.toggleThinkbeyondModalOpen(false))
          nextThinkbeyondCard({
            projectId,
            cardNumber: selectedThinkbeyondCard?.cardNumber,
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
    const data: any = {
      projectId,
      cardNumber: selectedThinkbeyondCard?.cardNumber,
      bobMessages: BobMessages,
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
    updatedThinkbeyondCard({ card: selectedThinkbeyondCard, projectId })
      .unwrap()
      .then((newData: any) => {
        setBobHelpUpdating(false);
        bobSuggestion(data)
          .unwrap()
          .then((data: any) => {
            dispatch(appSlice.actions.updateBobMessages(data?.message));
          })
          .catch(() => {
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
                          placeholder={info?.placeholder}
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
              {activeBubble === "bob" ? (
                <MessageBox
                  header={false}
                  height={1000}
                  sendMessage={() => { }}
                  messages={BobMessages}
                  color={`#f6f5f4`}
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
                  flexGrow: 1,
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
              disabled={bobThinking || nextCardTransition || bobHelpUpdating}
              onClick={handleAskBobHelp}
              size="small"
              variant="outlined"
              color="primary"
            >
              {bobHelpUpdating && <CircularProgress size={15} sx={{ mr: 2 }} />}
              Ask Bob's Help
            </Button>
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
