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
  }),
});

export const {
  useLazyGetCVPCanvasQuery,
  usePrefillFutuer1CVPMutation,
  usePrefillFutuer2CVPMutation,
  usePrefillFutuer3CVPMutation,
} = CVPSlice;
