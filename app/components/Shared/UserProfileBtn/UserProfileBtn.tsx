"use client";
import React, { useRef } from "react";
import GrowTransition from "../../Utils/Grow";
import {
  Avatar,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
} from "@mui/material";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserProfileBtn = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const UserProfileMenuRef: any = useRef(null);
  const { userMenu } = useSelector(selectApp);

  const handleUserProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(
      appSlice.actions.toggleUserMenu(true)
    );
  };

  const goToProfile = (e: React.MouseEvent<HTMLElement>) => {
    e?.preventDefault();
    dispatch(appSlice.actions.toggleUserMenu(false));
    router.push("/profile/new_profile");
  };

  return (
    <>
      <Avatar
        ref={UserProfileMenuRef}
        onClick={handleUserProfileMenu}
        sx={{
          width: 30,
          height: 30,
          backgroundColor: "orange",
          cursor: "pointer",
        }}
      >
        N
      </Avatar>
      <Popover
        disablePortal
        open={userMenu}
        TransitionComponent={GrowTransition}
        anchorEl={UserProfileMenuRef?.current}
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
          elevation: 3,
          sx: {
            p: 1,
            mt: 1,
            zIndex: 100,
            width: "200px",
            borderRadius: 2,
            overflow: "hidden",
            backgroundColor: "#fff",
            border: "1px solid #000000",
          },
        }}
      >
        <MenuList>
          <MenuItem
            onClick={(e: any) => {
              goToProfile(e);
            }}
            sx={{
              borderRadius: 2,
              "&:hover": {
                backgroundColor: `#f6f5f4`,
              },
            }}
          >
            <ListItemIcon>
              <Avatar
                sx={{
                  width: 25,
                  height: 25,
                  backgroundColor: "orange",
                  fontSize: "14px",
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
          {/* <MenuItem
            sx={{
              borderRadius: 2,
              "&:hover": {
                backgroundColor: `#f6f5f4`,
              },
            }}
          >
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
          <MenuItem
            sx={{
              borderRadius: 2,
              "&:hover": {
                backgroundColor: `#f6f5f4`,
              },
            }}
          >
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
          <Divider /> */}
          <MenuItem
            onClick={() => signOut()}
            sx={{
              borderRadius: 2,
              "&:hover": {
                backgroundColor: `#f6f5f4`,
              },
            }}
          >
            <ListItemIcon>
              <LogoutSharpIcon fontSize="small" />
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
