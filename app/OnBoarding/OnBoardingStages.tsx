"use client";
import {
    Avatar,
    Button,
    Checkbox,
    FormControl,
    FormGroup,
    Input,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EastIcon from "@mui/icons-material/East";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import FastForwardOutlinedIcon from '@mui/icons-material/FastForwardOutlined';
const OnBoardingStages = () => {
    const theme: any = useTheme();
    const router = useRouter();
    const [role, setRole] = useState("");
    const [username, setUsername] = useState("");
    const [currentStage, setCurrentStage] = useState(0);
    const [collaboration, setCollaboration] = useState<any>([]);
    const [collaborationEmail, setCollaborationEmail] = useState<any>({
        invite1: "",
        invite2: "",
        invite3: "",
    });
    const [usage, setUsage] = useState("");
    const [pricingPlan, setPricingPlan] = useState("");

    const roles = [
        {
            value: "Business Strategist",
        },
        {
            value: "Financial Analyst",
        },
        {
            value: "Investment Advisor",
        },
        {
            value: "Strategic Planner",
        },
        {
            value: "Corporate Planner",
        },
        {
            value: "Chief Financial Officer",
        },
    ];

    const Stage1 = () => {
        return (
            <>
                <Stack
                    direction={"row"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    spacing={2}
                >
                    <Avatar
                        sx={{
                            backgroundColor: theme?.palette?.primary?.main,
                            width: 45,
                            height: 45,
                        }}
                    >
                        <RocketLaunchOutlinedIcon fontSize="large" />
                    </Avatar>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        Bob
                    </Typography>
                </Stack>
                <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, textAlign: "center", my: 6 }}
                >
                    Hi! I'm Bob, your personal assistant👋.
                    <br />
                    I'll be guiding you through your onboarding process.
                </Typography>
                <Button onClick={nextStage} variant="contained">
                    Let's get Started
                </Button>
            </>
        );
    };
    const Stage2 = () => {
        return (
            <Stack
                sx={{ width: "70%", minHeight: "300px" }}
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                spacing={7}
            >
                <Typography variant="body1">
                    To personalize your experience, please choose a username for your
                    account.
                </Typography>
                <FormControl fullWidth>
                    <Input
                        id={`answer`}
                        placeholder={"Enter your Display name"}
                        onChange={(e) => {
                            setUsername(e?.target?.value);
                        }}
                        value={stages[currentStage].getter}
                    />
                </FormControl>
            </Stack>
        );
    };
    const Stage3 = () => {
        return (
            <Stack
                sx={{ width: "70%", minHeight: "300px" }}
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                spacing={7}
            >
                <Typography variant="body1">Which role best describes you?</Typography>
                <FormControl fullWidth>
                    <RadioGroup
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            flexDirection: "row",
                        }}
                        value={role}
                        aria-labelledby="demo-customized-radios"
                        name="customized-radios"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setRole(event.target.value)
                        }
                    >
                        {roles?.map((role: any, index: any) => {
                            return (
                                <FormControl
                                    key={index}
                                    sx={{
                                        my: 2,
                                        width: "45%",
                                        border: "1px solid #000",
                                        borderRadius: 2,
                                    }}
                                >
                                    <label style={{ cursor: "pointer" }}>
                                        <Stack
                                            direction={"row"}
                                            alignItems={"center"}
                                            justifyContent={"flex-start"}
                                        >
                                            <Radio
                                                disableRipple
                                                value={role?.value}
                                                name="radio-buttons"
                                                inputProps={{ "aria-label": role?.value }}
                                            />
                                            <Typography variant="body1" sx={{ fontSize: "13px" }}>
                                                {role?.value}
                                            </Typography>
                                        </Stack>
                                    </label>
                                </FormControl>
                            );
                        })}
                    </RadioGroup>
                </FormControl>
            </Stack>
        );
    };
    const Stage4 = () => {
        const handleCheckboxChange = (event: any) => {
            const value = event.target.value;
            if (event.target.checked) {
                setCollaboration([...collaboration, value]);
            } else {
                setCollaboration(collaboration.filter((role: any) => role !== value));
            }
        };

        return (
            <Stack
                sx={{ width: "70%", minHeight: "300px" }}
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                spacing={7}
            >
                <Typography variant="body1">
                    Who are you collaborating with in your work?
                </Typography>
                <FormGroup
                    sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-around",
                    }}
                >
                    {roles?.map((role: any, index: any) => {
                        return (
                            <FormControl
                                key={index}
                                sx={{
                                    my: 2,
                                    width: "45%",
                                    border: "1px solid #000",
                                    borderRadius: 2,
                                }}
                            >
                                <label style={{ cursor: "pointer" }}>
                                    <Stack
                                        direction={"row"}
                                        justifyContent={"flex-start"}
                                        alignItems={"center"}
                                    >
                                        <Checkbox
                                            checked={collaboration.includes(role?.value)}
                                            onChange={handleCheckboxChange}
                                            className="!absolute !top-1 !right-1"
                                            value={role?.value}
                                            name="radio-buttons"
                                            inputProps={{ "aria-label": role?.value }}
                                        />
                                        <Typography variant="body1" sx={{ fontSize: "13px" }}>
                                            {role?.value}
                                        </Typography>
                                    </Stack>
                                </label>
                            </FormControl>
                        );
                    })}
                </FormGroup>
            </Stack>
        );
    };
    const Stage5 = () => {
        return (
            <Stack
                sx={{ width: "70%", minHeight: "300px" }}
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                spacing={7}
            >
                <Typography variant="body1">
                    Are you using this tool as an individual user or on behalf of a
                    company?
                </Typography>
                <FormControl fullWidth>
                    <RadioGroup
                        value={usage}
                        sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "space-around",
                        }}
                        aria-labelledby="demo-customized-radios"
                        name="customized-radios"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setUsage(event.target.value)
                        }
                    >
                        <FormControl
                            sx={{ width: "45%", border: "1px solid #000", borderRadius: 2 }}
                        >
                            <label style={{ cursor: "pointer" }}>
                                <Stack
                                    direction={"row"}
                                    justifyContent={"flex-start"}
                                    alignItems={"center"}
                                    sx={{ width: "100%" }}
                                >
                                    <Radio
                                        disableRipple
                                        className="!absolute !top-1 !right-1"
                                        value="Single User"
                                        name="radio-buttons"
                                        inputProps={{ "aria-label": "Single User" }}
                                    />
                                    <Typography variant="body1" sx={{ fontSize: "13px" }}>
                                        Single User
                                    </Typography>
                                </Stack>
                            </label>
                        </FormControl>
                        <FormControl
                            sx={{ width: "45%", border: "1px solid #000", borderRadius: 2 }}
                        >
                            <label style={{ cursor: "pointer" }}>
                                <Stack
                                    direction={"row"}
                                    justifyContent={"flex-start"}
                                    alignItems={"center"}
                                    sx={{ width: "100%" }}
                                >
                                    <Radio
                                        disableRipple
                                        className="!absolute !top-1 !right-1"
                                        value="teams"
                                        name="radio-buttons"
                                        inputProps={{ "aria-label": "teams" }}
                                    />
                                    <Typography variant="body1" sx={{ fontSize: "13px" }}>
                                        Teams
                                    </Typography>
                                </Stack>
                            </label>
                        </FormControl>
                    </RadioGroup>
                </FormControl>
            </Stack>
        );
    };
    const Stage6 = () => {
        const handleInvitationEmailChange = (e: any, key: any) => {
            const value = e.target.value;
            setCollaborationEmail({
                ...collaborationEmail,
                [key]: value,
            });
        };
        return (
            <Stack
                sx={{ width: "60%", minHeight: "300px" }}
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                spacing={7}
            >
                <Typography variant="body1">
                    Do you want to invite others to collaborate with you?
                </Typography>
                <FormGroup sx={{ width: "100%" }}>
                    {Object.keys(collaborationEmail).map((key, index) => (
                        <FormControl fullWidth key={key} sx={{ mb: 3 }}>
                            <TextField
                                sx={{
                                    "& .MuiInputBase-input": {
                                        fontSize: "14px",
                                    },
                                }}
                                size="small"
                                id={`answer-${key}`}
                                placeholder={`Enter Collaboration Email Address ${index + 1}`}
                                variant="standard"
                                onChange={(e: any) => {
                                    handleInvitationEmailChange(e, key);
                                }}
                                value={collaborationEmail[key]}
                            />
                        </FormControl>
                    ))}
                </FormGroup>
            </Stack>
        );
    };
    const Stage7 = () => {
        return (
            <Stack
                sx={{ width: "70%", minHeight: "300px" }}
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                spacing={7}
            >
                <Typography variant="body1">What is your Pricing Plan?</Typography>
                <FormControl fullWidth>
                    <RadioGroup
                        value={pricingPlan}
                        sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "space-around",
                        }}
                        aria-labelledby="demo-customized-radios"
                        name="customized-radios"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setPricingPlan(event.target.value)
                        }
                    >
                        <FormControl
                            sx={{ width: "45%", border: "1px solid #000", borderRadius: 2 }}
                        >
                            <label style={{ cursor: "pointer" }}>
                                <Stack
                                    direction={"row"}
                                    justifyContent={"flex-start"}
                                    alignItems={"center"}
                                    sx={{ width: "100%" }}
                                >
                                    <Radio
                                        disableRipple
                                        className="!absolute !top-1 !right-1"
                                        value="free_plan"
                                        name="radio-buttons"
                                        inputProps={{ "aria-label": "Single User" }}
                                    />
                                    <Typography variant="body1" sx={{ fontSize: "13px" }}>
                                        Free
                                    </Typography>
                                </Stack>
                            </label>
                        </FormControl>
                        <FormControl
                            sx={{ width: "45%", border: "1px solid #000", borderRadius: 2 }}
                        >
                            <label style={{ cursor: "pointer" }}>
                                <Stack
                                    direction={"row"}
                                    justifyContent={"flex-start"}
                                    alignItems={"center"}
                                    sx={{ width: "100%" }}
                                >
                                    <Radio
                                        disableRipple
                                        className="!absolute !top-1 !right-1"
                                        value="pro_plan"
                                        name="radio-buttons"
                                        inputProps={{ "aria-label": "teams" }}
                                    />
                                    <Typography variant="body1" sx={{ fontSize: "13px" }}>
                                        Pro
                                    </Typography>
                                </Stack>
                            </label>
                        </FormControl>
                    </RadioGroup>
                </FormControl>
            </Stack>
        );
    };
    const Stage8 = () => {
        return (
            <>
                <Typography variant="body1">
                    Awesome! You're all set. Let's get started!🚀
                </Typography>
                <Link href={"/"}>
                    <Button
                        variant="contained"
                        className="!capitalize !text-white !font-semibold"
                    >
                        Go To My Dashboard
                    </Button>
                </Link>
            </>
        );
    };
    const stages: any = [
        {
            id: 1,
            component: Stage1,
        },
        {
            id: 2,
            component: Stage2,
            getter: username,
        },
        {
            id: 3,
            component: Stage3,
        },
        {
            id: 4,
            component: Stage4,
        },
        {
            id: 5,
            component: Stage5,
        },
        {
            id: 6,
            component: Stage6,
        },
        {
            id: 7,
            component: Stage7,
        },
        {
            id: 8,
            component: Stage8,
        },
    ];
    const nextStage = () => {
        if (currentStage < stages.length - 1) {
            setCurrentStage(currentStage + 1);
            setTimeout(() => {
                const answerInput = document.getElementById("answer");
                if (answerInput) {
                    answerInput.focus();
                }
            }, 0);
        }
    };
    const skipAll = () => {
        router.push('/')
    }
    const previousStage = () => {
        if (currentStage > 0) {
            setCurrentStage(currentStage - 1);
            setTimeout(() => {
                const answerInput = document.getElementById("answer");
                if (answerInput) {
                    answerInput.focus();
                }
            }, 0);
        }
    };
    return (
        <>
            <Stack
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{ minHeight: "100vh", backgroundColor: "#f6f5f4" }}
            >
                <Stack
                    sx={{
                        width: "50%",
                        height: "80vh",
                        maxHeight: "80vh",
                        borderRadius: 2,
                        border: "1px solid #000",
                        backgroundColor: "white",
                        overflowY: "auto",
                    }}
                    direction={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    spacing={7}
                >
                    {stages?.[currentStage]?.component()}
                    {(currentStage !== 7 && currentStage !== 0) && (
                        <Stack
                            direction={"row"}
                            sx={{ width: "70%" }}
                            alignItems={"center"}
                            justifyContent="space-around"
                        >
                            {currentStage !== 1 && (
                                <Button
                                    onClick={previousStage}
                                    sx={{ display: "flex", alignItems: "center" }}
                                >
                                    <ArrowBackIcon />
                                    &nbsp;
                                    <span>Prev</span>
                                </Button>
                            )}
                            <Button
                                onClick={skipAll}
                                sx={{ display: "flex", alignItems: "center" }}
                            >
                                <span>Skip All</span>
                                &nbsp;
                                <FastForwardOutlinedIcon />
                            </Button>
                            <Button
                                onClick={nextStage}
                                sx={{ display: "flex", alignItems: "center" }}
                            >
                                <span>Next</span>
                                &nbsp;
                                <EastIcon />
                            </Button>
                        </Stack>
                    )}
                </Stack>
            </Stack>
        </>
    );
};

export default OnBoardingStages;
