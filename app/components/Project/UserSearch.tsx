import {
  Autocomplete,
  TextField,
  Chip,
  Checkbox,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const UserSearch = (props: any) => {
  const { shared_users } = props;
  const fixedOptions: any = [];
  const [value, setValue] = useState([...fixedOptions]);
  const nonSharedUsers = users?.filter(
    (user) =>
      !shared_users?.some(
        (sharedUser: any) => sharedUser.user_id === user?.user_id
      )
  );

  return (
    <>
      <Autocomplete
        sx={{ mb: 3 }}
        multiple
        size="small"
        id={`search_user`}
        value={value}
        limitTags={3}
        options={nonSharedUsers}
        // disableCloseOnSelect
        getOptionLabel={(option: any) => option.preferred_name}
        onChange={(event: any, newValue: any) => {
          setValue([
            ...fixedOptions,
            ...newValue.filter(
              (option: any) => fixedOptions.indexOf(option) === -1
            ),
          ]);
        }}
        renderOption={(props, option, { selected }) => (
          <li {...props} key={option?.user_id}>
            <Box
              component={"div"}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ width: 30, height: 30, mr: 2 }}>
                {option?.preferred_name[0]}
              </Avatar>
              <Box>
                <Typography variant="body1" sx={{ m: 0 }}>
                  {option?.preferred_name}
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 500 }}>
                  {option?.preferred_name}
                </Typography>
              </Box>
            </Box>
          </li>
        )}
        renderInput={(params: any) => (
          <TextField {...params} placeholder="Search Users" />
        )}
        renderTags={(tagValue: any, getTagProps: any) =>
          tagValue.map((option: any, index: any) => (
            <Chip
              label={option.preferred_name}
              {...getTagProps({ index })}
              disabled={fixedOptions.indexOf(option) !== -1}
              key={index}
            />
          ))
        }
      />
    </>
  );
};

export default UserSearch;
const users = [
  { preferred_name: "David", user_id: 1, email: "writedj8@g.com" },
  { preferred_name: "Test", user_id: 2, email: "test@123.com" },
  // { username: "Bob Johnson", userId: 1003, email: "bob.johnson@example.com" },
  // { username: "Eva Brown", userId: 1004, email: "eva.brown@example.com" },
  // {
  //     username: "Charlie White",
  //     userId: 1005,
  //     email: "charlie.white@example.com",
  // },
  // {
  //     username: "Olivia Miller",
  //     userId: 1006,
  //     email: "olivia.miller@example.com",
  // },
  // {
  //     username: "Daniel Wilson",
  //     userId: 1007,
  //     email: "daniel.wilson@example.com",
  // },
  // { username: "Sophia Davis", userId: 1008, email: "sophia.davis@example.com" },
  // {
  //     username: "Liam Anderson",
  //     userId: 1009,
  //     email: "liam.anderson@example.com",
  // },
  // { username: "Emma Taylor", userId: 1010, email: "emma.taylor@example.com" },
];
