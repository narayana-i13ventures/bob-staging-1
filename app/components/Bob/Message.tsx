import { selectApp, useSelector } from "@/lib/redux";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
// import { useSession } from "next-auth/react";
import moment from "moment";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useSession } from "next-auth/react";
const Message = (props: any) => {
  const theme: any = useTheme();
  const { data }: any = useSession();
  const { message, header } = props;
  const { bobThinking } = useSelector(selectApp);
  const bobTyping =
    bobThinking &&
    message?.role_text === "assistant" &&
    message?.chat_text === "";
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
          sx={{ width: "100%" }}
          justifyContent={"flex-start"}
          alignItems={!bobTyping ? "items-start" : "center"}
          direction={message?.role_text === "user" ? "row-reverse" : "row"}
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
            {message?.role_text === "assistant" ? (
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
            ) : (
              <Box component={"div"}>
                <img
                  referrerPolicy="no-referrer"
                  className="!bg-indigo-500"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "100%",
                  }}
                  src={data?.user?.image}
                />
              </Box>
            )}
          </Stack>
          <Stack
            direction={"column"}
            sx={{ maxWidth: "85%", mt: 0.5 }}
            alignItems={
              message?.role_text === "assistant" ? "items-start" : "items-end"
            }
          >
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                mr: message?.role_text === "user" ? 1 : 0,
                ml: message?.role_text === "user" ? 0 : 1,
                backgroundColor: `${header ? `#f6f5f4` : "#fff"}`,
              }}
            >
              {!bobTyping ? (
                <Typography variant="body1" sx={{ fontSize: "13px" }}>
                  {message?.chat_text}
                </Typography>
              ) : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      px: 3,
                      py: 1,
                    }}
                  >
                    <Box
                      sx={{
                        animation: "bounce 1s infinite",
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        backgroundColor: theme?.palette?.primary?.main,
                      }}
                    ></Box>
                    <Box
                      sx={{
                        animation: "bounce 1s infinite",
                        animationDelay: "200ms",
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        backgroundColor: theme?.palette?.primary?.main,
                        mx: 2,
                      }}
                    ></Box>
                    <Box
                      sx={{
                        animation: "bounce 1s infinite",
                        animationDelay: "500ms",
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        backgroundColor: theme?.palette?.primary?.main,
                      }}
                    ></Box>
                  </Box>
                </>
              )}
            </Box>
            {!bobTyping && (
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 500,
                  textAlign: message?.role_text === "user" ? "" : "text-right",
                  mt: 1,
                  ml: 2,
                  color: "#7c7c7c",
                }}
              >
                {moment(message?.created_at).format("h:mma")}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Message;
