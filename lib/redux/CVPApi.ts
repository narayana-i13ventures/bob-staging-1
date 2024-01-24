import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CVPSlice = createApi({
  reducerPath: "CVP",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bobapi.azurewebsites.net",
    headers: {
      "content-type": "application/json",
    },
  }),
  keepUnusedDataFor: 10000000,
  tagTypes: ["CVP"],
  endpoints: (builder) => ({
    prefillFutuer1CVP: builder.mutation({
      query: ({ projectId, userId }) => ({
        url: `/v1/cvp/prefill`,
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          project_id: projectId,
        }),
      }),
    }),
    prefillFutuer2CVP: builder.mutation({
      query: ({ projectId, userId }) => ({
        url: `/v1/cvp/future2prefill`,
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          project_id: projectId,
        }),
      }),
    }),
    prefillFutuer3CVP: builder.mutation({
      query: ({ projectId, userId }) => ({
        url: `/v1/cvp/future3prefill`,
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          project_id: projectId,
        }),
      }),
    }),
    GetCVPCanvas: builder.query({
      query: ({ projectId, future, userId }) => ({
        url: `v1/cvp/getcanvas?user_id=${userId}&project_id=${projectId}&future=${future}`,
      }),
      providesTags: ["CVP"],
    }),
    updateCVPCard: builder.mutation({
      query: ({ projectId, card, future, userId }) => ({
        url: `/v1/cvp/updatecard`,
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          project_id: projectId,
          future: future,
          keypoints: card?.keyPoints,
          card_color: "000000",
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
            CVPSlice.util.updateQueryData(
              "GetCVPCanvas",
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
  }),
});

export const {
  useLazyGetCVPCanvasQuery,
  usePrefillFutuer1CVPMutation,
  usePrefillFutuer2CVPMutation,
  usePrefillFutuer3CVPMutation,
  useUpdateCVPCardMutation
} = CVPSlice;
