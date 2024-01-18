import {
    Avatar,
    AvatarGroup,
    Button,
    Divider,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import moment from "moment";
import { useTheme } from "@mui/material";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
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
                    borderRadius: 3,
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
                        spacing={1}
                    >
                        <Stack
                            alignItems={"center"}
                            justifyContent={"flex-start"}
                            sx={{
                                width: "12%",
                                height: "48px",
                                borderRadius: "100%",
                            }}
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
                                Narayana Lvsaln
                            </Typography>
                            <Typography variant="caption" sx={{ fontWeight: 500 }}>
                            {moment(comment?.created_at).format("DD MMMM, YYYY h:mm A")}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack direction={"column"} sx={{ mt: 1 }}>
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
                                    {comment?.num_likes} Likes
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
