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
  BobOpen: boolean;
  bobThinking: boolean;
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
}

const initialState: AppState = {
  mode: "light",
  NotificationMenu: false,
  userMenu: false,
  projectDetailsOpen: {
    open: false,
    projectId: "",
  },
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
  BobOpen: false,
  bobThinking: false,
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
    toggleShareModal: (state, action) => {
      state.ShareOpen = action?.payload;
    },
    toggleNewProjectOpen: (state, action) => {
      state.newProjectOpen = action?.payload;
    },
    toggleThinkbeyondModalOpen: (state, action) => {
      state.ThinkbeyondModalOpen = action?.payload;
    },
    toggleBobOpen: (state, action) => {
      state.BobOpen = action?.payload;
    },
    toggleBobThinking: (state, action) => {
      state.bobThinking = action?.payload;
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
