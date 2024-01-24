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
  selectedFuture1CVPCard,
  selectedFuture2BMCCard,
  selectedFuture2CVPCard,
  selectedFuture3BMCCard,
  selectedFuture3CVPCard,
} from "@/lib/redux/slices/SelectedSlice";
import { BMCSlice, useUpdateBMCCardMutation } from "@/lib/redux/BMCApi";
import {
  commentSlice,
  useDeleteCommentMutation,
  useParkCommentMutation,
} from "@/lib/redux/CommentApi";
import { useLazyGetProjectByIdQuery } from "@/lib/redux/projectApi";
import { CVPSlice, useUpdateCVPCardMutation } from "@/lib/redux/CVPApi";
const CommentMenu = (props: any) => {
  const { comment, project } = props;
  const dispatch = useDispatch();
  const pathName = usePathname();
  const commenMenuRef = useRef(null);
  const { data }: any = useSession();
  const { projectId, futureId } = useParams();
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [commentMenuOpen, setCommenMenuOpen] = useState(false);
  const Future1BMCCard = useSelector(selectedFuture1BMCCard);
  const Future2BMCCard = useSelector(selectedFuture2BMCCard);
  const Future3BMCCard = useSelector(selectedFuture3BMCCard);
  const Future1CVPCard = useSelector(selectedFuture1CVPCard);
  const Future2CVPCard = useSelector(selectedFuture2CVPCard);
  const Future3CVPCard = useSelector(selectedFuture3CVPCard);
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
    updateBMCCard,
    {
      isError: update_bmc_error,
      isSuccess: update_bmc_success,
      isLoading: update_bmc_loading,
    },
  ] = useUpdateBMCCardMutation();
  const [
    updateCVPCard,
    {
      isError: update_cvp_error,
      isSuccess: update_cvp_success,
      isLoading: update_cvp_loading,
    },
  ] = useUpdateCVPCardMutation();
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

  // useEffect(() => {
  //   if (selectedCard !== null) {
  //     getProjectById({
  //       projectId: projectId,
  //       userId: data?.user?.user_id,
  //     });
  //   }
  // }, [projectId, data?.user?.user_id, selectedCard?.cardNumber]);

  useEffect(() => {
    if (futureId === "Future1") {
      if (pathName.includes("BMC")) {
        setSelectedCard(Future1BMCCard);
      } else if (pathName.includes("CVP")) {
        setSelectedCard(Future1CVPCard);
      }
    }
    if (futureId === "Future2") {
      if (pathName.includes("BMC")) {
        setSelectedCard(Future2BMCCard);
      } else if (pathName.includes("CVP")) {
        setSelectedCard(Future2CVPCard);
      }
    }
    if (futureId === "Future3") {
      if (pathName.includes("BMC")) {
        setSelectedCard(Future3BMCCard);
      } else if (pathName.includes("CVP")) {
        setSelectedCard(Future3CVPCard);
      }
    }
    return () => {
      setSelectedCard(null);
    };
  }, [
    pathName,
    Future1BMCCard,
    Future1CVPCard,
    Future2BMCCard,
    Future2CVPCard,
    Future3BMCCard,
    Future3CVPCard,
  ]);

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
    if (pathName.includes("BMC")) {
      if (futureId === "Future1") {
        dispatch(
          selectedCardsSlice.actions.updateSelectedFuture1BMCCard(responseCard)
        );
      }
      if (futureId === "Future2") {
        dispatch(
          selectedCardsSlice.actions.updateSelectedFuture2BMCCard(responseCard)
        );
      }
      if (futureId === "Future3") {
        dispatch(
          selectedCardsSlice.actions.updateSelectedFuture3BMCCard(responseCard)
        );
      }
    }
    if (pathName.includes("CVP")) {
      if (futureId === "Future1") {
        dispatch(
          selectedCardsSlice.actions.updateSelectedFuture1CVPCard(responseCard)
        );
      }
      if (futureId === "Future2") {
        dispatch(
          selectedCardsSlice.actions.updateSelectedFuture2CVPCard(responseCard)
        );
      }
      if (futureId === "Future3") {
        dispatch(
          selectedCardsSlice.actions.updateSelectedFuture3CVPCard(responseCard)
        );
      }
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
        return Promise.resolve();
      },
      onmessage: function (res: any) {
        const { data: streamResponse, type } = res;
        if (!!streamResponse) {
          const { suggestion } = JSON.parse(streamResponse);
          if (suggestion === "") return;
          fullKeypoints = fullKeypoints + suggestion;
          responseCard.keyPoints = fullKeypoints;
          if (pathName.includes("BMC")) {
            if (futureId === "Future1") {
              dispatch(
                selectedCardsSlice.actions.updateFuture1BMCKeyPoints(suggestion)
              );
            }
            if (futureId === "Future2") {
              dispatch(
                selectedCardsSlice.actions.updateFuture2BMCKeyPoints(suggestion)
              );
            }
            if (futureId === "Future3") {
              dispatch(
                selectedCardsSlice.actions.updateFuture3BMCKeyPoints(suggestion)
              );
            }
            dispatch(
              BMCSlice.util.updateQueryData(
                "GetBMCCanvas",
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
          if (pathName.includes("CVP")) {
            if (futureId === "Future1") {
              dispatch(
                selectedCardsSlice.actions.updateFuture1CVPKeyPoints(suggestion)
              );
            }
            if (futureId === "Future2") {
              dispatch(
                selectedCardsSlice.actions.updateFuture2CVPKeyPoints(suggestion)
              );
            }
            if (futureId === "Future3") {
              dispatch(
                selectedCardsSlice.actions.updateFuture3CVPKeyPoints(suggestion)
              );
            }
            dispatch(
              CVPSlice.util.updateQueryData(
                "GetCVPCanvas",
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
        if (pathName.includes("BMC")) {
          responseCard.loadingKeyPoints = false;
          if (futureId === "Future1") {
            dispatch(
              selectedCardsSlice.actions.updateSelectedFuture1BMCCard(
                responseCard
              )
            );
          }
          if (futureId === "Future2") {
            dispatch(
              selectedCardsSlice.actions.updateSelectedFuture2BMCCard(
                responseCard
              )
            );
          }
          if (futureId === "Future3") {
            dispatch(
              selectedCardsSlice.actions.updateSelectedFuture3BMCCard(
                responseCard
              )
            );
          }
          dispatch(
            commentSlice.util.updateQueryData(
              "getAllComments",
              {
                userId: data?.user?.user_id,
                projectId: projectId,
                future: currentFuture,
                canvas_type: 2,
                cardNumber: responseCard?.cardNumber,
              },
              (draft: any) => {
                return draft?.map((comment: any) => {
                  if (comment?.comment_id === data?.comment_id) {
                    return {
                      ...comment,
                      incorporated: false,
                    };
                  } else {
                    return comment;
                  }
                });
              }
            )
          );
          updateBMCCard({
            card: responseCard,
            projectId,
            currentFuture,
            userId: data?.user?.user_id,
          });
        }
        if (pathName.includes("CVP")) {
          responseCard.loadingKeyPoints = false;
          if (futureId === "Future1") {
            dispatch(
              selectedCardsSlice.actions.updateSelectedFuture1CVPCard(
                responseCard
              )
            );
          }
          if (futureId === "Future2") {
            dispatch(
              selectedCardsSlice.actions.updateSelectedFuture2CVPCard(
                responseCard
              )
            );
          }
          if (futureId === "Future3") {
            dispatch(
              selectedCardsSlice.actions.updateSelectedFuture3CVPCard(
                responseCard
              )
            );
          }
          dispatch(
            commentSlice.util.updateQueryData(
              "getAllComments",
              {
                userId: data?.user?.user_id,
                projectId: projectId,
                future: currentFuture,
                canvas_type: 3,
                cardNumber: responseCard?.cardNumber,
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
          updateCVPCard({
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
        if (pathName.includes("BMC")) {
          dispatch(
            commentSlice.util.updateQueryData(
              "getAllComments",
              {
                userId: data?.user?.user_id,
                projectId: projectId,
                future: currentFuture,
                canvas_type: 2,
                cardNumber: responseCard?.cardNumber,
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
          updateBMCCard({
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
        if (pathName.includes("CVP")) {
          dispatch(
            commentSlice.util.updateQueryData(
              "getAllComments",
              {
                userId: data?.user?.user_id,
                projectId: projectId,
                future: currentFuture,
                canvas_type: 3,
                cardNumber: responseCard?.cardNumber,
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
          updateCVPCard({
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
        <>
          <MenuList>
            {project?.project?.is_owner && (
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
            {project?.project?.is_owner && (
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
        </>
      </Popover>
    </>
  );
};

export default CommentMenu;
