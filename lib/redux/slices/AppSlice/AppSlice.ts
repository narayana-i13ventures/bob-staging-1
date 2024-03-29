import { PaletteMode } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  mode: PaletteMode;
  NotificationMenu: boolean;
  userMenu: boolean;
  projectDetailsOpen: {
    open: boolean;
    projectId: string;
  };
  show_projects: String;
  ShareOpen: {
    open: boolean;
    type: String;
    data: any;
  };
  newProjectOpen: boolean;
  company: {
    companyName: String;
    industry: String;
    vertical: String;
    companyType: String;
    companySize: String;
    companyHeadquarters: String;
    companyTargetRegions: String;
    fundingStage: String;
    annualRevenue: String;
    businessModel: String;
  };
  companyStage: number;
  ThinkbeyondModalOpen: boolean;
  ThinkbeyondSettings: boolean;
  ThinkbeyondActivity: {
    open: boolean;
    type: String;
  };
  BobOpen: boolean;
  bobThinking: boolean;
  bobGenerating: boolean;
  bobPrefill: {
    loading: boolean;
    error: boolean;
    projectId: String;
    userId: String;
    futureId: String;
  };
  BobMessages: any[];
  globalSnackBar: {
    open: boolean;
    content: String;
    clossable: boolean;
  };
  canvasModalOpen: boolean;
  canvasSettings: boolean;
  canvasRoadmap: boolean;
  activeProfileTab: string;
  canvasActivity: {
    open: boolean;
    type: String;
  };
}

const initialState: AppState = {
  mode: "light",
  NotificationMenu: false,
  userMenu: false,
  projectDetailsOpen: {
    open: false,
    projectId: "",
  },
  show_projects: "all",
  ShareOpen: {
    open: false,
    type: "",
    data: "",
  },
  newProjectOpen: false,
  company: {
    companyName: "",
    industry: "",
    vertical: "",
    companyType: "",
    companySize: "",
    companyHeadquarters: "",
    companyTargetRegions: "",
    fundingStage: "",
    annualRevenue: "",
    businessModel: "",
  },
  companyStage: 0,
  ThinkbeyondModalOpen: false,
  ThinkbeyondSettings: false,
  ThinkbeyondActivity: {
    open: false,
    type: "",
  },
  BobOpen: false,
  bobThinking: false,
  bobGenerating: false,
  bobPrefill: {
    loading: false,
    error: false,
    projectId: "",
    userId: "",
    futureId: "",
  },
  BobMessages: [
    {
      content:
        "Hi, I'm Bob! 👋 Start working on your ThinkBeyond Canvas and I'll gradually give you advice and suggestions!",
      role: "assistant",
    },
  ],
  globalSnackBar: {
    open: false,
    content: "",
    clossable: false,
  },
  canvasModalOpen: false,
  canvasSettings: false,
  canvasRoadmap: false,
  activeProfileTab: "profile",
  canvasActivity: {
    open: false,
    type: "",
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleNotificationMenu: (state, action) => {
      state.NotificationMenu = action?.payload;
    },
    toggleUserMenu: (state, action) => {
      state.userMenu = action?.payload;
    },
    toggleProjectDetails: (state, action) => {
      state.projectDetailsOpen = action?.payload;
    },
    toggleShowProjects: (state, action) => {
      state.show_projects = action?.payload;
    },
    toggleShareModal: (state, action) => {
      state.ShareOpen = action?.payload;
    },
    toggleNewProjectOpen: (state, action) => {
      state.newProjectOpen = action?.payload;
    },
    toggleThinkbeyondModalOpen: (state, action) => {
      state.ThinkbeyondModalOpen = action?.payload;
    },
    toggleThinkbeyondActivity: (state, action) => {
      state.ThinkbeyondActivity = action?.payload;
    },
    toggleBobOpen: (state, action) => {
      state.BobOpen = action?.payload;
    },
    toggleBobThinking: (state, action) => {
      state.bobThinking = action?.payload;
    },
    toggleBobGenerating: (state, action) => {
      state.bobGenerating = action?.payload;
    },
    toggleBobPrefill: (state, action) => {
      state.bobPrefill = action?.payload;
    },
    setGlobalSnackBar: (state, action) => {
      state.globalSnackBar = action.payload;
    },
    toggleThinkbeyondSettings: (state, action) => {
      state.ThinkbeyondSettings = action?.payload;
    },
    toggleCanvasModalOpen: (state, action) => {
      state.canvasModalOpen = action.payload;
    },
    toggleCanvasSettings: (state, action) => {
      state.canvasSettings = action?.payload;
    },
    toggleCanvasRoadmap: (state, action) => {
      state.canvasRoadmap = action?.payload;
    },
    toggleActiveProfileTab: (state, action) => {
      state.activeProfileTab = action.payload;
    },
    setCanvasActivity: (state, action) => {
      state.canvasActivity = action?.payload;
    },
    //==============================================
    //=====================Bob======================
    //==============================================
    setBobMessages: (state) => {
      const lastMessage = state.BobMessages[state.BobMessages.length - 1];
      if (!lastMessage || lastMessage.content !== "") {
        state.BobMessages = [
          ...state.BobMessages,
          { content: "", role: "assistant" },
        ];
      }
    },
    removeBobMessages: (state) => {
      if (state.BobMessages.length > 0) {
        state.BobMessages.pop();
      }
    },
    updateBobMessages: (state, action) => {
      const updatedMessages = [...state.BobMessages];
      const lastMessage = updatedMessages[state.BobMessages.length - 1];
      if (lastMessage) {
        lastMessage.content = action.payload;
      }
      state.BobMessages = updatedMessages;
    },
    //==============================================
    //===================Company====================
    //==============================================
    toggleCompanyStage(state, action) {
      state.companyStage = action.payload;
    },
    setCompanyName(state, action) {
      state.company.companyName = action.payload;
    },
    setIndustry(state, action) {
      state.company.industry = action.payload;
    },
    setVertical(state, action) {
      state.company.vertical = action.payload;
    },
    setCompanyType(state, action) {
      state.company.companyType = action.payload;
    },
    setCompanySize(state, action) {
      state.company.companySize = action.payload;
    },
    setCompanyHeadquarters(state, action) {
      state.company.companyHeadquarters = action.payload;
    },
    setCompanyTargetRegions(state, action) {
      state.company.companyTargetRegions = action.payload;
    },
    setFundingStage(state, action) {
      state.company.fundingStage = action.payload;
    },
    setAnnualRevenue(state, action) {
      state.company.annualRevenue = action.payload;
    },
    setBusinessModel(state, action) {
      state.company.businessModel = action.payload;
    },
    resetCompany(state) {
      state.company = {
        companyName: "",
        industry: "",
        vertical: "",
        companyType: "",
        companySize: "",
        companyHeadquarters: "",
        companyTargetRegions: "",
        fundingStage: "",
        annualRevenue: "",
        businessModel: "",
      };
    },
  },
});
