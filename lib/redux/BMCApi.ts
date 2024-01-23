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
  tagTypes: ["BMC"],
  endpoints: (builder) => ({
    prefillFutuer1BMC: builder.mutation({
      query: ({ projectId, userId }) => ({
        url: `/v1/bmc/prefill`,
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          project_id: projectId,
          future: 1,
        }),
      }),
    }),
    prefillFutuer2BMC: builder.mutation({
      query: ({ projectId, userId }) => ({
        url: `/v1/bmc/future2prefill`,
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          project_id: projectId,
        }),
      }),
    }),
    prefillFutuer3BMC: builder.mutation({
      query: ({ projectId, userId }) => ({
        url: `/v1/bmc/future3prefill`,
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          project_id: projectId,
        }),
      }),
    }),
    GetBMCCanvas: builder.query({
      query: ({ projectId, future, userId }) => ({
        url: `/v1/bmc/getcanvas?user_id=${userId}&future=${future}&project_id=${projectId}`,
      }),
      providesTags: ["BMC"],
    }),
    updateBMCCard: builder.mutation({
      query: ({ projectId, card, future, userId }) => ({
        url: `/v1/bmc/updatecard`,
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          project_id: projectId,
          future: future,
          keypoints: card?.keyPoints,
          card_color: "000000",
          surety: card?.surety,
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
            BMCSlice.util.updateQueryData(
              "GetBMCCanvas",
              {
                projectId: data?.projectId,
                future: data?.future,
                userId: data?.userId,
              },
              (draft: any) => {
                const updatedCardIndex = draft.findIndex((card: any) => {
                  return card?.cardNumber === response?.data?.[0]?.cardNumber;
                });
                if (updatedCardIndex !== -1) {
                  draft[updatedCardIndex] = response?.data?.[0];
                }
                return draft;
              }
            )
          );
        } catch (error) { }
      },
    }),
    nextFuture1BMCCard: builder.mutation({
      query: ({ projectId, future, cardNumber, userId }) => ({
        url: `/v1/bmc/nextcard`,
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          project_id: projectId,
          future: future,
          card_number: cardNumber,
        }),
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const response: any = await queryFulfilled;
          const patchResult = dispatch(
            BMCSlice.util.updateQueryData(
              "GetBMCCanvas",
              {
                projectId: data?.projectId,
                future: data?.future,
                userId: data?.userId,
              },
              (draft: any) => {
                return draft.map((card: any) => {
                  if (card.cardNumber === response?.data?.[0]?.cardNumber) {
                    return response?.data[0];
                  } else if (
                    card.cardNumber === response?.data?.[1]?.cardNumber
                  ) {
                    return response?.data[1];
                  } else {
                    return card;
                  }
                });
              }
            )
          );
        } catch (error) { }
      },
    }),
    selectFuture1BMCCard: builder.mutation({
      query: ({
        projectId,
        future,
        current_card_number,
        next_card_number,
        userId,
      }) => ({
        url: `/v1/bmc/selectcard`,
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          project_id: projectId,
          future: future,
          curr_card_num: current_card_number,
          new_card_num: next_card_number,
        }),
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const response: any = await queryFulfilled;
          const patchResult = dispatch(
            BMCSlice.util.updateQueryData(
              "GetBMCCanvas",
              {
                projectId: data?.projectId,
                future: data?.future,
                userId: data?.userId,
              },
              (draft: any) => {
                return draft.map((card: any) => {
                  if (
                    card.cardNumber === response?.data?.cards?.[0]?.cardNumber
                  ) {
                    return response?.data?.cards?.[0];
                  } else if (
                    card.cardNumber === response?.data?.cards?.[1]?.cardNumber
                  ) {
                    return response?.data?.cards?.[1];
                  } else {
                    return card;
                  }
                });
              }
            )
          );
        } catch (error) { }
      },
    }),
    getFuture1BMCSharedUsers: builder.query({
      query: ({ projectId, future, userId }) => ({
        url: `v1/bmc/shared_with?user_id=${userId}&project_id=${projectId}&future=${future}`,
      }),
    }),
    shareFuture1BMC: builder.mutation({
      query: ({ projectId, future, userId, shared_users }) => ({
        url: `/v1/bmc/share`,
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          project_id: projectId,
          future: future,
          shared_users: shared_users,
        }),
      }),
    }),
  }),
});

export const {
  useLazyGetBMCCanvasQuery,
  usePrefillFutuer1BMCMutation,
  usePrefillFutuer2BMCMutation,
  usePrefillFutuer3BMCMutation,
  useUpdateBMCCardMutation,
  useNextFuture1BMCCardMutation,
  useSelectFuture1BMCCardMutation,
} = BMCSlice;
