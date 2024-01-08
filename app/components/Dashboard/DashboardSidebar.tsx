"use client";
import React from "react";
import {
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  useTheme,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";

const DashboardSidebar = () => {
  const theme = useTheme();

  return (
    <Box component={"div"}>
      <MenuList sx={{ py: 0 }}>
        <MenuItem
          sx={{
            borderRadius: 3,
            mb: 2,
            "&:hover": {
              backgroundColor: `${theme?.palette?.primary?.main}20`,
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
            borderRadius: 3,
            my: 2,
            "&:hover": {
              backgroundColor: `${theme?.palette?.primary?.main}20`,
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
            borderRadius: 3,
            my: 2,
            "&:hover": {
              backgroundColor: `${theme?.palette?.primary?.main}20`,
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
            borderRadius: 3,
            my: 2,
            "&:hover": {
              backgroundColor: `${theme?.palette?.primary?.main}20`,
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
