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
    tagTypes: [],
    endpoints: (builder) => ({
        getThinkbeyondChat: builder.query({
            query: () => ({
                url: ``,
                method:'POST',
                
            })
        })
    }),
});
export const { } = chatSlice;
