import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BMCSlice = createApi({
    reducerPath: "BMC",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://bobapi.azurewebsites.net",
        headers: {
            "content-type": "application/json",
        },
    }),
    keepUnusedDataFor: 10000000,
    tagTypes: ["Thinkbeyond"],
    endpoints: (builder) => ({
        prefillFutuer1BMC: builder.mutation({
            query: (projectId) => ({
                url: `/v1/bmc/prefill`,
                method: "POST",
                body: JSON.stringify({
                    user_id: 3,
                    project_id: projectId,
                    future: 1,
                }),
            }),
        }),
        GetBMCCanvas: builder.query({
            query: ({ projectId, future }) => ({
                url: `/v1/bmc/getcanvas?user_id=3&future=${future}&project_id=${projectId}`,
            }),
        }),
        updateBMCCard: builder.mutation({
            query: ({ projectId, card, future }) => ({
                url: `/v1/bmc/updatecard`,
                method: "POST",
                body: JSON.stringify({
                    user_id: 3,
                    project_id: projectId,
                    future: future,
                    keypoints: card?.keyPoints,
                    card_color: "000000",
                    surety: "0",
                    is_selected: card?.selected,
                    is_locked: card?.locked,
                    is_complete: true,
                    is_loading: card?.loadingKeyPoints,
                    cardNumber: card?.cardNumber,
                }),
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    BMCSlice.util.updateQueryData("GetBMCCanvas", {}, (draft: any) => {
                        const updatedCardIndex = draft.findIndex(
                            (card: any) => card?.cardNumber === data?.cardNumber
                        );
                        if (updatedCardIndex !== -1) {
                            draft[updatedCardIndex] = data;
                        }
                        return draft;
                    })
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo();
                }
            },
        }),
        nextBMCCard: builder.mutation({
            query: ({ projectId, future, cardNumber }) => ({
                url: `/v1/bmc/nextcard`,
                method: "POST",
                body: JSON.stringify({
                    user_id: 3,
                    project_id: projectId,
                    future: future,
                    card_number: cardNumber,
                }),
            }),
        }),
    }),
});

export const {
    useLazyGetBMCCanvasQuery,
    usePrefillFutuer1BMCMutation,
    useUpdateBMCCardMutation,
    useNextBMCCardMutation
} = BMCSlice;
