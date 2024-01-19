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
      query: ({
        userId,
        projectId,
        future,
        comment_id,
        cardNumber,
        canvas_type,
      }) => ({
        url: `/v1/comment/likecomment`,
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          project_id: projectId,
          future: future,
          canvas_type: canvas_type,
          card_number: cardNumber,
          comment_id: comment_id,
          level: 0,
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
                return draft?.map((comment: any) => {
                  if (comment?.comment_id === data?.comment_id) {
                    return {
                      ...comment,
                      num_likes: comment?.num_likes + 1,
                      liked_by:
                        comment?.disliked_by !== null
                          ? comment?.liked_by?.push(data?.userId)
                          : [data?.userId],
                    };
                  } else {
                    return comment;
                  }
                });
              }
            )
          );
        } catch (error) {}
      },
    }),
    dislikeComment: builder.mutation({
      query: ({ userId, projectId, comment_id, future, cardNumber }) => ({
        url: `/v1/comment/dislikecomment`,
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          project_id: projectId,
          future: future,
          level: 0,
          comment_id: comment_id,
          cardNumber: cardNumber,
        }),
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const response: any = await queryFulfilled;
          console.log(data?.cardNumber);

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
                return draft?.map((comment: any) => {
                  if (comment?.comment_id === data?.comment_id) {
                    return {
                      ...comment,
                      num_dislikes: comment?.num_dislikes + 1,
                      disliked_by:
                        comment?.disliked_by !== null
                          ? comment?.disliked_by?.push(data?.userId)
                          : [data?.userId],
                    };
                  } else {
                    return comment;
                  }
                });
              }
            )
          );
        } catch (error) {}
      },
    }),
    parkComment: builder.mutation({
      query: ({ userId, projectId, future, comment_id, cardNumber }) => ({
        url: `/v1/comment/parkcomment`,
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          project_id: projectId,
          future: future,
          level: 0,
          comment_id: comment_id,
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
                return draft?.map((comment: any) => {
                  if (comment?.comment_id === data?.comment_id) {
                    return { ...comment, parked: true };
                  } else {
                    return comment;
                  }
                });
              }
            )
          );
        } catch (error) {}
      },
    }),
    incorporateComment: builder.mutation({
      query: () => ({
        url: ``,
        method: "POST",
        body: JSON.stringify({}),
      }),
    }),
    deleteComment: builder.mutation({
      query: ({
        userId,
        projectId,
        future,
        comment_id,
        cardNumber,
        canvas_type,
      }) => ({
        url: `/v1/comment/deletecomment`,
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          project_id: projectId,
          future: future,
          level: 0,
          comment_id: comment_id,
          card_number: cardNumber,
          canvas_type: canvas_type,
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
                return draft?.filter(
                  (comment: any) => comment?.comment_id !== data?.comment_id
                );
              }
            )
          );
        } catch (error) {}
      },
    }),
  }),
});
export const {
  useLazyGetAllCommentsQuery,
  useCreateCommentMutation,
  useLikeCommentMutation,
  useDislikeCommentMutation,
  useParkCommentMutation,
  useDeleteCommentMutation,
} = commentSlice;
