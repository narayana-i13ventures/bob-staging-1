import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const thinkbeyondSlice = createApi({
    reducerPath: "thinkbeyond",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://bobapi.azurewebsites.net",
        headers: {
            "content-type": "application/json",
        },
    }),
    keepUnusedDataFor: 10000000,
    tagTypes: ["Thinkbeyond"],
    endpoints: (builder) => ({
        getThinkbeyondCanvas: builder.query({
            query: (projectId) => ({
                url: `/v1/think_beyond/getcanvas?user_id=3&project_id=${projectId}`,
            }),
            providesTags: ["Thinkbeyond"],
        }),
        updateThinkbeyondCard: builder.mutation({
            query: ({ card, projectId }) => ({
                url: `/v1/think_beyond/updatecard`,
                method: "POST",
                body: JSON.stringify({
                    cardName: card?.cardName,
                    cardNumber: card?.cardNumber,
                    cardSubName: card?.cardSubName,
                    cardInfo: card?.cardInfo,
                    open: card?.open,
                    started: card?.started,
                    complete: card?.complete,
                    selected: card?.selected,
                    locked: card?.locked,
                    type: card?.type,
                    project_id: projectId,
                    user_id: 3,
                }),
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                try {
                    const result: any = await queryFulfilled;
                    const patchResult = dispatch(
                        thinkbeyondSlice.util.updateQueryData(
                            "getThinkbeyondCanvas",
                            data?.projectId,
                            (draft) => {
                                for (const card of draft) {
                                    for (const key in card) {
                                        if (
                                            typeof card[key] === "object" &&
                                            card[key] !== null &&
                                            card[key].cardNumber === data?.card?.cardNumber
                                        ) {
                                            card[key] = Object.entries(result?.data)[0][1];
                                        }
                                    }
                                }
                            }
                        )
                    );
                } catch { }
            },
        }),
        nextThinknbeyondCard: builder.mutation({
            query: ({ projectId, cardNumber }) => ({
                url: `/v1/think_beyond/nextcard`,
                method: "POST",
                body: JSON.stringify({
                    user_id: 3,
                    project_id: projectId,
                    card_number: cardNumber,
                }),
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                try {
                    const result: any = await queryFulfilled;
                    const patchResult = dispatch(
                        thinkbeyondSlice.util.updateQueryData(
                            "getThinkbeyondCanvas",
                            data?.projectId,
                            (draft: any) => {
                                for (const card of draft) {
                                    for (const key in card) {
                                        if (typeof card[key] === "object" && card[key] !== null) {
                                            if (
                                                card[key].cardNumber ===
                                                (Object.entries(result?.data)?.[0]?.[1] as any)[
                                                "cardNumber"
                                                ]
                                            ) {
                                                card[key] = Object.entries(result?.data)[0][1];
                                            } else if (
                                                card[key].cardNumber ===
                                                (Object.entries(result?.data)?.[1]?.[1] as any)[
                                                "cardNumber"
                                                ]
                                            ) {
                                                card[key] = Object.entries(result?.data)[1][1];
                                            }
                                        }
                                    }
                                }
                            }
                        )
                    );
                } catch { }
            },
        }),
        bobSuggestion: builder.mutation({
            query: ({ projectId, cardNumber, bobMessages }) => ({
                url: `/v1/think_beyond/suggestion`,
                method: "POST",
                body: JSON.stringify({
                    user_id: 3,
                    project_id: projectId,
                    cardNumber: cardNumber,
                    section: 0,
                    bobMessages: bobMessages
                }),
            }),
        }),
    }),
});
export const {
    useLazyGetThinkbeyondCanvasQuery,
    useUpdateThinkbeyondCardMutation,
    useNextThinknbeyondCardMutation,
    useBobSuggestionMutation
} = thinkbeyondSlice;
