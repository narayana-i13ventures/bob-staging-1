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
      query: ({
        userId,
        projectId,
        future,
        canvas_type,
        cardNumber,
        content,
      }) => ({
        url: `/v1/comment/newcomment`,
        method: "POST",
        body: JSON.stringify({
          level: 0,
          future: future,
          user_id: userId,
          comment: content,
          project_id: projectId,
          canvas_type: canvas_type,
          card_number: cardNumber,
        }),
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const response: any = await queryFulfilled;
          const patchResult = dispatch(
            commentSlice.util.updateQueryData(
              "getAllComments",
              {
                userId: data?.userId,
                projectId: data?.projectId,
                future: data?.future,
                canvas_type: data?.canvas_type,
                cardNumber: data?.cardNumber,
              },
              (draft: any) => {
                draft?.push(response?.data);
                return draft;
              }
            )
          );
        } catch (error) {}
      },
    }),
    likeComment: builder.mutation({
      query: () => ({
        url: ``,
        method: "POST",
        body: JSON.stringify({}),
      }),
    }),
    dislikeComment: builder.mutation({
      query: () => ({
        url: ``,
        method: "POST",
        body: JSON.stringify({}),
      }),
    }),
    parkComment: builder.mutation({
      query: () => ({
        url: ``,
        method: "POST",
        body: JSON.stringify({}),
      }),
    }),
    incorporateComment: builder.mutation({
      query: () => ({
        url: ``,
        method: "POST",
        body: JSON.stringify({}),
      }),
    }),
  }),
});
export const { useLazyGetAllCommentsQuery, useCreateCommentMutation } =
  commentSlice;
