import React from "react";
import ProjectMenuBtn from "./ProjectMenuBtn";
import { Box, Card, IconButton, Paper, Stack, Typography } from "@mui/material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { useRouter } from "next/navigation";
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
const ProjectCard = (props: any) => {
  const { project } = props;
  const { project_name, project_id } = project;
  const router = useRouter();
  const gotToThinkbeyond = () => {
    router?.push(`/${project?.project_id}/Thinkbeyond`);
  };

  return (
    <>
      <Stack
        component={"div"}
        sx={{
          borderRadius: 2,
          minHeight: "220px",
          cursor: "pointer",
          overflow: "hidden",
          maxHeight: "220px",
          position: "relative",
          border: "1px solid #000",
        }}
      >
        <ProjectMenuBtn projectId={project_id} name={project_name} />
        <Paper
          onClick={gotToThinkbeyond}
          elevation={0}
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
            // backgroundSize: "40%",
            // backgroundPosition: "50% 50%",
            // backgroundRepeat: "no-repeat",
            // backgroundImage: `url('/images/target.png')`,
          }}
        >
          <RocketLaunchOutlinedIcon sx={{ fontSize: '90px' }} />
        </Paper>
        <Stack
          component={"div"}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            p: 1,
            px: 2,
            width: "100%",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              pr: 2,
              fontSize: "15px",
              fontWeight: 600,
              textAlign: "center",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {project_name}
          </Typography>
          {/* <IconButton
            disableFocusRipple
            disableRipple
            disableTouchRipple
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <StarBorderOutlinedIcon fontSize="small" />
          </IconButton> */}
        </Stack>
      </Stack>
    </>
  );
};

export default ProjectCard;
