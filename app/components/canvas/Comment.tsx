import {
    Avatar,
    AvatarGroup,
    Button,
    Divider,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material";
import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
const Comment = (props: any) => {
    const { comment } = props;
    const theme: any = useTheme();
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
                    overflow:'hidden',
                    borderRadius: 3,
                    // backgroundColor: `${theme.palette.primary.main}10`
                    backgroundColor: `#fff`
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
                        justifyContent={"flex-start"}
                        spacing={2}
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
                            <MemoryOutlinedIcon
                                sx={{
                                    p: 0.5,
                                    color: "white",
                                    fontSize: "40px",
                                    borderRadius: "100%",
                                    backgroundColor: theme.palette.primary.main,
                                }}
                            />
                        </Stack>
                        <Stack alignItems={"flex-start"} justifyContent={"flex-start"}>
                            <Typography
                                variant="body1"
                                sx={{ fontSize: "14px", fontWeight: 600 }}
                            >
                                Narayana Lvsaln
                            </Typography>
                            <Typography variant="caption" sx={{ fontWeight: 500 }}>
                                27 December, 2023 10:35 AM{" "}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack direction={"column"} sx={{ mt: 1 }}>
                        <Typography variant="body1" sx={{ fontSize: "14px" }}>
                            {comment?.content}
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
                                <IconButton size="small">
                                    <ThumbUpAltOutlinedIcon fontSize="small" />
                                </IconButton>

                                <Typography
                                    variant="caption"
                                    sx={{
                                        ml: 0.5,
                                        fontWeight: 500,
                                        cursor: "pointer",
                                        "&:hover": { textDecoration: "underline" },
                                    }}
                                >
                                    +3 Others
                                </Typography>
                            </Stack>
                            <Stack
                                direction={"row"}
                                alignItems={"center"}
                                justifyContent={"flex-start"}
                            >
                                <IconButton size="small">
                                    <ThumbDownOutlinedIcon fontSize="small" />
                                </IconButton>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        ml: 0.5,
                                        fontWeight: 500,
                                        cursor: "pointer",
                                        "&:hover": { textDecoration: "underline" },
                                    }}
                                >
                                    +3 Others
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
