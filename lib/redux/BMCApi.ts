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
        GetFuture1BMCCanvas: builder.query({
            query: ({ projectId, future }) => ({
                url: `/v1/bmc/getcanvas?user_id=3&future=${future}&project_id=${projectId}`,
            }),
        }),
        updateFuture1BMCCard: builder.mutation({
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
                try {
                    const response: any = await queryFulfilled;
                    const patchResult = dispatch(
                        BMCSlice.util.updateQueryData("GetFuture1BMCCanvas", { projectId: data?.projectId, future: data?.future }, (draft: any) => {
                            const updatedCardIndex = draft.findIndex(
                                (card: any) => {
                                    return card?.cardNumber === response?.data?.[0]?.cardNumber
                                }
                            );
                            if (updatedCardIndex !== -1) {
                                draft[updatedCardIndex] = response?.data?.[0];
                            }
                            return draft;
                        })
                    );
                } catch (error) { }
            },
        }),
        nextFuture1BMCCard: builder.mutation({
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
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                try {
                    const response: any = await queryFulfilled;
                    const patchResult = dispatch(
                        BMCSlice.util.updateQueryData("GetFuture1BMCCanvas", { projectId: data?.projectId, future: data?.future }, (draft: any) => {
                            return draft.map((card: any) => {
                                if (card.cardNumber === response?.data?.[0]?.cardNumber) {
                                    return response?.data[0];
                                } else if (card.cardNumber === response?.data?.[1]?.cardNumber) {
                                    return response?.data[1];
                                } else {
                                    return card;
                                }
                            });
                        })
                    );
                } catch (error) { }
            },
        }),
    }),
});

export const {
    useLazyGetFuture1BMCCanvasQuery,
    usePrefillFutuer1BMCMutation,
    useUpdateFuture1BMCCardMutation,
    useNextFuture1BMCCardMutation,
} = BMCSlice;
