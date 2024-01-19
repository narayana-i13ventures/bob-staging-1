"use client";
import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { useResetThinkBeyondMutation } from "@/lib/redux/Api";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import TuneSharpIcon from "@mui/icons-material/TuneSharp";
import { useParams } from "next/navigation";
const ThinkBeyondSettings = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [ResetThinkBeyond] = useResetThinkBeyondMutation();
  const { ThinkbeyondSettings }:any = useSelector(selectApp);

  const handleThinkBeyondReset = () => {
    dispatch(appSlice.actions.toggleThinkbeyondSettings(false));
    // ResetThinkBeyond({})
  };

  const ThinkbeyondSettingsOpen = () => {
    dispatch(appSlice.actions.toggleThinkbeyondSettings(true));
  };

  const ThinkbeyondSettingsClose = () => {
    dispatch(appSlice.actions.toggleThinkbeyondSettings(false));
  };

  const ThinkbeyondShareOpen = () => {
    dispatch(appSlice.actions.toggleThinkbeyondSettings(false));
    dispatch(
      appSlice.actions.toggleShareModal({
        open: true,
        data: { projectId },
        type: "thinkbeyond",
      })
    );
  };

  const actions = [
    {
      icon: <DeleteOutlinedIcon />,
      name: "Reset Canvas",
      onclick: handleThinkBeyondReset,
    },
    {
      icon: <ShareOutlinedIcon />,
      name: "Share",
      onclick: ThinkbeyondShareOpen,
    },
  ];

  return (
    <SpeedDial
      sx={{
        left: 20,
        bottom: 20,
        position: "absolute",
      }}
      ariaLabel="thinkbeyond-speed-dail"
      icon={
        <TuneSharpIcon
          sx={{
            color: "white",
          }}
        />
      }
      direction="right"
      onClose={ThinkbeyondSettingsClose}
      onOpen={ThinkbeyondSettingsOpen}
      open={ThinkbeyondSettings}
      FabProps={{
        sx: {
          p: 1.2,
          boxShadow: 0,
          height: "fit-content !important",
          width: "fit-content !important",
        },
      }}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action?.onclick}
          sx={{
            boxShadow: "none !important",
          }}
          arrow
        />
      ))}
    </SpeedDial>
  );
};

export default ThinkBeyondSettings;
