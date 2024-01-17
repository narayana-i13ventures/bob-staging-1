import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatSlice = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bobapi.azurewebsites.net",
    headers: {
      "content-type": "application/json",
    },
  }),
  keepUnusedDataFor: 10000000,
  tagTypes: ["chat"],
  endpoints: (builder) => ({
    getChat: builder.query({
      query: ({ userId, projectId, future, canvas_type, cardNumber }) => ({
        url: `/v1/chats/getchats?user_id=${userId}&project_id=${projectId}&future=${future}&canvas_type=${canvas_type}&card_number=${cardNumber}`,
      }),
      providesTags: ["chat"],
    }),
    saveChat: builder.mutation({
      query: ({
        userId,
        projectId,
        future,
        canvas_type,
        cardNumber,
        chat,
        cahceUpdate,
      }) => ({
        url: `/v1/chats/savechats`,
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          project_id: projectId,
          canvas_type: canvas_type,
          future: future,
          card_number: cardNumber,
          chats: chat,
        }),
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const response: any = await queryFulfilled;
          const patchResult = dispatch(
            chatSlice.util.updateQueryData(
              "getChat",
              {
                userId: data?.userId,
                projectId: data?.projectId,
                future: data?.future,
                canvas_type: data?.canvas_type,
                cardNumber: data?.cardNumber,
              },
              (draft: any) => {
                draft?.push(response?.data?.chat);
                return draft;
              }
            )
          );
        } catch (error) { }
      },
    }),
  }),
});
export const { useLazyGetChatQuery, useSaveChatMutation } = chatSlice;
