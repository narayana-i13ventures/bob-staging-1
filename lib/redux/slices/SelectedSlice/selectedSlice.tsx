import { PaletteMode } from "@mui/material";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { thinkbeyondSlice } from "../../ThinkbeyondApi";
import { BMCSlice } from "../../BMCApi";

const initialState: any = {
  ThinkBeyondSelectedCard: null,
  Future1BMCSelected: null,
  Future2BMCSelected: null,
  Future3BMCSelected: null,
  Future1CVPSelected: null,
  Future2CVPSelected: null,
  Future3CVPSelected: null,
};

export const selectedCardsSlice = createSlice({
  name: "selectedCards",
  initialState,
  reducers: {
    setSelectedThinkbeyondCard: (state, action) => {
      state.ThinkBeyondSelectedCard = action.payload;
    },
    setSelectedFuture1BMCCard: (state, action) => {
      state.Future1BMCSelected = action.payload;
    },
    setSelectedFuture2BMCCard: (state, action) => {
      state.Future2BMCSelected = action.payload;
    },
    setSelectedFuture3BMCCard: (state, action) => {
      state.Future3BMCSelected = action.payload;
    },
    setSelectedFuture1CVPCard: (state, action) => {
      state.Future1CVPSelected = action.payload;
    },
    setSelectedFuture2CVPCard: (state, action) => {
      state.Future2CVPSelected = action.payload;
    },
    setSelectedFuture3CVPCard: (state, action) => {
      state.Future3CVPSelected = action.payload;
    },
    updateThinkbeyondText: (
      state,
      action: PayloadAction<{ heading: string; text: string }>
    ) => {
      const { heading, text } = action.payload;
      if (
        state?.ThinkBeyondSelectedCard !== null &&
        state?.ThinkBeyondSelectedCard !== undefined
      ) {
        state.ThinkBeyondSelectedCard = {
          ...state?.ThinkBeyondSelectedCard,
          started: true,
          cardInfo: state?.ThinkBeyondSelectedCard?.cardInfo?.map(
            (info: any) => {
              if (info.heading === heading) {
                return { ...info, text };
              }
              return info;
            }
          ),
        };
        const anyEmpty = state?.ThinkBeyondSelectedCard?.cardInfo?.some(
          (info: any) => info.text === ""
        );
        state.ThinkBeyondSelectedCard.complete = !anyEmpty;
      }
    },
    updateFuture1BMCChat(state, action: PayloadAction<string>) {
      if (
        state.Future1BMCSelected !== null &&
        state.Future1BMCSelected !== undefined
      ) {
        const updatedBMCCard: any = { ...state.Future1BMCSelected };
        if (updatedBMCCard?.chat?.length > 0) {
          const lastMessage =
            updatedBMCCard?.chat?.[updatedBMCCard?.chat?.length - 1];
          lastMessage.content += action.payload;
        }
        state.Future1BMCSelected.chat = updatedBMCCard.chat;
        return state;
      }
      return state;
    },
    updateFuture1BMCKeyPoints: (state, action: PayloadAction<string>) => {
      state.Future1BMCSelected.loadingKeyPoints = false;
      if (
        state.Future1BMCSelected !== null &&
        state.Future1BMCSelected !== undefined
      ) {
        const updatedBMCCard = { ...state.Future1BMCSelected };
        updatedBMCCard.keyPoints += action.payload;
        state.Future1BMCSelected = updatedBMCCard;
      }
    },
    updateSelectedFuture1BMCCard: (state, action: PayloadAction<any>) => {
      const card: any = action.payload;
      if (
        state.Future1BMCSelected !== null &&
        state.Future1BMCSelected !== undefined
      ) {
        const updatedCard = {
          ...state.Future1BMCSelected,
          ...card,
        };
        state.Future1BMCSelected = updatedCard;
      }
    },
    updateFuture2BMCChat(state, action: PayloadAction<string>) {
      if (
        state.Future2BMCSelected !== null &&
        state.Future2BMCSelected !== undefined
      ) {
        const updatedBMCCard: any = { ...state.Future2BMCSelected };
        if (updatedBMCCard?.chat?.length > 0) {
          const lastMessage =
            updatedBMCCard?.chat?.[updatedBMCCard?.chat?.length - 1];
          lastMessage.content += action.payload;
        }
        state.Future2BMCSelected.chat = updatedBMCCard.chat;
        return state;
      }
      return state;
    },
    updateFuture2BMCKeyPoints: (state, action: PayloadAction<string>) => {
      state.Future2BMCSelected.loadingKeyPoints = false;
      if (
        state.Future2BMCSelected !== null &&
        state.Future2BMCSelected !== undefined
      ) {
        const updatedBMCCard = { ...state.Future2BMCSelected };
        updatedBMCCard.keyPoints += action.payload;
        state.Future2BMCSelected = updatedBMCCard;
      }
    },
    updateSelectedFuture2BMCCard: (state, action: PayloadAction<any>) => {
      const card: any = action.payload;
      if (
        state.Future2BMCSelected !== null &&
        state.Future2BMCSelected !== undefined
      ) {
        const updatedCard = {
          ...state.Future2BMCSelected,
          ...card,
        };
        state.Future2BMCSelected = updatedCard;
      }
    },
    updateFuture3BMCChat(state, action: PayloadAction<string>) {
      if (
        state.Future3BMCSelected !== null &&
        state.Future3BMCSelected !== undefined
      ) {
        const updatedBMCCard: any = { ...state.Future3BMCSelected };
        if (updatedBMCCard?.chat?.length > 0) {
          const lastMessage =
            updatedBMCCard?.chat?.[updatedBMCCard?.chat?.length - 1];
          lastMessage.content += action.payload;
        }
        state.Future3BMCSelected.chat = updatedBMCCard.chat;
        return state;
      }
      return state;
    },
    updateFuture3BMCKeyPoints: (state, action: PayloadAction<string>) => {
      state.Future3BMCSelected.loadingKeyPoints = false;
      if (
        state.Future3BMCSelected !== null &&
        state.Future3BMCSelected !== undefined
      ) {
        const updatedBMCCard = { ...state.Future3BMCSelected };
        updatedBMCCard.keyPoints += action.payload;
        state.Future3BMCSelected = updatedBMCCard;
      }
    },
    updateSelectedFuture3BMCCard: (state, action: PayloadAction<any>) => {
      const card: any = action.payload;
      if (
        state.Future3BMCSelected !== null &&
        state.Future3BMCSelected !== undefined
      ) {
        const updatedCard = {
          ...state.Future3BMCSelected,
          ...card,
        };
        state.Future3BMCSelected = updatedCard;
      }
    },
    updateFuture1CVPChat(state, action: PayloadAction<string>) {
      if (
        state.Future1CVPSelected !== null &&
        state.Future1CVPSelected !== undefined
      ) {
        const updatedCVPCard: any = { ...state.Future1CVPSelected };
        if (updatedCVPCard?.chat?.length > 0) {
          const lastMessage =
            updatedCVPCard?.chat?.[updatedCVPCard?.chat?.length - 1];
          lastMessage.content += action.payload;
        }
        state.Future1CVPSelected.chat = updatedCVPCard.chat;
        return state;
      }
      return state;
    },
    updateFuture1CVPKeyPoints: (state, action: PayloadAction<string>) => {
      state.Future1CVPSelected.loadingKeyPoints = false;
      if (
        state.Future1CVPSelected !== null &&
        state.Future1CVPSelected !== undefined
      ) {
        const updatedCVPCard = { ...state.Future1CVPSelected };
        updatedCVPCard.keyPoints += action.payload;
        state.Future1CVPSelected = updatedCVPCard;
      }
    },
    updateSelectedFuture1CVPCard: (state, action: PayloadAction<any>) => {
      const card: any = action.payload;
      if (
        state.Future1CVPSelected !== null &&
        state.Future1CVPSelected !== undefined
      ) {
        const updatedCard = {
          ...state.Future1CVPSelected,
          ...card,
        };
        state.Future1CVPSelected = updatedCard;
      }
    },
    updateFuture2CVPChat(state, action: PayloadAction<string>) {
      if (
        state.Future2CVPSelected !== null &&
        state.Future2CVPSelected !== undefined
      ) {
        const updatedCVPCard: any = { ...state.Future2CVPSelected };
        if (updatedCVPCard?.chat?.length > 0) {
          const lastMessage =
            updatedCVPCard?.chat?.[updatedCVPCard?.chat?.length - 1];
          lastMessage.content += action.payload;
        }
        state.Future2CVPSelected.chat = updatedCVPCard.chat;
        return state;
      }
      return state;
    },
    updateFuture2CVPKeyPoints: (state, action: PayloadAction<string>) => {
      state.Future2CVPSelected.loadingKeyPoints = false;
      if (
        state.Future2CVPSelected !== null &&
        state.Future2CVPSelected !== undefined
      ) {
        const updatedCVPCard = { ...state.Future2CVPSelected };
        updatedCVPCard.keyPoints += action.payload;
        state.Future2CVPSelected = updatedCVPCard;
      }
    },
    updateSelectedFuture2CVPCard: (state, action: PayloadAction<any>) => {
      const card: any = action.payload;
      if (
        state.Future2CVPSelected !== null &&
        state.Future2CVPSelected !== undefined
      ) {
        const updatedCard = {
          ...state.Future2CVPSelected,
          ...card,
        };
        state.Future2CVPSelected = updatedCard;
      }
    },
    updateFuture3CVPChat(state, action: PayloadAction<string>) {
      if (
        state.Future3CVPSelected !== null &&
        state.Future3CVPSelected !== undefined
      ) {
        const updatedCVPCard: any = { ...state.Future3CVPSelected };
        if (updatedCVPCard?.chat?.length > 0) {
          const lastMessage =
            updatedCVPCard?.chat?.[updatedCVPCard?.chat?.length - 1];
          lastMessage.content += action.payload;
        }
        state.Future3CVPSelected.chat = updatedCVPCard.chat;
        return state;
      }
      return state;
    },
    updateFuture3CVPKeyPoints: (state, action: PayloadAction<string>) => {
      state.Future3CVPSelected.loadingKeyPoints = false;
      if (
        state.Future3CVPSelected !== null &&
        state.Future3CVPSelected !== undefined
      ) {
        const updatedCVPCard = { ...state.Future3CVPSelected };
        updatedCVPCard.keyPoints += action.payload;
        state.Future3CVPSelected = updatedCVPCard;
      }
    },
    updateSelectedFuture3CVPCard: (state, action: PayloadAction<any>) => {
      const card: any = action.payload;
      if (
        state.Future3CVPSelected !== null &&
        state.Future3CVPSelected !== undefined
      ) {
        const updatedCard = {
          ...state.Future3CVPSelected,
          ...card,
        };
        state.Future3CVPSelected = updatedCard;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        thinkbeyondSlice.endpoints.getThinkbeyondCanvas.matchFulfilled,
        (state, action) => {
          for (const card of action?.payload) {
            for (const key in card) {
              if (card[key] !== null && typeof card[key] === "object") {
                if (
                  card[key].hasOwnProperty("selected") &&
                  card[key].selected === true
                ) {
                  state.ThinkBeyondSelectedCard = card[key];
                  break;
                }
              }
            }
            if (state.ThinkBeyondSelectedCard) {
              break;
            }
          }
        }
      )
      .addMatcher(
        thinkbeyondSlice.endpoints.updateThinkbeyondCard.matchFulfilled,
        (state, action) => {
          if (
            (Object.entries(action.payload)?.[0]?.[1] as any)["selected"] ===
            true
          ) {
            state.ThinkBeyondSelectedCard = Object.entries(
              action?.payload
            )[0][1];
          }
        }
      )
      .addMatcher(
        thinkbeyondSlice.endpoints.nextThinknbeyondCard.matchFulfilled,
        (state, action) => {
          if (
            (Object.entries(action?.payload)?.[0]?.[1] as any)["selected"] ===
            true
          ) {
            state.ThinkBeyondSelectedCard = Object.entries(
              action?.payload
            )[0][1];
          } else if (
            (Object.entries(action?.payload)?.[1]?.[1] as any)["selected"] ===
            true
          ) {
            state.ThinkBeyondSelectedCard = Object.entries(
              action?.payload
            )[1][1];
          }
        }
      )
      .addMatcher(
        thinkbeyondSlice.endpoints.selectThinkbeyondCard.matchFulfilled,
        (state, action) => {
          if (action?.payload?.[0]?.selected === true) {
            state.ThinkBeyondSelectedCard = action?.payload?.[0];
          } else if (action?.payload?.[1]?.selected === true) {
            state.ThinkBeyondSelectedCard = action?.payload?.[1];
          }
        }
      );
    // .addMatcher(
    //   BMCSlice.endpoints.GetFuture1BMCCanvas.matchFulfilled,
    //   (state, action) => {
    //     state.Future1BMCSelected = action?.payload?.find(
    //       (card: any) => card?.selected === true
    //     );
    //   }
    // );
    // .addMatcher(
    //   BMCSlice.endpoints.updateFuture1BMCCard.matchFulfilled,
    //   (state, action) => {
    //     if (action?.payload?.[0]?.selected === true) {
    //       state.Future1BMCSelected = action?.payload?.[0];
    //     }
    //   }
    // )
    // .addMatcher(
    //   BMCSlice.endpoints.nextFuture1BMCCard.matchFulfilled,
    //   (state, action) => {
    //     if (action?.payload?.[0]?.selected === true) {
    //       state.Future1BMCSelected = action?.payload?.[0];
    //     } else if (action?.payload?.[1]?.selected === true) {
    //       state.Future1BMCSelected = action?.payload?.[1];
    //     }
    //   }
    // )
    // .addMatcher(
    //   BMCSlice.endpoints.selectFuture1BMCCard.matchFulfilled,
    //   (state, action) => {
    //     if (action?.payload?.cards?.[0]?.selected === true) {
    //       console.log("checkpoint 1");
    //       console.log(action?.payload?.cards?.[0]);
    //       state.Future1BMCSelected = action?.payload?.cards?.[0];
    //     } else if (action?.payload?.cards?.[1]?.selected === true) {
    //       console.log("checkpoint 2");
    //       console.log(action?.payload?.cards?.[1]);
    //       state.Future1BMCSelected = action?.payload?.cards?.[1];
    //     }
    //   }
    // );
  },
});
