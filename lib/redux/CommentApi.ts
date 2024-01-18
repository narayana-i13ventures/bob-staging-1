import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentSlice = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bobapi.azurewebsites.net",
    headers: {
      "content-type": "application/json",
    },
  }),
  keepUnusedDataFor: 10000000,
  endpoints: (builder) => ({
    getAllComments: builder.query({
      query: ({ userId, projectId, future, canvas_type, cardNumber }) => ({
        url: `/v1/comment/get_comments?user_id=${userId}&project_id=${projectId}&canvas_type=${canvas_type}&future=${future}&card_number=${cardNumber}&level=0`,
      }),
    }),
    createComment: builder.mutation({
      query: () => ({
        url: ``,
        method: "POST",
        body: JSON.stringify({}),
      }),
    }),
    likeComment: builder.mutation({
      query: () => ({
        url: ``,
        method: "POST",
        body: JSON.stringify({}),
      }),
    }),
    dislikeComment : builder.mutation({
        query:() => ({
            url:``,
            method:'POST',
            body:JSON.stringify({})
        })
    })
  }),
});
export const {} = commentSlice;
