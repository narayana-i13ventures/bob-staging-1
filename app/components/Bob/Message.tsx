import { selectApp, useSelector } from "@/lib/redux";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
// import { useSession } from "next-auth/react";
import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";
const Message = (props: any) => {
    const theme: any = useTheme();
    const { user, message, header } = props;
    const { bobThinking } = useSelector(selectApp);
    const bobTyping = bobThinking && user === "assistant" && message === "";
    return (
        <>
            <Stack
                direction={"column"}
                justifyContent={"flex-start"}
                alignItems={"flex-start"}
                sx={{
                    mb: 3,
                    width: "100%",
                }}
            >
                <Stack
                    justifyContent={"flex-start"}
                    alignItems={!bobTyping ? "items-start" : "center"}
                    direction={user === "user" ? "row-reverse" : "row"}
                    sx={{ width: "100%" }}
                >
                    <Stack
                        alignItems={"center"}
                        justifyContent={"center"}
                        sx={{
                            width: "15%",
                            height: "48px",
                            borderRadius: "100%",
                        }}
                    >
                        {user === "assistant" ? (
                            <MemoryOutlinedIcon
                                sx={{
                                    p: 0.5,
                                    color: "white",
                                    fontSize: "40px",
                                    borderRadius: "100%",
                                    backgroundColor: theme.palette.primary.main,
                                }}
                            />
                        ) : (
                            <MemoryOutlinedIcon
                                sx={{
                                    p: 0.5,
                                    color: "white",
                                    fontSize: "40px",
                                    borderRadius: "100%",
                                    backgroundColor: theme.palette.primary.main,
                                }}
                            />
                        )}
                    </Stack>
                    <Stack
                        direction={"column"}
                        sx={{ maxWidth: "85%", mt: 0.5 }}
                        alignItems={user === "assistant" ? "items-start" : "items-end"}
                    >
                        <Box
                            sx={{
                                borderRadius: 2,
                                // backgroundColor: "#cdedf6",
                                // backgroundColor: `${theme.palette.primary.main}30`,
                                backgroundColor: `${header ? `${theme.palette.primary.main}30` : "#fff"
                                    }`,
                                mr: user === "user" ? 1 : 0,
                                ml: user === "user" ? 0 : 1,
                                p: 1,
                            }}
                        >
                            {!bobTyping ? (
                                <>
                                    <Typography variant="body1" sx={{ fontSize: "14px" }}>
                                        {message}
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <Box className="flex justify-center items-center px-3 py-1">
                                        <Box className="animate-bounce w-2 h-2 rounded-full bg-primary"></Box>
                                        <Box className="animate-bounce delay-200 w-2 h-2 rounded-full bg-primary mx-3"></Box>
                                        <Box className="animate-bounce delay-500 w-2 h-2 rounded-full bg-primary"></Box>
                                    </Box>
                                </>
                            )}
                        </Box>
                        {!bobTyping && (
                            <Typography
                                variant="caption"
                                sx={{
                                    fontWeight: 500,
                                    textAlign: user === "user" ? "" : "text-right",
                                    mt: 1,
                                    ml: 2,
                                    color: "#7c7c7c",
                                }}
                            >
                                10:35 AM
                            </Typography>
                        )}
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
};

export default Message;
