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
  Stack,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
const Teams = () => {
  const theme: any = useTheme();
  const [currentTab, setCurrentTab] = useState(0);

  const handleChangeTab = (event: any, newValue: any) => {
    setCurrentTab(newValue);
  };

  const TeamProfile = () => (
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
          <Avatar sx={{ width: "120px", height: "120px" }}>I13</Avatar>
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
        <Box component={"div"} sx={{ width: "100%" }}>
          <Typography variant="body1" sx={{ mb: 1, fontSize: "14px" }}>
            Team Name
          </Typography>
          <TextField
            fullWidth
            size="small"
            type="text"
            id="team-name"
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
        </Box>
      </Stack>
      <Divider sx={{ width: "100%", my: 2 }} />
      <Stack
        direction={"row"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        sx={{ width: "100%" }}
      >
        <Typography
          variant="body1"
          sx={{ mb: 1, fontWeight: 600, width: "50%" }}
        >
          Team Plan
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 1, fontWeight: 600, width: "50%" }}
        >
          Free Plan
        </Typography>
      </Stack>
      <Divider sx={{ width: "100%", my: 2 }} />
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
      <Typography variant="caption" sx={{ fontWeight: 600, my: 2 }}>
        By leaving the team, you will lose access to all its Canvas.
      </Typography>
    </Stack>
  );

  const TeamUsers = () => (
    <div>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <TextField
          size="small"
          type="text"
          id="search_team_user"
          variant="outlined"
          placeholder="Search Team Members"
          sx={{
            mb: 2,
            width: "300px",
            "& .MuiInputBase-input": {
              p: 1,
              fontSize: "14px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: "1px !important",
            },
          }}
        />
        <Button
          size="small"
          variant="contained"
          className="!capitalize !text-white !font-semibold"
        >
          +&nbsp;Invite Member
        </Button>
      </Stack>
      <Divider className="!my-4" />
      <Stack
        direction={"row"}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        flexWrap={"wrap"}
        spacing={4}
        sx={{ width: "100%",py:4 }}
      >
        <Stack
          direction={"row"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          spacing={2}
          sx={{
            p: 2,
            width: "25%",
            borderRadius: 2,
            backgroundColor: "#f6f5f4",
            border: "1px solid black",
          }}
        >
          <Avatar sx={{ width: 40, height: 40 }}>J</Avatar>
          <Typography variant="body1" sx={{ fontSize: "14px" }}>
            Jhon Dave
          </Typography>
        </Stack>
      </Stack>
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
        <Tab
          sx={{
            fontWeight: 600,
            textTransform: "capitalize",
            fontSize: "15px",
          }}
          label="Profile"
        />
        <Tab
          sx={{
            fontWeight: 600,
            textTransform: "capitalize",
            fontSize: "15px",
          }}
          label="Users"
        />
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
