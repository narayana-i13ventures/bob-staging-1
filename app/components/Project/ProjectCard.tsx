import React from "react";
import ProjectMenuBtn from "./ProjectMenuBtn";
import { Box, Card, IconButton, Typography } from "@mui/material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProjectCard = (props: any) => {
  const { project } = props;
  const router = useRouter();
  const gotToThinkbeyond = () => {
    router?.push(`/${project?.project_id}/Thinkbeyond`);
  };

  return (
    <>
      <Card
        onClick={gotToThinkbeyond}
        component={"div"}
        sx={{
          backgroundColor: "white",
          position: "relative",
          cursor: "pointer",
          borderRadius:3
        }}
      >
        <ProjectMenuBtn projectId={project?.project_id} name={project?.project_name} />
        <Box
          sx={{
            minHeight: "150px",
            maxHeight: "150px",
            backgroundColor: "#f1f1f180",
            backgroundImage: `url('/images/test_project.png')`,
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
            backgroundRepeat: "no-repeat",
          }}
        ></Box>
        <Box
          component={"div"}
          sx={{
            py: 1,
            px: 1.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              textAlign: "center",
              overflow: "hidden",
              whiteSpace: "nowrap",
              pr: 2,
            }}
          >
            {project?.project_name}
          </Typography>
          <IconButton
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
          </IconButton>
        </Box>
      </Card>
    </>
  );
};

export default ProjectCard;
