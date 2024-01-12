import { selectApp, useSelector } from "@/lib/redux";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
// import { useSession } from "next-auth/react";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
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
          sx={{ width: "100%" }}
          justifyContent={"flex-start"}
          alignItems={!bobTyping ? "items-start" : "center"}
          direction={user === "user" ? "row-reverse" : "row"}
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
            )}
          </Stack>
          <Stack
            direction={"column"}
            sx={{ maxWidth: "85%", mt: 0.5 }}
            alignItems={user === "assistant" ? "items-start" : "items-end"}
          >
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                mr: user === "user" ? 1 : 0,
                ml: user === "user" ? 0 : 1,
                backgroundColor: `${header ? `#f6f5f4` : "#fff"}`,
              }}
            >
              {!bobTyping ? (
                <Typography variant="body1" sx={{ fontSize: "13px" }}>
                  {message}
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
