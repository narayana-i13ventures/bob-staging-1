import React, { useState, useRef, useEffect } from "react";
import Message from "./Message";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import {
    TextField,
    InputAdornment,
    useTheme,
    IconButton,
    Paper,
    Stack,
} from "@mui/material";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import { useParams, usePathname } from "next/navigation";

const MessageBox = (props: any) => {
    const dispatch = useDispatch();
    const { bobThinking } = useSelector(selectApp);
    const [message, setMessage] = useState<any>('');
    const textFieldRef = useRef<HTMLInputElement | null>(null);
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);
    const {
        header,
        height,
        messages,
        sendMessage,
        color
    } = props;

    const handleSendMessage = () => {
        if (message.trim() !== "") {
            sendMessage(message);
            setMessage("");
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
            handleSendMessage();
        }
    };

    // useEffect(() => {
    //     if (messagesContainerRef.current) {
    //         messagesContainerRef.current.scrollTop =
    //             messagesContainerRef.current.scrollHeight;
    //     }
    // }, [messages]);

    const closeMessageBox = () => {
        dispatch(appSlice.actions.toggleBobOpen(false));
    };

    return (
        <Paper
            elevation={header ? 2 : 0}
            component={"div"}
            sx={{
                width: "330px",
                backgroundColor: `${color || '#fff'}`,
                height: height !== 1000 ? "65vh" : "100%",
                // height: "65vh",
                borderRadius: 2,
                pt: header ? 1 : 2,
                mb: header ? 2 : 0,
                mr: !header ? 2 : 0
            }}
        >
            <Stack
                direction={"column"}
                sx={{ height: "100%" }}
                alignItems={"flex-end"}
                justifyContent={"space-between"}
            >
                {header && (
                    <Stack sx={{ px: 2 }}>
                        <IconButton onClick={closeMessageBox} sx={{ p: 1 }}>
                            <CloseIcon className="!text-white" />
                        </IconButton>
                    </Stack>
                )}
                <Stack
                    direction={"column-reverse"}
                    justifyContent={"flex-start"}
                    alignItems={"flex-start"}
                    flexGrow={1}
                    sx={{
                        width: '100%',
                        overflowY: "auto",
                        px: 2,
                        // maxHeight: `${height !== 1000 ? '48vh' : 'calc(75vh - 60px)'}`,
                        // maxHeight: `${height !== 1000 ? `${height - 100}px` : "calc(75vh - 60px)"
                        //     }`,
                    }}
                    ref={messagesContainerRef}
                >
                    {messages?.slice()
                        .reverse()
                        .filter((message: any) => message.role !== "system")
                        .map((message: any, index: number) => {
                            return (
                                <Message
                                    header={header}
                                    key={index}
                                    message={message?.content}
                                    user={message?.role}
                                />
                            );
                        })}
                </Stack>
                <Stack sx={{ px: 2, width: '100%' }}>
                    <TextField
                        fullWidth
                        disabled={bobThinking}
                        id="bob-message-input"
                        placeholder="Enter Your Message"
                        value={message}
                        size="small"
                        multiline={true}
                        variant="outlined"
                        maxRows={4}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleEnterKeyPress}
                        inputRef={(input) => (textFieldRef.current = input)}
                        InputProps={{
                            id: 'bob-message-input-area',
                            sx: {
                                fontSize: "14px",
                                padding: "10px",
                                borderRadius: 2,
                                backgroundColor: '#fff',
                                my: 1,
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderWidth: "1px !important",
                                },
                            },
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    className="cursor-pointer"
                                    onClick={handleSendMessage}
                                >
                                    <SendIcon sx={{ fontSize: 20 }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>
            </Stack>
        </Paper>
    );
};

export default MessageBox;
