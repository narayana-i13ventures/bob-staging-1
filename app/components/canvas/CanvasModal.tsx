"use client";
import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import MessageBox from "../Bob/MessageBox";
import SlideTransition from "../Utils/Slide";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import AutoAwesomeSharpIcon from '@mui/icons-material/AutoAwesomeSharp';
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import {
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import TuneSharpIcon from '@mui/icons-material/SettingsOutlined';
import CommentBox from "./CommentBox";
import NotificationBtn from "../Shared/NotificationBtn/NotificationBtn";
const CanvasModal = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { canvasModalOpen, canvasTile }: any = useSelector(selectApp);
  const [activeBubble, setActiveBubble] = useState("bob");

  const closeCanvasModal = () => {
    dispatch(appSlice.actions.toggleCanvasModalOpen(false));
    dispatch(appSlice.actions.toggleCanvasTile(''))
    setActiveBubble("bob");
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
            backgroundColor:'#fff'
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
          <Typography variant="body1">{canvasTile}</Typography>
          <IconButton size="small" onClick={closeCanvasModal}>
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
            <Stack
              direction={"column"}
              justifyContent={"flex-start"}
              alignItems={"flext-start"}
              sx={{
                pr: 2,
                width: "50%",
                height: "75vh",
                overflowY: "auto",
              }}
            >
              <Typography variant="body1" sx={{ fontSize: "14px" }}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                similique libero fuga, reiciendis sunt maiores, eligendi tempora
                nisi laborum sit deserunt modi. Est delectus commodi perferendis
                obcaecati ad placeat consectetur?
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"flex-start"}
              alignItems={"flext-start"}
              sx={{
                pl: 2,
                width: "50%",
                height: "75vh",
              }}
            >
              {activeBubble === "bob" ? (
                <MessageBox
                  header={false}
                  height={1000}
                  sendMessage={() => { }}
                  messages={[
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                    {
                      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                    similique libero fuga, reiciendis sunt maiores, eligendi tempora
                    nisi laborum sit deserunt modi. Est delectus commodi perferendis
                    obcaecati ad placeat consectetur?`,
                      role: "assistant",
                    },
                  ]}
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
                    backgroundColor: `${theme.palette.primary.main}${activeBubble === "bob" ? "" : "30"
                      }`,
                    "&:hover": {
                      backgroundColor: `${theme.palette.primary.main}${activeBubble === "bob" ? "" : "30"
                        }`,
                    },
                  }}
                >
                  <AutoAwesomeSharpIcon
                    sx={{
                      color: `${activeBubble === "bob" ? "white" : ""}`,
                      fontSize: "35px",
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
      </Dialog>
    </>
  );
};

export default CanvasModal;
