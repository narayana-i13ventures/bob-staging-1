import { PaletteMode } from "@mui/material";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { thinkbeyondSlice } from "../../ThinkbeyondApi";
import { BMCSlice } from "../../BMCApi";

const initialState: any = {
  ThinkBeyondSelectedCard: {},
  Future1BMCSelected: null,
};

export const selectedCards = createSlice({
  name: "selectedCards",
  initialState,
  reducers: {
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
      if (state.Future1BMCSelected !== null && state.Future1BMCSelected !== undefined) {
        const updatedBMCCard: any = { ...state.Future1BMCSelected };
        if (updatedBMCCard?.chat?.length > 0) {
          const lastMessage = updatedBMCCard?.chat?.[updatedBMCCard?.chat?.length - 1];
          lastMessage.content += action.payload;
        }
        state.Future1BMCSelected.chat = updatedBMCCard.chat;
        return state;
      }
      return state;
    },
    updateFuture1BMCKeyPoints: (state, action: PayloadAction<string>) => {
      state.Future1BMCSelected.loadingKeyPoints = false;
      if (state.Future1BMCSelected !== null && state.Future1BMCSelected !== undefined) {
        const updatedBMCCard = { ...state.Future1BMCSelected };
        updatedBMCCard.keyPoints += action.payload;
        state.Future1BMCSelected = updatedBMCCard;
      }
    },
    updateSelectedFuture1BMCCard: (state, action: PayloadAction<any>) => {
      const card: any = action.payload;
      if (state.Future1BMCSelected !== null && state.Future1BMCSelected !== undefined) {
        const updatedCard = {
          ...state.Future1BMCSelected,
          ...card,
        };
        state.Future1BMCSelected = updatedCard;
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
        BMCSlice.endpoints.GetBMCCanvas.matchFulfilled,
        (state, action) => {
          console.log(action?.payload?.[0]);
          state.Future1BMCSelected = action?.payload?.[0];
          // state.Future1BMCCard = action?.payload?.find(
          //   (card: any) => card?.selected === true
          // );
        }
      );
  },
});
