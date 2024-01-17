import { Box, IconButton, Typography, useTheme } from "@mui/material";
import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useRouter } from "next/navigation";
import { appSlice, useDispatch } from "@/lib/redux";
const Notification = (props: any) => {
  const router = useRouter();
  const theme: any = useTheme();
  const dispatch = useDispatch();
  const { notification } = props;
  const notificationAction = () => {
    dispatch(appSlice.actions.toggleNotificationMenu(false));
    router.push(notification?.action);
  };
  return (
    <Box
      onClick={notificationAction}
      component={"div"}
      sx={{
        my: 1,
        p: 1,
        cursor: "pointer",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: 2,
        backgroundColor: `${theme.palette.primary.main}10`,
      }}
    >
      <Box
        sx={{
          width: "50px",
          height: "50px",
          borderRadius: 2,
          backgroundColor: `${theme.palette.primary.main}40`,
        }}
      ></Box>
      <Typography
        sx={{
          pl: 2,
          width: "calc(100% - 84px)",
          fontWeight: "500",
          fontSize: "14px",
        }}
      >
        {notification?.content}
      </Typography>
      <IconButton size="small">
        <CloseOutlinedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default Notification;
