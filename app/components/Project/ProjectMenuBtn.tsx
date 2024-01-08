"use client";
import React, { useRef, useState } from "react";
import GrowTransition from "../Utils/Grow";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
} from "@mui/material";
import { appSlice, useDispatch } from "@/lib/redux";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDeleteProjectByIdMutation } from "@/lib/redux/projectApi";

const ProjectMenuBtn = (props: any) => {
  const { projectId, name } = props;
  const dispatch = useDispatch();
  const ProjectMenuBtnRef = useRef(null);
  const [projectMenuOpen, setProjectMenuOpen] = useState(false);
  const [deleteProject, { data, isLoading, isSuccess }] =
    useDeleteProjectByIdMutation();

  const OpenProjectMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation();
    setProjectMenuOpen(true);
  };
  const CloseProjectMenu = () => {
    setProjectMenuOpen(false);
  };
  const OpenProjectDetails = (event: React.MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation();
    setProjectMenuOpen(false);
    dispatch(
      appSlice.actions.toggleProjectDetails({
        open: true,
        projectId: projectId,
      })
    );
  };
  const OpenProjectShare = (event: React.MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation();
    setProjectMenuOpen(false);
    dispatch(
      appSlice.actions.toggleShareModal({
        open: true,
        data: { projectId,name:name },
        type: "project",
      })
    );
  };
  const DeleteProject = () => {
    deleteProject(projectId);
  };
  return (
    <>
      <IconButton
        onClick={OpenProjectMenu}
        ref={ProjectMenuBtnRef}
        sx={{
          position: "absolute",
          top: 1,
          right: 1,
          zIndex: 10,
        }}
      >
        <MoreVertOutlinedIcon />
      </IconButton>
      <Popover
        disablePortal
        TransitionComponent={GrowTransition}
        anchorEl={ProjectMenuBtnRef?.current}
        open={projectMenuOpen}
        onClose={CloseProjectMenu}
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
            width: "200px",
            overflow: "hidden",
            zIndex: 100,
          },
        }}
      >
        <MenuList sx={{ p: 0 }}>
          <MenuItem onClick={(e: any) => OpenProjectShare(e)}>
            <ListItemIcon sx={{ minWidth: "25px !important" }}>
              <ShareOutlinedIcon sx={{ fontSize: 18 }} />
            </ListItemIcon>
            <ListItemText
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 14,
                },
              }}
            >
              Share
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon sx={{ minWidth: "25px !important" }}>
              <ContentCopyOutlinedIcon sx={{ fontSize: 18 }} />
            </ListItemIcon>
            <ListItemText
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 14,
                },
              }}
            >
              Copy Link
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon sx={{ minWidth: "25px !important" }}>
              <EditOutlinedIcon sx={{ fontSize: 18 }} />
            </ListItemIcon>
            <ListItemText
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 14,
                },
              }}
            >
              Rename
            </ListItemText>
          </MenuItem>
          <MenuItem onClick={(e: any) => OpenProjectDetails(e)}>
            <ListItemIcon sx={{ minWidth: "25px !important" }}>
              <InfoOutlinedIcon sx={{ fontSize: 18 }} />
            </ListItemIcon>
            <ListItemText
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 14,
                },
              }}
            >
              Details
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon sx={{ minWidth: "25px !important" }}>
              <OpenInNewOutlinedIcon sx={{ fontSize: 18 }} />
            </ListItemIcon>
            <ListItemText
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 14,
                },
              }}
            >
              Open in new tab
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon sx={{ minWidth: "25px !important" }}>
              <LockOutlinedIcon sx={{ fontSize: 18 }} />
            </ListItemIcon>
            <ListItemText
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 14,
                },
              }}
            >
              Lock
            </ListItemText>
          </MenuItem>
          <MenuItem onClick={DeleteProject}>
            <ListItemIcon sx={{ minWidth: "25px !important" }}>
              <DeleteOutlineOutlinedIcon
                fontSize="small"
                sx={{ color: "red" }}
              />
            </ListItemIcon>
            <ListItemText
              sx={{
                color: "red",
                "& .MuiTypography-root": {
                  fontSize: 14,
                },
              }}
            >
              Delete
            </ListItemText>
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
};

export default ProjectMenuBtn;
