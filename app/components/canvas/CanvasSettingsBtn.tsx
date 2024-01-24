"use client";
import React, { useRef } from "react";
import GrowTransition from "../Utils/Grow";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import {
  Badge,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  Stack,
  useTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import TuneSharpIcon from "@mui/icons-material/TuneSharp";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import { useParams, usePathname, useRouter } from "next/navigation";
const CanvasSettingsBtn = (props: any) => {
  const { canvas } = props;
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const pathName = usePathname();
  const CanvasSettingsRef = useRef(null);
  const { projectId, futureId } = useParams();
  const { canvasSettings }: any = useSelector(selectApp);

  const openCanvasSettings = () => {
    dispatch(
      appSlice.actions.toggleCanvasSettings(Boolean(CanvasSettingsRef?.current))
    );
  };
  const goToNextCanvas = () => {
    if (futureId === "Future1") {
      if (
        pathName.includes("BMC") &&
        canvas?.future_1?.find(
          (CanvasCard: any) => CanvasCard?.canvas_type === 3
        )?.locked
      ) {
        dispatch(appSlice.actions.toggleCanvasSettings(false));
        dispatch(
          appSlice.actions.setCanvasActivity({ open: true, type: "cvp" })
        );
      } else if (
        pathName.includes("BMC") &&
        !canvas?.future_1?.find(
          (CanvasCard: any) => CanvasCard?.canvas_type === 3
        )?.locked
      ) {
        dispatch(appSlice.actions.toggleCanvasSettings(false));
        router.push("CVP");
      }
    }
    if (futureId === "Future2") {
      if (
        pathName.includes("BMC") &&
        canvas?.future_2?.find(
          (CanvasCard: any) => CanvasCard?.canvas_type === 3
        )?.locked
      ) {
        dispatch(appSlice.actions.toggleCanvasSettings(false));
        dispatch(
          appSlice.actions.setCanvasActivity({ open: true, type: "cvp" })
        );
      } else if (
        pathName.includes("BMC") &&
        !canvas?.future_2?.find(
          (CanvasCard: any) => CanvasCard?.canvas_type === 3
        )?.locked
      ) {
        dispatch(appSlice.actions.toggleCanvasSettings(false));
        router.push("CVP");
      }
    }
    if (futureId === "Future3") {
      if (
        pathName.includes("BMC") &&
        canvas?.future_3?.find(
          (CanvasCard: any) => CanvasCard?.canvas_type === 3
        )?.locked
      ) {
        dispatch(appSlice.actions.toggleCanvasSettings(false));
        dispatch(
          appSlice.actions.setCanvasActivity({ open: true, type: "cvp" })
        );
      } else if (
        pathName.includes("BMC") &&
        !canvas?.future_3?.find(
          (CanvasCard: any) => CanvasCard?.canvas_type === 3
        )?.locked
      ) {
        dispatch(appSlice.actions.toggleCanvasSettings(false));
        router.push("CVP");
      }
    }
  };
  return (
    <>
      <IconButton
        size="small"
        color="primary"
        ref={CanvasSettingsRef}
        disableFocusRipple
        onClick={openCanvasSettings}
        sx={{
          mr: 2,
        }}
      >
        <TuneSharpIcon fontSize="small" />
      </IconButton>
      <Popover
        disablePortal
        TransitionComponent={GrowTransition}
        anchorEl={CanvasSettingsRef?.current}
        open={canvasSettings}
        onClose={() => dispatch(appSlice.actions.toggleCanvasSettings(false))}
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
            mt: 1,
            zIndex: 100,
            borderRadius: 2,
            overflowY: "hidden",
            backgroundColor: "#fff",
          },
        }}
      >
        <MenuList sx={{ p: 0 }}>
          {/* <MenuItem
                        sx={{
                            borderRadius: 2,
                            mb: 1,
                            "&:hover": {
                                backgroundColor: `#f6f5f4`,
                            },
                        }}
                    >
                        <ListItemIcon>
                            <LockOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}
                        >
                            Lock Canvas
                        </ListItemText>
                    </MenuItem> */}
          {/* <MenuItem
                        sx={{
                            borderRadius: 2,
                            mb: 1,
                            "&:hover": {
                                backgroundColor: `#f6f5f4`,
                            },
                        }}
                    >
                        <ListItemIcon>
                            <AutorenewOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}
                        >
                            Refill Canvas
                        </ListItemText>
                    </MenuItem> */}
          <MenuItem
            onClick={goToNextCanvas}
            sx={{
              borderRadius: 2,
              "&:hover": {
                backgroundColor: `#f6f5f4`,
              },
            }}
          >
            <ListItemIcon>
              <RedoOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}
            >
              Next Canvas
            </ListItemText>
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
};

export default CanvasSettingsBtn;
