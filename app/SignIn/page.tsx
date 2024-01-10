"use client";
import { Avatar, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
const SignInPage = () => {
  const [email, setEmail] = useState("test2@example.com");
  const [password, setPassword] = useState("123123");

  const login = () => {
    signIn("credentials", {
      email,
      password,
    });
  };
  return (
    <Stack
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f6f5f4",
      }}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack
        direction={"column"}
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        sx={{
          p: 2,
          width: "25%",
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={2}
          sx={{
            width: "100%",
            mt: 2,
            mb: 2,
          }}
        >
          <Avatar
            sx={{
              backgroundColor: "#000",
              width: 45,
              height: 45,
            }}
          >
            <AutoAwesomeIcon fontSize="large" />
          </Avatar>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Bob
          </Typography>
        </Stack>
        <Typography
          sx={{
            mb: 1,
          }}
        >
          Email
        </Typography>
        <TextField
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: "1px !important",
            },
          }}
          size="small"
          placeholder="Enter your Email"
        />
        <Typography
          sx={{
            mb: 1,
          }}
        >
          Password
        </Typography>
        <TextField
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: "1px !important",
            },
          }}
          size="small"
          placeholder="Enter your Password"
        />
        <Button onClick={login} disableElevation variant="contained" fullWidth>
          SignIn
        </Button>
      </Stack>
    </Stack>
  );
};

export default SignInPage;
