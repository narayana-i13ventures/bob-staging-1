import React, { useState, useRef, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import { TextField, InputAdornment, Paper, Stack, Box, CircularProgress } from "@mui/material";
import Comment from "./Comment";
import { selectApp, useSelector } from "@/lib/redux";

const CommentBox = (props: any) => {
    const { bobThinking } = useSelector(selectApp);
    const [comment, setComment] = useState<any>("");
    const textFieldRef = useRef<HTMLInputElement | null>(null);
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);
    const { comments, postComment, color, loading, saving } = props;

    const handlePostComment = () => {
        if (comment.trim() !== "") {
            postComment(comment);
            setComment("");
            if (textFieldRef.current) {
                textFieldRef.current.focus();
            }
        }
    };

    const handleEnterKeyPress = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handlePostComment();
        }
    };

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    }, [comments]);

    return (
        <Paper
            elevation={0}
            component={"div"}
            sx={{
                pt: 2,
                mr: 2,
                width: "100%",
                height: "100%",
                borderRadius: 2,
                backgroundColor: `${color || "#fff"}`,
            }}
        >
            <Stack
                direction={"column"}
                sx={{ height: "100%" }}
                alignItems={"flex-end"}
                justifyContent={"space-between"}
            >
                <Stack
                    direction={"column-reverse"}
                    justifyContent={"flex-start"}
                    alignItems={"flex-start"}
                    flexGrow={1}
                    sx={{
                        width: '100%',
                        overflowY: "auto",
                        px: 2,
                    }}
                    ref={messagesContainerRef}
                >
                    {!loading ? (
                        <>
                            {comments
                                ?.slice()
                                .reverse()
                                .filter((comment: any) => comment.role !== "system")
                                .map((comment: any, index: number) => {
                                    return <Comment key={index} comment={comment} />;
                                })}
                        </>
                    ) : (
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                my: 4,
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    )}

                </Stack>
                <Stack sx={{ px: 2, width: "100%" }}>
                    <TextField
                        fullWidth
                        disabled={saving || loading}
                        id="comment-input"
                        placeholder="Enter Your Comment"
                        value={comment}
                        size="small"
                        multiline
                        variant="outlined"
                        maxRows={4}
                        onChange={(e) => setComment(e.target.value)}
                        onKeyPress={handleEnterKeyPress}
                        inputRef={(input) => (textFieldRef.current = input)}
                        InputProps={{
                            id: "comment-input-area",
                            sx: {
                                fontSize: "14px",
                                padding: "10px",
                                borderRadius: 2,
                                backgroundColor: "#fff",
                                my: 1,
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderWidth: "1px !important",
                                },
                            },
                            endAdornment: !saving ? (
                                <>
                                    <InputAdornment
                                        position="end"
                                        sx={{ cursor: "pointer" }}
                                        onClick={handlePostComment}
                                    >
                                        <SendIcon sx={{ fontSize: 20 }} />
                                    </InputAdornment>
                                </>
                            ) : (
                                <>
                                    <CircularProgress size={15} />
                                </>
                            ),
                        }}
                    />
                </Stack>
            </Stack>
        </Paper>
    );
};

export default CommentBox;
