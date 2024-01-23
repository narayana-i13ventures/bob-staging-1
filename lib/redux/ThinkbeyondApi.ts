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
  tagTypes: ["Thinkbeyond", "thinkbeyondSharedUsers"],
  endpoints: (builder) => ({
    getThinkbeyondCanvas: builder.query({
      query: ({ projectId, userId }) => ({
        url: `/v1/think_beyond/getcanvas?user_id=${userId}&project_id=${projectId}`,
      }),
      providesTags: ["Thinkbeyond"],
    }),
    updateThinkbeyondCard: builder.mutation({
      query: ({ card, projectId, userId }) => ({
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
          user_id: userId,
        }),
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const result: any = await queryFulfilled;
          const patchResult = dispatch(
            thinkbeyondSlice.util.updateQueryData(
              "getThinkbeyondCanvas",
              {
                projectId: data?.projectId,
                userId: data?.userId,
              },
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
        } catch {}
      },
    }),
    selectThinkbeyondCard: builder.mutation({
      query: ({
        current_card_number,
        next_card_number,
        projectId,
        userId,
      }) => ({
        url: `/v1/think_beyond/selectcard`,
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          project_id: projectId,
          curr_card_number: current_card_number,
          next_card_number: next_card_number,
        }),
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const result: any = await queryFulfilled;
          const patchResult = dispatch(
            thinkbeyondSlice.util.updateQueryData(
              "getThinkbeyondCanvas",
              {
                projectId: data?.projectId,
                userId: data?.userId,
              },
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
        } catch {}
      },
    }),
    nextThinknbeyondCard: builder.mutation({
      query: ({ projectId, cardNumber, userId }) => ({
        url: `/v1/think_beyond/nextcard`,
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
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
              {
                projectId: data?.projectId,
                userId: data?.userId,
              },
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
        } catch {}
      },
    }),
    bobSuggestion: builder.mutation({
      query: ({ projectId, cardNumber, bobMessages, userId }) => ({
        url: `/v1/think_beyond/suggestion`,
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          project_id: projectId,
          cardNumber: cardNumber,
          section: 0,
          bobMessages: bobMessages,
        }),
      }),
    }),
    prefillFuture3: builder.mutation({
      query: ({ projectId, userId }) => ({
        url: `/v1/think_beyond/farfuture3`,
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          project_id: projectId,
        }),
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const result: any = await queryFulfilled;
          const patchResult = dispatch(
            thinkbeyondSlice.util.updateQueryData(
              "getThinkbeyondCanvas",
              {
                projectId: data?.projectId,
                userId: data?.userId,
              },
              (draft: any) => {
                for (const card of draft) {
                  for (const key in card) {
                    if (typeof card[key] === "object" && card[key] !== null) {
                      if (
                        card[key].cardNumber === result?.data?.[0]?.cardNumber
                      ) {
                        card[key] = result?.data?.[0];
                      } else if (
                        card[key].cardNumber === result?.data?.[1]?.cardNumber
                      ) {
                        card[key] = result?.data?.[1];
                      }
                    }
                  }
                }
              }
            )
          );
        } catch {}
      },
    }),
    prefillFuture2: builder.mutation({
      query: ({ projectId, userId }) => ({
        url: `/v1/think_beyond/farfuture2`,
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          project_id: projectId,
        }),
      }),
    }),
    getThinkbeyondSharedUsers: builder.query({
      query: ({ userId, projectId }: any) => ({
        url: `/v1/think_beyond/shared_with?user_id=${userId}&project_id=${projectId}`,
      }),
      providesTags: ["thinkbeyondSharedUsers"],
    }),
    shareThinkbeyond: builder.mutation({
      query: ({ projectId, userId, shared_users }: any) => ({
        url: `/v1/think_beyond/share`,
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          project_id: projectId,
          shared_users,
        }),
      }),
      invalidatesTags: ["thinkbeyondSharedUsers", "thinkbeyondSharedUsers"],
    }),
    unshareThinkbeyond: builder.mutation({
      query: ({ userId, projectId, shared_user_id }: any) => ({
        url: `/v1/think_beyond/unshare`,
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          project_id: projectId,
          future: 1,
          shared_user: shared_user_id,
          role: "editor",
        }),
      }),
      invalidatesTags: ["thinkbeyondSharedUsers", "Thinkbeyond"],
    }),
  }),
});
export const {
  useLazyGetThinkbeyondCanvasQuery,
  useUpdateThinkbeyondCardMutation,
  useNextThinknbeyondCardMutation,
  useBobSuggestionMutation,
  usePrefillFuture3Mutation,
  usePrefillFuture2Mutation,
  useLazyGetThinkbeyondSharedUsersQuery,
  useShareThinkbeyondMutation,
  useUnshareThinkbeyondMutation,
  useSelectThinkbeyondCardMutation
} = thinkbeyondSlice;


