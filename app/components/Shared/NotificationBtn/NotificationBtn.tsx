"use client";
import React, { useRef } from "react";
import Notification from "./Notification";
import GrowTransition from "../../Utils/Grow";
import { Badge, Box, Chip, Divider, IconButton, Popover, Stack } from "@mui/material";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
const NotificationBtn = () => {
  const dispatch = useDispatch();
  const NotificationRef = useRef(null);
  const { NotificationMenu } = useSelector(selectApp);
  const handleOpenNotificationMenu = () => {
    dispatch(
      appSlice.actions.toggleNotificationMenu(Boolean(NotificationRef?.current))
    );
  };
  return (
    <>
      <IconButton
        size="large"
        color="primary"
        ref={NotificationRef}
        disableFocusRipple
        onClick={handleOpenNotificationMenu}
        sx={{
          mr: 2
        }}
      >
        <Badge badgeContent={4} color="error">
          <NotificationsNoneOutlinedIcon />
        </Badge>
      </IconButton>
      <Popover
        disablePortal
        TransitionComponent={GrowTransition}
        anchorEl={NotificationRef?.current}
        open={NotificationMenu}
        onClose={() => dispatch(appSlice.actions.toggleNotificationMenu(false))}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          elevation: 1,
          sx: {
            borderRadius: 3,
            height: '600px',
            width: "400px",
            overflowY: "hidden",
            zIndex: 100,
          },
        }}
      >
        <Stack
          component={"div"}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          sx={{
            p: 2,
            width: '100%',
            backgroundColor: 'white',
          }}
        >
          <Box component={"div"}>
            <Chip
              size="small"
              sx={{ width: "60px", mr: 1, fontWeight: "600" }}
              label="All"
              variant="filled"
              color="primary"
              onClick={() => { }}
            />
            <Chip
              size="small"
              sx={{ width: "80px", fontWeight: "600" }}
              label="Unread"
              variant="outlined"
              color="primary"
              onClick={() => { }}
            />
          </Box>
          <Box component={"div"}>
            <Chip
              size="small"
              sx={{ width: "100px", mr: 1, fontWeight: "600" }}
              label="Clear All"
              variant="outlined"
              color="error"
              onClick={() => { }}
            />
          </Box>
        </Stack>
        <Divider />
        <Box
          component={"div"}
          sx={{
            p: 2,
            maxHeight: "550px",
            overflowY: 'auto'
          }}
        >
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
        </Box>
      </Popover>
    </>
  );
};

export default NotificationBtn;
