"use client";
import React, { useEffect, useState } from "react";
import EastIcon from "@mui/icons-material/East";
import { useSelector, useDispatch, selectApp, appSlice } from "@/lib/redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    Input,
    MenuItem,
    Select,
    Typography,
    useTheme,
} from "@mui/material";
import { useCreateProjectMutation } from "@/lib/redux/projectApi";

const ProjectStages = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { company, companyStage } = useSelector(selectApp);
    const [inputError, setInputError] = useState("");
    const [
        createProject,
        {
            isLoading: create_project_loading,
            isSuccess: create_project_success,
            isError: create_project_error,
        },
    ] = useCreateProjectMutation();

    const {
        companyName,
        industry,
        vertical,
        companyType,
        companySize,
        companyHeadquarters,
        companyTargetRegions,
        fundingStage,
        annualRevenue,
        businessModel,
    } = company;

    const stages: any[] = [
        {
            id: 1,
            content:
                "First, let's start with your company. What is the name of your company?",
            getter: companyName,
            setter: appSlice.actions.setCompanyName,
            type: "text",
            error: "Company Name is Required",
            placeholder: "Enter your Company Name",
            required: true,
        },
        {
            id: 2,
            content: "Next, what industry is your company in?",
            getter: industry,
            setter: appSlice.actions.setIndustry,
            type: "select",
            error: "Industry is Required",
            placeholder: "Enter your Industry Type",
            options: [
                "Aerospace",
                "Automotive",
                "Biotechnology",
                "Chemical",
                "Computer Hardware",
                "Computer Software",
                "Construction",
                "Consumer Electronics",
                "Defense",
                "Education",
                "Energy",
                "Entertainment",
                "Fashion",
                "Finance",
                "Food and Beverage",
                "Healthcare",
                "Hospitality",
                "Information Technology",
                "Manufacturing",
                "Media",
                "Mining",
                "Music",
                "Pharmaceuticals",
                "Retail",
                "Telecommunications",
                "Transportation",
                "Other",
            ],
            required: true,
        },
        {
            id: 3,
            content:
                "Within your industry, what particular vertical are you tackling",
            getter: vertical,
            setter: appSlice.actions.setVertical,
            type: "text",
            error: "Vertical is Required",
            placeholder: "Enter your Vertical",
            required: true,
        },
        {
            id: 4,
            content: "What type of company are you?",
            example: "e.g. B2B, B2C, B2B2C, etc.",
            getter: companyType,
            setter: appSlice.actions.setCompanyType,
            type: "select",
            error: "Company Type is Required",
            placeholder: "Enter your Company Type",
            options: [
                "B2B (Business-to-Business)",
                "B2C (Business-to-Consumer)",
                "B2B2C (Business-to-Business-to-Consumer)",
                "C2C (Consumer-to-Consumer)",
                "D2C (Direct-to-Consumer)",
                "G2B (Government-to-Business)",
                "G2C (Government-to-Consumer)",
                "Non-Profit",
                "Other",
            ],
            required: true,
        },
        {
            id: 5,
            content: "What is the size of your company?",
            example: "e.g. 1-10, 11-50, 51-200, 201-500, 501-1000, 1000+",
            getter: companySize,
            setter: appSlice.actions.setCompanySize,
            type: "select",
            error: "Company Size is Required",
            placeholder: "Enter your Company Size",
            options: [
                "1-10 employees",
                "11-50 employees",
                "51-200 employees",
                "201-500 employees",
                "501-1000 employees",
                "1000+ employees",
            ],
            required: true,
        },
        {
            id: 6,
            content: "Where is the primary headquarters of your company?",
            example: "e.g. San Francisco, CA, USA",
            getter: companyHeadquarters,
            setter: appSlice.actions.setCompanyHeadquarters,
            type: "select",
            error: "Primary Headquarters is Required",
            placeholder: "Enter your Primary Headquarters",
            options: [
                "San Francisco, CA, USA",
                "New York City, NY, USA",
                "London, UK",
                "Tokyo, Japan",
                "Sydney, Australia",
                "Los Angeles, CA, USA",
                "Chicago, IL, USA",
                "Toronto, Canada",
                "Shanghai, China",
                "Singapore",
                "Mumbai, India",
                "Paris, France",
                "Berlin, Germany",
                "Seoul, South Korea",
                "Hong Kong",
            ],
            required: true,
        },
        {
            id: 7,
            content: "Where are the primary target regions of your company?",
            example: "e.g. North America, Europe, Asia, etc.",
            getter: companyTargetRegions,
            setter: appSlice.actions.setCompanyTargetRegions,
            type: "select",
            error: "Target Regions are Required",
            placeholder: "Enter your Target Regions",
            options: [
                "San Francisco, CA, USA",
                "New York City, NY, USA",
                "London, UK",
                "Tokyo, Japan",
                "Sydney, Australia",
                "Los Angeles, CA, USA",
                "Chicago, IL, USA",
                "Toronto, Canada",
                "Shanghai, China",
                "Singapore",
                "Mumbai, India",
                "Paris, France",
                "Berlin, Germany",
                "Seoul, South Korea",
                "Hong Kong",
            ],
            required: true,
        },
        {
            id: 8,
            content: "What stage of funding are you in?",
            example: "e.g. Pre-seed, Seed, Series A, etc.",
            getter: fundingStage,
            setter: appSlice.actions.setFundingStage,
            type: "select",
            error: "Funding is Required",
            placeholder: "Enter your Funding Stage",
            options: [
                "Pre-seed",
                "Seed",
                "Series A",
                "Series B",
                "Series C",
                "Series D and beyond",
                "Bootstrapped",
                "Not Applicable (e.g., non-profit)",
                "Other",
            ],
            required: true,
        },
        {
            id: 9,
            content: "What is your current annual recurring revenue (ARR)?",
            example: "e.g. $0, $1-$100k, $100k-$1M, $1M-$10M, $10M+",
            getter: annualRevenue,
            setter: appSlice.actions.setAnnualRevenue,
            type: "select",
            error: "Annual Recurring Revenue is Required",
            placeholder: "Enter your ARR",
            options: [
                "$0",
                "$1 - $100k",
                "$100k - $1M",
                "$1M - $10M",
                "$10M+",
                "Not Applicable",
                "Other",
            ],
            required: true,
        },
        {
            id: 10,
            content: "How would you describe your business model?",
            example: "e.g. Subscription, Transactional, etc.",
            getter: businessModel,
            setter: appSlice.actions.setBusinessModel,
            type: "select",
            error: "Business Model is Required",
            placeholder: "Enter your Business Model",
            options: [
                "Subscription",
                "Transactional",
                "Freemium",
                "Marketplace",
                "SaaS (Software as a Service)",
                "E-commerce",
                "Ad-based",
                "On-demand",
                "Service-based",
                "Not Applicable",
                "Other",
            ],
            required: true,
        },
        {
            id: 11,
            message: "Project Created Successfully!!",
            type: "message",
        },
    ];

    // if (create_project_error) {
    //     dispatch(appSlice.actions.to)
    // }

    const answerInput = document.getElementById("answer");

    useEffect(() => {
        if (answerInput) {
            answerInput.focus();
        }
    }, [answerInput]);

    const nextStage = () => {
        if (companyStage < stages.length - 1) {
            const companyStageData = stages[companyStage];
            if (companyStageData.required && !companyStageData.getter) {
                setInputError(companyStageData.error);
                return;
            }

            if (companyStage === 9) {
                createProject(company)
                    .unwrap()
                    .then((data: any) => {
                        setInputError("");
                        dispatch(appSlice.actions.toggleCompanyStage(companyStage + 1));
                    });
            } else {
                setInputError("");
                dispatch(appSlice.actions.toggleCompanyStage(companyStage + 1));
                setTimeout(() => {
                    const answerInput = document.getElementById("answer");
                    if (answerInput) {
                        answerInput.focus();
                    }
                }, 0);
            }
        }
    };

    const previousStage = () => {
        if (companyStage > 0) {
            dispatch(appSlice.actions.toggleCompanyStage(companyStage - 1));
            setTimeout(() => {
                const answerInput = document.getElementById("answer");
                if (answerInput) {
                    answerInput.focus();
                }
            }, 0);
        }
    };

    const handleInputChange = (e: any) => {
        const companyStageData = stages[companyStage];
        if (inputError && companyStageData.required && e.target.value) {
            setInputError("");
        }
        dispatch(companyStageData?.setter(e.target.value));
    };

    return (
        <>
            {!create_project_loading && !create_project_error ? (
                <Box
                    component={"div"}
                    sx={{
                        minHeight: "200px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        flexDirection: "column",
                    }}
                >
                    <Box
                        component={"div"}
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            flexDirection: "column",
                        }}
                    >
                        {stages[companyStage]?.content && (
                            <Typography variant="body1" sx={{ pb: 3, pt: 1 }}>
                                {stages[companyStage]?.content}
                            </Typography>
                        )}
                        {stages[companyStage]?.type === "select" ? (
                            <FormControl fullWidth size="small">
                                <Select
                                    sx={{
                                        fontSize: "14px",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderWidth: "1px !important",
                                        },
                                    }}
                                    fullWidth
                                    id={`answer`}
                                    placeholder={stages[companyStage]?.placeholder}
                                    onChange={(e) => {
                                        handleInputChange(e);
                                    }}
                                    value={stages[companyStage]?.getter || `Select an Option`}
                                >
                                    <MenuItem disabled value="Select an Option">
                                        Select an Option
                                    </MenuItem>
                                    {stages[companyStage].options.map((option: any) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {/* Display the error message */}
                                {inputError && (
                                    <Typography variant="caption" sx={{ pt: 1, color: "red" }}>
                                        {inputError}
                                    </Typography>
                                )}
                            </FormControl>
                        ) : stages[companyStage]?.type === "text" ? (
                            <FormControl fullWidth>
                                <Input
                                    sx={{
                                        fontSize: "14px",
                                    }}
                                    id={`answer`}
                                    placeholder={stages[companyStage]?.placeholder}
                                    onChange={(e) => {
                                        handleInputChange(e);
                                    }}
                                    value={stages[companyStage].getter}
                                />
                                {/* Display the error message */}
                                {inputError && (
                                    <Typography variant="caption" sx={{ pt: 1, color: "red" }}>
                                        {inputError}
                                    </Typography>
                                )}
                            </FormControl>
                        ) : (
                            <>
                                <Box
                                    component={"div"}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "column",
                                        width: "100%",
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 600, pb: 3, pt: 2 }}
                                    >
                                        {stages[companyStage]?.message}
                                    </Typography>
                                    <Button variant="contained" sx={{ mb: 3 }}>
                                        Let's get Started
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Box>
                    <Box
                        component={"div"}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            justifyContent:
                                companyStage === 0
                                    ? "justify-end"
                                    : companyStage === 10
                                        ? "justify-start"
                                        : "justify-between",
                        }}
                    >
                        {companyStage !== 0 && companyStage !== 10 && (
                            <Box
                                component={"div"}
                                onClick={previousStage}
                                sx={{
                                    color: theme.palette.primary.main,
                                    cursor: "pointer",
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                }}
                            >
                                <ArrowBackIcon />
                                &nbsp;
                                <Typography variant="body1">Prev</Typography>
                            </Box>
                        )}
                        {companyStage !== 10 && (
                            <Box
                                component={"div"}
                                onClick={nextStage}
                                sx={{
                                    py: 3,
                                    width: "100%",
                                    color: theme.palette.primary.main,
                                    cursor: "pointer",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                }}
                            >
                                <Typography variant="body1">Next</Typography>
                                &nbsp;
                                <EastIcon />
                            </Box>
                        )}
                    </Box>
                </Box>
            ) : (
                <Box
                    component={"div"}
                    sx={{
                        width: "100%",
                        minHeight: "200px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
        </>
    );
};

export default ProjectStages;
