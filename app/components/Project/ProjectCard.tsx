import React from "react";
import ProjectMenuBtn from "./ProjectMenuBtn";
import { Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
const ProjectCard = (props: any) => {
  const { project } = props;
  const router = useRouter();
  const { project_name, project_id, is_owner } = project;
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
        <ProjectMenuBtn projectId={project_id} owner={is_owner} />
        <Paper
          onClick={gotToThinkbeyond}
          elevation={0}
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RocketLaunchOutlinedIcon sx={{ fontSize: "90px" }} />
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
