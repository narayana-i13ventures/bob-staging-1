"use client";
import React, { useRef } from "react";
import GrowTransition from "../../Utils/Grow";
import {
  Box,
  Avatar,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  Stack,
} from "@mui/material";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserProfileBtn = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data }: any = useSession();
  const UserProfileMenuRef: any = useRef(null);
  const { userMenu }: any = useSelector(selectApp);

  const handleUserProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(appSlice.actions.toggleUserMenu(true));
  };

  const goToProfile = (e: React.MouseEvent<HTMLElement>) => {
    e?.preventDefault();
    dispatch(appSlice.actions.toggleUserMenu(false));
    router.push(`/profile/${data?.user?.name}`);
  };

  return (
    <>
      <Stack
        ref={UserProfileMenuRef}
        onClick={handleUserProfileMenu}
        component={"div"}
        sx={{
          cursor: "pointer",
        }}
      >
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
      </Stack>
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
            p: 0.5,
            mt: 1,
            zIndex: 100,
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
            </ListItemIcon>
            <ListItemText
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 14,
                },
              }}
            >
              {data?.user?.name}
            </ListItemText>
          </MenuItem>
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
