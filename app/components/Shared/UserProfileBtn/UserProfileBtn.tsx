"use client";
import React, { useRef } from "react";
import GrowTransition from "../../Utils/Grow";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import {
  ContentCut,
  ContentCopy,
  ContentPaste,
  Cloud,
} from "@mui/icons-material";

const UserProfileBtn = () => {
  const dispatch = useDispatch();
  const UserProfileMenuRef = useRef(null);
  const { userMenu } = useSelector(selectApp);
  const handleUserProfileMenu = () => {
    dispatch(
      appSlice.actions.toggleUserMenu(Boolean(UserProfileMenuRef?.current))
    );
  };
  return (
    <>
      <IconButton
        size="medium"
        color="primary"
        ref={UserProfileMenuRef}
        disableFocusRipple
        onClick={handleUserProfileMenu}
      >
        <Avatar
          sx={{
            width: 30,
            height: 30,
            backgroundColor: "orange",
          }}
        >
          N
        </Avatar>
      </IconButton>
      <Popover
        disablePortal
        TransitionComponent={GrowTransition}
        anchorEl={UserProfileMenuRef?.current}
        open={userMenu}
        onClose={() => dispatch(appSlice.actions.toggleUserMenu(false))}
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
            p: 1,
            borderRadius: 3,
            width: "200px",
            overflow: "hidden",
            zIndex: 100,
          },
        }}
      >
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <Avatar
                sx={{
                  width: 25,
                  height: 25,
                  backgroundColor: "orange",
                }}
              >
                N
              </Avatar>
            </ListItemIcon>
            <ListItemText
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 14,
                },
              }}
            >
              Narayana Lvsaln
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentCopy fontSize="small" />
            </ListItemIcon>
            <ListItemText
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 14,
                },
              }}
            >
              Settings
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentPaste fontSize="small" />
            </ListItemIcon>
            <ListItemText
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 14,
                },
              }}
            >
              Payments
            </ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Cloud fontSize="small" />
            </ListItemIcon>
            <ListItemText
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 14,
                },
              }}
            >
              Logout
            </ListItemText>
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
};

export default UserProfileBtn;
