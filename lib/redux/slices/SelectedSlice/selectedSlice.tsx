import { PaletteMode } from "@mui/material";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { thinkbeyondSlice } from "../../ThinkbeyondApi";
import { BMCSlice } from "../../BMCApi";

const initialState: any = {
  ThinkBeyondSelectedCard: null,
  Future1BMCSelected: null,
  Future1CVPSelected: null,
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
    setSelectedFuture1CVPCard: (state, action) => {
      state.Future1CVPSelected = action.payload;
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
