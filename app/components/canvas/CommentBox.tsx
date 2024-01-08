import React, { useState, useRef, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import {
    TextField,
    InputAdornment,
    Paper,
    Stack,
} from "@mui/material";
import Comment from "./Comment";
import { selectApp, useSelector } from "@/lib/redux";

const CommentBox = (props: any) => {
    const { bobThinking } = useSelector(selectApp);
    const [comment, setComment] = useState<any>("");
    const textFieldRef = useRef<HTMLInputElement | null>(null);
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);
    const {
        comments,
        postComment,
        color
    } = props;

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
                p: 1,
                pt: 2,
                mr: 2,
                width: "350px",
                height: "100%",
                borderRadius: 5,
                backgroundColor: `${color || '#fff'}`,
            }}
        >
            <Stack
                direction={"column"}
                sx={{ height: "100%", width: '100%' }}
                alignItems={"flex-end"}
                justifyContent={"space-between"}
            >
                <Stack
                    direction={"column-reverse"}
                    justifyContent={"flex-start"}
                    alignItems={"flex-start"}
                    flexGrow={1}
                    sx={{
                        px: 2,
                        overflowY: "auto",
                        maxHeight: "calc(75vh - 60px)",
                    }}
                    ref={messagesContainerRef}
                >
                    {comments?.slice()
                        .reverse()
                        .filter((comment: any) => comment.role !== "system")
                        .map((comment: any, index: number) => {
                            return (
                                <Comment key={index} comment={comment} />
                            );
                        })}
                </Stack>
                <TextField
                    fullWidth
                    disabled={bobThinking}
                    id="comment-input"
                    placeholder="Enter Your Message"
                    value={comment}
                    size="small"
                    multiline
                    variant="outlined"
                    maxRows={4}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyPress={handleEnterKeyPress}
                    inputRef={(input) => (textFieldRef.current = input)}
                    InputProps={{
                        id: 'comment-input-area',
                        sx: {
                            fontSize: "14px",
                            padding: "10px",
                            borderRadius: 2,
                            backgroundColor:'#fff',
                            my: 1,
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderWidth: "1px !important",
                            },
                        },
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                className="cursor-pointer"
                                onClick={handlePostComment}
                            >
                                <SendIcon sx={{ fontSize: 20 }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>
        </Paper>
    );
};

export default CommentBox;
