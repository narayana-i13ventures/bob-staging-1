"use client";
import React from "react";
import {
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  useTheme,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import { useRouter } from "next/navigation";

const DashboardSidebar = () => {
  const theme = useTheme();
  const router = useRouter();
  const gotToThinkbeyond = () => {
    router.push(`/55/Thinkbeyond`);
  };
  return (
    <Box component={"div"} sx={{ width: "100%" }}>
      <MenuList sx={{ py: 0 }}>
        <MenuItem
          onClick={gotToThinkbeyond}
          sx={{
            mb: 2,
            borderRadius: 2,
            transition: "all 150ms ease-in",
            "&:hover": {
              backgroundColor: `#000`,
              color: "#fff",
            },
            "& .MuiListItemIcon-root": {
              transition: "all 150ms ease-in",
            },
            "&:hover .MuiListItemIcon-root": {
              color: "#fff",
            },
          }}
        >
          <ListItemIcon>
            <ViewInArOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}>
            My Projects
          </ListItemText>
        </MenuItem>
        <MenuItem
          sx={{
            mb: 2,
            borderRadius: 2,
            transition: "all 150ms ease-in",
            "&:hover": {
              backgroundColor: `#000`,
              color: "#fff",
            },
            "& .MuiListItemIcon-root": {
              transition: "all 150ms ease-in",
            },
            "&:hover .MuiListItemIcon-root": {
              color: "#fff",
            },
          }}
        >
          <ListItemIcon>
            <AccessTimeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}>
            Recent Projects
          </ListItemText>
        </MenuItem>
        <MenuItem
          sx={{
            mb: 2,
            borderRadius: 2,
            transition: "all 150ms ease-in",
            "&:hover": {
              backgroundColor: `#000`,
              color: "#fff",
            },
            "& .MuiListItemIcon-root": {
              transition: "all 150ms ease-in",
            },
            "&:hover .MuiListItemIcon-root": {
              color: "#fff",
            },
          }}
        >
          <ListItemIcon>
            <StarOutlineOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}>
            Favourites
          </ListItemText>
        </MenuItem>
        <MenuItem
          sx={{
            mb: 2,
            borderRadius: 2,
            transition: "all 150ms ease-in",
            "&:hover": {
              backgroundColor: `#000`,
              color: "#fff",
            },
            "& .MuiListItemIcon-root": {
              transition: "all 150ms ease-in",
            },
            "&:hover .MuiListItemIcon-root": {
              color: "#fff",
            },
          }}
        >
          <ListItemIcon>
            <PeopleOutlineOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}>
            Team Projects
          </ListItemText>
        </MenuItem>
      </MenuList>
    </Box>
  );
};

export default DashboardSidebar;
