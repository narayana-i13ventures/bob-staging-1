"use client";
import React, { useRef, useState, useEffect } from "react";
import GrowTransition from "../Utils/Grow";
import {
  Box,
  Avatar,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  IconButton,
  Stack,
  CircularProgress,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useSession } from "next-auth/react";
import { useParams, usePathname } from "next/navigation";
import { appSlice, useDispatch, useSelector } from "@/lib/redux";
import {
  selectedCardsSlice,
  selectedFuture1BMCCard,
} from "@/lib/redux/slices/SelectedSlice";
import { BMCSlice, useUpdateFuture1BMCCardMutation } from "@/lib/redux/BMCApi";
import {
  commentSlice,
  useDeleteCommentMutation,
  useParkCommentMutation,
} from "@/lib/redux/CommentApi";
import { useLazyGetProjectByIdQuery } from "@/lib/redux/projectApi";
const CommentMenu = (props: any) => {
  const { comment } = props;
  const dispatch = useDispatch();
  const pathName = usePathname();
  const commenMenuRef = useRef(null);
  const { data }: any = useSession();
  const { projectId, futureId } = useParams();
  const Future1BMCCard = useSelector(selectedFuture1BMCCard);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [commentMenuOpen, setCommenMenuOpen] = useState(false);
  const [status, setStatus] = useState({
    loading: false,
    error: false,
    success: false,
  });

  const [
    getProjectById,
    {
      data: project_data,
      isLoading: project_data_loading,
      isError: project_data_error,
      isFetching: project_data_fetching,
    },
  ] = useLazyGetProjectByIdQuery();
  const [
    updateFuture1BMCCard,
    {
      isError: UpdateFuture1BMCError,
      isSuccess: UpdateFuture1BMCSuccess,
      isLoading: UpdateFuture1BMCLoading,
    },
  ] = useUpdateFuture1BMCCardMutation();
  const [
    deleteComment,
    {
      isError: delete_comment_error,
      isSuccess: delete_comment_success,
      isLoading: delete_comment_loading,
    },
  ] = useDeleteCommentMutation();
  const [
    parkComment,
    { isLoading: park_comment_loading, isError: park_comment_error },
  ] = useParkCommentMutation();

  useEffect(() => {
    if (selectedCard !== null) {
      getProjectById({
        projectId: projectId,
        userId: data?.user?.user_id,
      });
    }
  }, [projectId, data?.user?.user_id, selectedCard?.cardNumber]);

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

  useEffect(() => {
    setStatus({
      success: delete_comment_success,
      loading: delete_comment_loading || park_comment_loading,
      error: delete_comment_error || park_comment_error,
    });
  }, [
    delete_comment_success,
    delete_comment_loading,
    park_comment_loading,
    delete_comment_error,
    park_comment_error,
  ]);

  const currentFuture =
    futureId === "Future1"
      ? 1
      : futureId === "Future2"
      ? 2
      : futureId === "Future3"
      ? 3
      : 123;
  const incorporateComment = async () => {
    const responseCard = { ...selectedCard };
    responseCard.keyPoints = "";
    if (pathName.includes("/Future1/Microframeworks/BMC")) {
      dispatch(
        selectedCardsSlice.actions.updateSelectedFuture1BMCCard(responseCard)
      );
    }
    setCommenMenuOpen(false);
    let fullKeypoints = "";
    const baseUrl = "https://bobapi.azurewebsites.net/v1";
    dispatch(appSlice.actions.toggleBobThinking(true));
    dispatch(appSlice.actions.toggleBobGenerating(true));
    await fetchEventSource(`${baseUrl}/comment/incorporatecomment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: data?.user?.user_id,
        project_id: projectId,
        future: currentFuture,
        level: 0,
        comment_id: comment?.comment_id,
        canvas_type: 2,
      }),
      onopen: async function (response: Response) {
        responseCard.loadingKeyPoints = false;
        dispatch(
          selectedCardsSlice.actions.updateSelectedFuture1BMCCard(responseCard)
        );
        return Promise.resolve();
      },
      onmessage: function (res: any) {
        const { data: streamResponse, type } = res;
        if (!!streamResponse) {
          const { suggestion } = JSON.parse(streamResponse);
          if (suggestion === "") return;
          fullKeypoints = fullKeypoints + suggestion;
          responseCard.keyPoints = fullKeypoints;
          if (pathName.includes("/Future1/Microframeworks/BMC")) {
            dispatch(
              selectedCardsSlice.actions.updateFuture1BMCKeyPoints(suggestion)
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
                    if (card.cardNumber === responseCard?.cardNumber) {
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
        }
      },
      onerror: function (error: any) {
        dispatch(appSlice.actions.toggleBobThinking(false));
        dispatch(appSlice.actions.toggleBobGenerating(false));
        console.log(error);
        if (pathName.includes("/Future1/Microframeworks/BMC")) {
          responseCard.loadingKeyPoints = false;

          dispatch(
            selectedCardsSlice.actions.updateSelectedFuture1BMCCard(
              responseCard
            )
          );
          dispatch(
            commentSlice.util.updateQueryData(
              "getAllComments",
              {
                userId: data?.userId,
                projectId: data?.projectId,
                future: data?.future,
                canvas_type: data?.canvas_type,
                cardNumber: data?.cardNumber,
              },
              (draft: any) => {
                return draft?.map((comment: any) => {
                  if (comment?.comment_id === data?.comment_id) {
                    return {
                      ...comment,
                      incorporated: true,
                    };
                  } else {
                    return comment;
                  }
                });
              }
            )
          );
          updateFuture1BMCCard({
            card: responseCard,
            projectId,
            currentFuture,
            userId: data?.user?.user_id,
          });
        }
      },
      onclose: function () {
        console.log("connection closed");
        dispatch(appSlice.actions.toggleBobThinking(false));
        if (pathName.includes("/Future1/Microframeworks/BMC")) {
          updateFuture1BMCCard({
            card: responseCard,
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
        }
      },
    });
  };
  const parkUserComment = () => {
    setCommenMenuOpen(false);
    parkComment({
      userId: data?.user?.user_id,
      projectId: projectId,
      future: currentFuture,
      canvas_type: pathName?.includes("BMC")
        ? 2
        : pathName?.includes("CVP")
        ? 3
        : 1,
      cardNumber: selectedCard?.cardNumber,
      comment_id: comment?.comment_id,
      level: 0,
    });
  };
  const deleteUserComment = () => {
    setCommenMenuOpen(false);
    deleteComment({
      userId: data?.user?.user_id,
      projectId: projectId,
      future: currentFuture,
      canvas_type: pathName?.includes("BMC")
        ? 2
        : pathName?.includes("CVP")
        ? 3
        : 1,
      cardNumber: pathName?.includes("Thinkbeyond")
        ? 0
        : selectedCard?.cardNumber,
      comment_id: comment?.comment_id,
      level: 0,
    });
  };
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        alignItems={"center"}
      >
        {status?.loading && <CircularProgress size={15} />}
        <IconButton
          disabled={status?.loading}
          ref={commenMenuRef}
          onClick={() => setCommenMenuOpen(true)}
          component={"div"}
          sx={{
            cursor: "pointer",
          }}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Stack>
      <Popover
        disablePortal
        open={commentMenuOpen}
        TransitionComponent={GrowTransition}
        anchorEl={commenMenuRef?.current}
        onClose={() => setCommenMenuOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            p: 1,
            zIndex: 100,
            width: "190px",
            borderRadius: 2,
            overflow: "hidden",
            backgroundColor: "#fff",
          },
        }}
      >
        <MenuList>
          {project_data?.project?.is_owner && (
            <MenuItem
              disabled={comment?.parked}
              onClick={parkUserComment}
              sx={{
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: `#f6f5f4`,
                },
              }}
            >
              <ListItemText
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: 12,
                  },
                }}
              >
                Park Comment
              </ListItemText>
            </MenuItem>
          )}
          {project_data?.project?.is_owner && (
            <MenuItem
              disabled={comment?.incorporated}
              onClick={incorporateComment}
              sx={{
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: `#f6f5f4`,
                },
              }}
            >
              <ListItemText
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: 12,
                  },
                }}
              >
                Incorporate Comment
              </ListItemText>
            </MenuItem>
          )}
          {data?.user?.user_id === comment?.commenter?.user_id && (
            <MenuItem
              onClick={deleteUserComment}
              sx={{
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: `#f6f5f4`,
                },
              }}
            >
              <ListItemText
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: 12,
                    color: "red",
                  },
                }}
              >
                Delete Comment
              </ListItemText>
            </MenuItem>
          )}
        </MenuList>
      </Popover>
    </>
  );
};

export default CommentMenu;
