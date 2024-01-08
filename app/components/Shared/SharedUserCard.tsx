import { useUnShareProjectMutation } from "@/lib/redux/projectApi";
import { CloseOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const SharedUserCard = (props: any) => {
  const { editRole = true, deleteUser = true, project_id } = props;
  const { owner = false, user_id, preferred_name, email_address } = props?.user;

  const [role, SetRole] = useState("editor");
  const [unshareProject, { data, isLoading, isError }] =
    useUnShareProjectMutation();
  const changeRole = (event: SelectChangeEvent) => {
    SetRole(event.target.value as string);
  };
  const unShare = () => {
    unshareProject({ project_id: project_id, shared_id: user_id });
  };
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Box
        component="div"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          component={"div"}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ width: 30, height: 30, backgroundColor: "orange" }}>
            {preferred_name[0]}
          </Avatar>
          <Box
            component="div"
            sx={{
              ml: 2,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ display: "block" }} variant="subtitle2">
              {preferred_name}
            </Typography>
            <Typography
              sx={{ display: "block", fontWeight: 500 }}
              variant="caption"
            >
              {email_address}
            </Typography>
          </Box>
        </Box>
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {deleteUser && (
            <IconButton sx={{ mr: 2 }} size="small" onClick={unShare}>
              <CloseOutlined fontSize="small" />
            </IconButton>
          )}
          {editRole && (
            <FormControl fullWidth>
              <Select
                size="small"
                id={`edit_user_role_${user_id}`}
                value={role}
                onChange={changeRole}
                sx={{
                  p: 0,
                  width: "85px",
                  "& .MuiSelect-select": {
                    p: 1,
                    fontSize: 12,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "1px !important",
                  },
                }}
              >
                <MenuItem value={"editor"}>Editor</MenuItem>
                <MenuItem value={"viewer"}>Viewer</MenuItem>
              </Select>
            </FormControl>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SharedUserCard;
