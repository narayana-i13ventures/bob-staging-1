import {
    Avatar,
    AvatarGroup,
    Button,
    Chip,
    Divider,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import moment from "moment";
import CommentMenu from "./CommentMenu";
import { useTheme } from "@mui/material";
import { useSession } from "next-auth/react";
import { useParams, usePathname } from "next/navigation";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
    useDislikeCommentMutation,
    useLikeCommentMutation,
} from "@/lib/redux/CommentApi";
import React, { useEffect, useState } from "react";
import { useSelector } from "@/lib/redux";
import { selectedFuture1BMCCard } from "@/lib/redux/slices/SelectedSlice";

const Comment = (props: any) => {
    const { comment } = props;
    const theme: any = useTheme();
    const pathName = usePathname();
    const { data }: any = useSession();
    const { projectId, futureId } = useParams();
    const Future1BMCCard = useSelector(selectedFuture1BMCCard);
    const [selectedCard, setSelectedCard] = useState<any>(null);
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
    const currentFuture =
        futureId === "Future1"
            ? 1
            : futureId === "Future2"
                ? 2
                : futureId === "Future3"
                    ? 3
                    : 123;
    const [
        likeComment,
        {
            isLoading: like_comment_loading,
            isSuccess: like_comment_success,
            isError: like_comment_error,
        },
    ] = useLikeCommentMutation();
    const [
        dislikeComment,
        {
            isLoading: dislike_comment_loading,
            isSuccess: dislike_comment_success,
            isError: dislike_comment_error,
        },
    ] = useDislikeCommentMutation();

    const likeUserComment = () => {
        likeComment({
            userId: data?.user?.user_id,
            projectId: projectId,
            future: currentFuture,
            canvas_type: pathName?.includes("BMC")
                ? 2
                : pathName?.includes("CVP")
                    ? 3
                    : 1,
            cardNumber: pathName?.includes('Thinkbeyond') ? 0 : selectedCard?.cardNumber,
            comment_id: comment?.comment_id,
            level: 0,
        });
    };
    const dislikeUserComment = () => {
        dislikeComment({
            userId: data?.user?.user_id,
            projectId: projectId,
            future: currentFuture,
            canvas_type: pathName?.includes("BMC")
                ? 2
                : pathName?.includes("CVP")
                    ? 3
                    : 1,
            cardNumber: pathName?.includes('Thinkbeyond') ? 0 : selectedCard?.cardNumber,
            comment_id: comment?.comment_id,
            level: 0,
        });
    };
    return (
        <>
            <Stack
                direction={"column"}
                justifyContent={"flex-start"}
                alignItems={"flex-start"}
                sx={{
                    mb: 3,
                    width: "100%",
                    boxShadow: 1,
                    borderRadius: 3,
                    backgroundColor: `#fff`,
                }}
            >
                <Stack
                    justifyContent={"flex-start"}
                    alignItems={"items-start"}
                    direction={"column"}
                    sx={{
                        p: 1,
                        width: "100%",
                    }}
                >
                    <Stack
                        direction={"row"}
                        alignItems={"flext-start"}
                        justifyContent={"space-between"}
                    >
                        <Stack
                            direction={"row"}
                            justifyContent={"flex-start"}
                            alignItems={"flex-start"}
                        >
                            <Stack
                                alignItems={"center"}
                                justifyContent={"flex-start"}
                                sx={{ mr: 2 }}
                            >
                                <Avatar
                                    sx={{
                                        width: 35,
                                        height: 35,
                                        mt: 0.5,
                                        backgroundColor: theme.palette.primary.main,
                                    }}
                                >
                                    <AutoAwesomeIcon
                                        sx={{
                                            color: "white",
                                            fontSize: "25px",
                                        }}
                                    />
                                </Avatar>
                            </Stack>
                            <Stack alignItems={"flex-start"} justifyContent={"flex-start"}>
                                <Typography
                                    variant="body1"
                                    sx={{ fontSize: "14px", fontWeight: 600 }}
                                >
                                    {comment?.commenter?.preferred_name}
                                </Typography>
                                <Typography variant="caption" sx={{ fontWeight: 500, mb: 1 }}>
                                    {moment(comment?.created_at).format("DD MMMM, YYYY h:mm A")}
                                </Typography>
                                {comment?.parked && (
                                    <Chip
                                        label={"Parked"}
                                        color="warning"
                                        variant="outlined"
                                        sx={{ height: "auto", cursor: "auto" }}
                                    />
                                )}
                            </Stack>
                        </Stack>
                        <Stack alignItems={"flex-start"} justifyContent={"flex-start"}>
                            <CommentMenu comment={comment} />
                        </Stack>
                    </Stack>
                    <Stack direction={"column"} sx={{ mt: 2 }}>
                        <Typography variant="body1" sx={{ fontSize: "13px" }}>
                            {comment?.comment_text}
                        </Typography>
                        <Divider sx={{ width: "100%", my: 1 }} />
                        <Stack
                            spacing={2}
                            direction={"row"}
                            alignItems={"center"}
                            justifyContent={"flex-start"}
                        >
                            <Stack
                                direction={"row"}
                                alignItems={"center"}
                                justifyContent={"flex-start"}
                            >
                                {comment?.liked_by?.includes(data?.user?.user_id) ? (
                                    <ThumbUpIcon fontSize="small" />
                                ) : (
                                    <IconButton onClick={likeUserComment} size="small">
                                        <ThumbUpAltOutlinedIcon fontSize="small" />
                                    </IconButton>
                                )}
                                <Typography
                                    variant="caption"
                                    sx={{
                                        ml: 1,
                                        fontWeight: 500,
                                        cursor: "pointer",
                                        "&:hover": { textDecoration: "underline" },
                                    }}
                                >
                                    {comment?.num_likes} Likes
                                </Typography>
                            </Stack>
                            <Stack
                                direction={"row"}
                                alignItems={"center"}
                                justifyContent={"flex-start"}
                            >
                                {comment?.disliked_by?.includes(data?.user?.user_id) ? (
                                    <ThumbDownAltIcon fontSize="small" />
                                ) : (
                                    <IconButton onClick={dislikeUserComment} size="small">
                                        <ThumbDownOutlinedIcon fontSize="small" />
                                    </IconButton>
                                )}
                                <Typography
                                    variant="caption"
                                    sx={{
                                        ml: 1,
                                        fontWeight: 500,
                                        cursor: "pointer",
                                        "&:hover": { textDecoration: "underline" },
                                    }}
                                >
                                    {comment?.num_dislikes} Dislikes
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
};

export default Comment;
