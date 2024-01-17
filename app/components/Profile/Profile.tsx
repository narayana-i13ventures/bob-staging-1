import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

const Profile = () => {
  const { data }: any = useSession();
  const [editEmailOpen, setEmailEditOpen] = useState(false);
  return (
    <Stack
      direction={"column"}
      justifyContent={"flex-start"}
      alignItems={"flex-start"}
      sx={{ width: "50%" }}
    >
      <Stack
        direction={"row"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        spacing={4}
        sx={{ width: "100%" }}
      >
        <Box sx={{ position: "relative" }}>
          {data?.user?.image ? (
            <img
              src={data?.user?.image}
              alt={data?.user?.name}
              referrerPolicy="no-referrer"
              style={{ borderRadius: "100%" }}
            />
          ) : (
            <Avatar sx={{ width: "120px", height: "120px" }}>N</Avatar>
          )}
          <IconButton
            sx={{
              position: "absolute",
              bottom: "0px",
              right: "0px",
              backgroundColor: "white",
            }}
          >
            <EditIcon className="!text-white !text-[25px]" />
          </IconButton>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography variant="body1" sx={{ mb: 1, fontSize: "14px" }}>
            First Name
          </Typography>
          <TextField
            fullWidth
            size="small"
            type="text"
            id="profile-firstname"
            variant="outlined"
            value={data?.user?.name?.split(" ")?.[0]}
            disabled={true}
            sx={{
              mb: 2,
              "& .MuiInputBase-input": {
                p: 1,
                fontSize: "14px",
              },
            }}
          />
          <Typography variant="body1" sx={{ mb: 1, fontSize: "14px" }}>
            Last Name
          </Typography>
          <TextField
            fullWidth
            size="small"
            type="text"
            id="profile-lastname"
            variant="outlined"
            value={data?.user?.name?.split(" ")?.[1]}
            disabled={true}
            sx={{
              mb: 2,
              "& .MuiInputBase-input": {
                p: 1,
                fontSize: "14px",
              },
            }}
          />
        </Box>
      </Stack>
      <Typography variant="body1" sx={{ mb: 1, fontSize: "14px" }}>
        Display Name
      </Typography>
      <TextField
        fullWidth
        size="small"
        type="text"
        id="profile-display-name"
        variant="outlined"
        value={data?.user?.name}
        disabled={true}
        sx={{
          mb: 2,
          "& .MuiInputBase-input": {
            p: 1,
            fontSize: "14px",
          },
        }}
      />
      <Typography variant="body1" sx={{ mb: 1, fontSize: "14px" }}>
        Role
      </Typography>
      <TextField
        fullWidth
        size="small"
        type="text"
        id="profile-role"
        variant="outlined"
        value={"Business Strategist"}
        disabled={true}
        sx={{
          mb: 2,
          "& .MuiInputBase-input": {
            p: 1,
            fontSize: "14px",
          },
        }}
      />
      <Typography variant="body1" sx={{ mb: 1, fontSize: "14px" }}>
        Team
      </Typography>
      <TextField
        fullWidth
        size="small"
        type="text"
        id="profile-team"
        variant="outlined"
        value={"I13 Ventures"}
        disabled={true}
        sx={{
          mb: 2,
          "& .MuiInputBase-input": {
            p: 1,
            fontSize: "14px",
          },
        }}
      />
      <Divider sx={{ width: "100%", my: 1 }} />
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Email
      </Typography>
      {!editEmailOpen ? (
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{ my: 2, width: "100%" }}
        >
          <Typography variant="body1" sx={{ fontSize: "14px" }}>
            Your Email With Bob is <b>{data?.user?.email}</b>
          </Typography>
          <Button
            size="small"
            onClick={() => setEmailEditOpen(true)}
            variant="outlined"
          >
            Change
          </Button>
        </Stack>
      ) : (
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{ my: 2, width: "100%" }}
        >
          <TextField
            autoFocus
            size="small"
            type="text"
            id="profile-email"
            variant="outlined"
            value={data?.user?.email}
            sx={{
              width: "350px",
              "& .MuiInputBase-input": {
                p: 1,
                fontSize: "14px",
              },
            }}
          />
          <IconButton className="!ml-4" onClick={() => setEmailEditOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Stack>
      )}
      <Divider sx={{ width: "100%", my: 1 }} />
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ width: "100%" }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Password
        </Typography>
        <Button
          size="small"
          onClick={() => setEmailEditOpen(true)}
          variant="outlined"
        >
          Change
        </Button>
      </Stack>
      <Divider sx={{ width: "100%", mt: 1, mb: 2 }} />
      <Button variant="outlined" color="error">
        Delete my Profile
      </Button>
      <Typography variant="caption" sx={{ fontWeight: 500, mt: 3, mb: 5 }}>
        You will receive an email to confirm your decision. This will not end
        your subscription or payments and you will continue to be charged. You
        can cancel your subscription, or switch payment methods to keep the team
        active. This can’t be reversed. All boards you’ve created will be
        permanently erased. You can save backups or export them.
      </Typography>
    </Stack>
  );
};

export default Profile;
