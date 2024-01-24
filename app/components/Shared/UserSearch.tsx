import { useShareThinkbeyondMutation } from "@/lib/redux/ThinkbeyondApi";
import {
  useGetAllUsersQuery,
  useLazyGetAllCanvasQuery,
  useLazyGetProjectByIdQuery,
  useShareProjectMutation,
  useUnShareProjectMutation,
} from "@/lib/redux/projectApi";
import {
  Autocomplete,
  TextField,
  Chip,
  Checkbox,
  Box,
  Avatar,
  Typography,
  Stack,
  Button,
  FormControlLabel,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
const UserSearch = (props: any) => {
  const fixedOptions: any = [];
  const dispatch = useDispatch();
  const { data }: any = useSession();
  const [value, setValue] = useState([...fixedOptions]);
  const { ShareOpen }: any = useSelector(selectApp);
  const { shared_users, type, metadata, project_data } = props;
  const {
    data: AllUsers,
    isLoading: users_loading,
    isSuccess: users_success,
    isError: users_error,
  } = useGetAllUsersQuery({});
  const [shareProjects] = useShareProjectMutation();

  const [
    getAllCanvas,
    {
      data: canvas_data,
      isLoading: canvas_data_loading,
      isError: canvas_data_error,
    },
  ] = useLazyGetAllCanvasQuery();

  useEffect(() => {
    if (ShareOpen?.data !== "") {
      getAllCanvas({
        userId: data?.user?.user_id,
        projectId: metadata?.projectId,
      });
    }
  }, [metadata?.projectId, , data?.user?.user_id, ShareOpen?.open]);

  const [projectChecked, setProjectChecked] = useState([false]);
  const [thinkbeyondChecked, setThinkbeyondChecked] = useState([false]);
  const [canvasChecked, setCanvasChecked] = React.useState([false, false]);

  const checkProject = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectChecked([event.target.checked]);
    setThinkbeyondChecked([event.target.checked]);
    setCanvasChecked([event.target.checked, event.target.checked]);
  };

  const checkThinkbeyond = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThinkbeyondChecked([event.target.checked]);
    setCanvasChecked([event.target.checked, event.target.checked]);
  };

  const BMCChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCanvasChecked([event.target.checked, canvasChecked[1]]);
  };

  const CVPChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCanvasChecked([canvasChecked[0], event.target.checked]);
  };
  useEffect(() => {
    if (ShareOpen?.data !== "" && ShareOpen?.open) {
      if (ShareOpen?.type === "project") {
        setProjectChecked([true]);
      } else if (ShareOpen?.type === "thinkbeyond") {
        setProjectChecked([true]);
        setThinkbeyondChecked([true]);
      } else if (ShareOpen?.type === "BMC") {
        setProjectChecked([true]);
        setThinkbeyondChecked([true]);
        setCanvasChecked([true, false]);
      }
    }
  }, [ShareOpen?.data, ShareOpen?.open]);

  const canvasChildren = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 6 }}>
      {canvas_data?.future_1
        ?.filter(
          (canvas: any) => canvas.canvas_type === 2 || canvas.canvas_type === 3
        )
        ?.map((canvas: any) => {
          return (
            <FormControlLabel
              key={canvas?.canvas_type}
              disabled={canvas?.locked}
              sx={{ my: 1 }}
              label={canvas?.name}
              control={
                !canvas?.locked ? (
                  <Checkbox checked={canvasChecked[0]} onChange={BMCChecked} />
                ) : (
                  <>
                    <LockOutlinedIcon
                      sx={{ mr: 1, ml: 1, color: "rgba(0, 0, 0, 0.38)" }}
                    />
                  </>
                )
              }
            />
          );
        })}
    </Box>
  );

  const ThinkbeyondChildren = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <FormControlLabel
        label="Thinkbeyond Canvas"
        control={
          <Checkbox
            indeterminate={canvasChecked[0] !== canvasChecked[1]}
            // checked={canvasChecked[0] && canvasChecked[1]}
            checked={thinkbeyondChecked[0]}
            onChange={checkThinkbeyond}
          />
        }
      />
    </Box>
  );
  // const [shareThinkbeyond] = useShareThinkbeyondMutation();

  const nonSharedUsers = AllUsers?.users
    ?.filter((user: any) => user?.email_address !== data?.user?.email)
    .filter((user: any) => {
      return !shared_users?.some(
        (sharedUser: any) => sharedUser.user_id === user?.user_id
      );
    });

  const shareUsers = () => {
    if (projectChecked[0] === true) {
      shareProjects({
        projectId: metadata?.projectId,
        shared_users: value,
        userId: data?.user?.user_id,
      })
        .unwrap()
        .then((response: any) => {
          setValue([]);
        });
    } else {
      dispatch(
        appSlice.actions.setGlobalSnackBar({
          open: true,
          content: "Project Not Selected",
          clossable: true,
        })
      );
    }

    // if (type === "project") {
    //   shareProjects({
    //     projectId: metadata?.projectId,
    //     shared_users: value,
    //     userId: data?.user?.user_id,
    //   });
    // }
    // if (type === "thinkbeyond") {
    //   shareThinkbeyond({
    //     projectId: metadata?.projectId,
    //     shared_users: value.map((user: any) => ({
    //       email: user?.email_address,
    //       role: "editor",
    //     })),
    //     userId: data?.user?.user_id,
    //   });
    // }
  };
  return (
    <>
      <Autocomplete
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px !important",
          },
        }}
        multiple
        size="small"
        id={`search_user`}
        value={value}
        limitTags={3}
        options={nonSharedUsers || []}
        disableCloseOnSelect
        isOptionEqualToValue={(option, value) =>
          option.email_address === value.email_address
        }
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
                  {option?.email_address}
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
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        Share
      </Typography>
      <Divider sx={{ my: 1 }} />
      {!canvas_data_loading && !canvas_data_error && (
        <Box component={"div"} sx={{ mb: 2 }}>
          <FormControlLabel
            label={project_data?.project?.project_name}
            control={
              <Checkbox
                // checked={
                //   canvasChecked[0] &&
                //   canvasChecked[1] &&
                //   thinkbeyondChecked[0]
                // }
                checked={projectChecked[0]}
                indeterminate={thinkbeyondChecked[0]}
                onChange={checkProject}
              />
            }
          />
          {ThinkbeyondChildren}
          {canvasChildren}
        </Box>
      )}
      {canvas_data_loading && !canvas_data_error && (
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ mb: 2, minHeight: "100px", width: "100%" }}
        >
          <CircularProgress />
        </Stack>
      )}
      {value?.length > 0 && (
        <Stack
          direction={"row"}
          justifyContent={"flex-end"}
          alignItems={"center"}
          sx={{ width: "100%" }}
        >
          <Button onClick={shareUsers} variant="outlined" size="small">
            Add Users
          </Button>
        </Stack>
      )}
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
