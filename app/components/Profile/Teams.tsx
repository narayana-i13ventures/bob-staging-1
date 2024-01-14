import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  InputBase,
  Button,
  TextField,
  Divider,
  Avatar,
  useTheme,
} from "@mui/material";

const Teams = () => {
  const theme: any = useTheme();
  const [currentTab, setCurrentTab] = useState(0);

  const handleChangeTab = (event: any, newValue: any) => {
    setCurrentTab(newValue);
  };

  const TeamProfile = () => (
    <>
      <div className="flex justify-between items-center">
        <div className="w-4/6">
          <p className="mb-2 font-semibold">Team Name</p>
          <TextField
            fullWidth
            className="w-full !mb-4"
            size="small"
            type="text"
            id="profile-role"
            variant="outlined"
            value={"i13 ventures"}
            disabled={true}
          />
        </div>
        <Avatar sx={{ width: "120px", height: "120px" }}>N</Avatar>
      </div>
      <Divider className="!my-8" />
      <p className="text-lg font-semibold">Team Plan</p>
      <Divider className="!my-8" />
      <p className="font-semibold text-md">Leave i13Ventures team</p>
      <p className="my-5">
        By leaving the team, you will lose access to all its Canvas.
      </p>
      <Button
        disableElevation
        sx={{
          "&.MuiButton-contained:hover": {
            backgroundColor: theme?.palette?.error?.main,
          },
        }}
        color="error"
        variant="contained"
        className="!font-semibold !capitalize !text-white"
      >
        Leave Team
      </Button>
    </>
  );

  const TeamUsers = () => (
    <div>
      <div className="flex justify-between items-center mb-4">
        <TextField
          className="pr-5 !w-3/4"
          size="small"
          type="text"
          id="profile-company"
          variant="outlined"
          placeholder="Search User"
        />
        <Button variant="contained" className="!capitalize !text-white !font-semibold">
          +&nbsp;Invite Member
        </Button>
      </div>
      <Divider className="!my-4" />
      <List>
        <ListItem className="w-full flex justify-between items-center">
          <p>Jhon Dave</p>
          <p>Admin</p>
        </ListItem>
        <ListItem className="w-full flex justify-between items-center">Jane Smith</ListItem>
        {/* Add other users */}
      </List>
    </div>
  );

  return (
    <div>
      <Tabs
        value={currentTab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChangeTab}
      >
        <Tab className="!font-semibold !capitalize" label="Profile" />
        <Tab className="!font-semibold !capitalize" label="Users" />
      </Tabs>
      <Divider />
      <TabPanel value={currentTab} index={0} sx={{ p: 0 }}>
        <TeamProfile />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <TeamUsers />
      </TabPanel>
    </div>
  );
};

const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default Teams;
