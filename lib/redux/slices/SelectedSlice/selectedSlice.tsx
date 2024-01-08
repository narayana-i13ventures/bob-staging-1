import { PaletteMode } from "@mui/material";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../../Api";

const initialState: any = {
    ThinkBeyondSelectedCard: {},
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
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                apiSlice.endpoints.getThinkBeyond.matchFulfilled,
                (state, action) => {
                    state.ThinkBeyondSelectedCard = action.payload.find(
                        (card: any) => card?.selected
                    );
                }
            )
            .addMatcher(
                apiSlice.endpoints.updateThinkBeyond.matchFulfilled,
                (state, action) => {
                    if (action.payload.selected) {
                        state.ThinkBeyondSelectedCard = action.payload;
                    }
                }
            )
            .addMatcher(
                apiSlice.endpoints.nextThinkBeyond.matchFulfilled,
                (state, action) => {
                    const response = action.payload;
                    const selectedCard = response.find(
                        (card: any) => card.selected === true
                    );
                    if (selectedCard) {
                        state.ThinkBeyondSelectedCard = selectedCard;
                    }
                }
            );
    },
});
