import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://bob-cards-nodejs-mongodb-narayanas-projects.vercel.app",
        // baseUrl: "http://localhost:4000",
    }),
    keepUnusedDataFor: 100000000,
    tagTypes: ["ThinkBeyond", "company", "Future_1_BMC", "Future_1_CVP", "Menu"],
    endpoints: (builder) => ({
        //==============================================
        //
        // COMPANY
        //
        //==============================================

        getCompanies: builder.query({
            query: () => ({
                url: `/company`,
            }),
            providesTags: ["company"],
        }),
        getCompanyById: builder.query({
            query: (companyId) => ({
                url: `/company/${companyId}`,
            }),
        }),
        createCompany: builder.mutation({
            query: (company) => ({
                url: `/company`,
                method: "POST",
                body: company,
            }),
            invalidatesTags: ["company"],
        }),
        deleteCompanyById: builder.mutation({
            query: (companyId) => ({
                url: `/company/delete/${companyId}`,
                method: "POST",
            }),
            async onQueryStarted(companyId, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData("getCompanies", {}, (draft: any) => {
                        const companyIndex = draft.findIndex(
                            (company: any) => company?.id === companyId
                        );
                        console.log(companyIndex);

                        if (companyIndex !== -1) {
                            draft.splice(companyIndex, 1);
                        }
                        return draft;
                    })
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo();
                }
            },
        }),
        shareCompany: builder.mutation({
            query: (data) => ({
                url: `/company/add-shared-user`,
                method: "POST",
                body: data,
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData("getCompanies", {}, (draft: any) => {
                            const companyIndex = draft.findIndex(
                                (company: any) => company?.id === data?.id
                            );
                            if (companyIndex !== -1) {
                                draft[companyIndex] = data;
                            }
                            return draft;
                        })
                    );
                } catch (error) { }
            },
        }),
        unshareCompany: builder.mutation({
            query: (data) => ({
                url: `/company/delete-shared-user`,
                method: "POST",
                body: data,
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData("getCompanies", {}, (draft: any) => {
                            const companyIndex = draft.findIndex(
                                (company: any) => company?.id === data?.id
                            );
                            if (companyIndex !== -1) {
                                draft[companyIndex] = data;
                            }
                            return draft;
                        })
                    );
                } catch (error) { }
            },
        }),
        //==============================================
        //
        // ThinkBeyond
        //
        //==============================================
        getThinkBeyond: builder.query({
            query: () => `/ThinkBeyond`,
            providesTags: ["ThinkBeyond"],
        }),
        resetThinkBeyond: builder.mutation({
            query: () => ({
                url: `/ThinkBeyond/reset`,
                method: "POST",
            }),
            invalidatesTags: ["ThinkBeyond"],
        }),
        updateThinkBeyond: builder.mutation({
            query: (card) => ({
                url: `/ThinkBeyond`,
                method: "POST",
                body: card,
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData("getThinkBeyond", {}, (draft: any) => {
                        const updatedCardIndex = draft.findIndex(
                            (card: any) => card?.id === data?.id
                        );
                        if (updatedCardIndex !== -1) {
                            draft[updatedCardIndex] = data;
                        }
                        return draft;
                    })
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo();
                }
            },
        }),
        nextThinkBeyond: builder.mutation({
            query: (card) => ({
                url: `/ThinkBeyond/nextCard`,
                method: "POST",
                body: card,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data }: any = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getThinkBeyond",
                            {},
                            (draft: any) => {
                                return draft.map((card: any) => {
                                    if (card.id === data[0]?.id) {
                                        return data[0];
                                    } else if (card.id === data[1]?.id) {
                                        return data[1];
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
        //==============================================
        //
        // Future 1 BMC
        //
        //==============================================
        prefillFuture1BMC: builder.mutation({
            query: (data) => ({
                url: "/future_1/BMC/prefill",
                method: "POST",
                body: data,
            }),
        }),
        getFuture1BMC: builder.query({
            query: () => ({
                url: "/future_1/BMC",
            }),
            providesTags: ["Future_1_BMC"],
        }),
        updateFuture1BMC: builder.mutation({
            query: (data) => ({
                url: "/updateCard",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData("getFuture1BMC", {}, (draft: any) => {
                        const updatedCardIndex = draft.findIndex(
                            (card: any) => card?.id === data?.id
                        );
                        if (updatedCardIndex !== -1) {
                            draft[updatedCardIndex] = data;
                        }
                        return draft;
                    })
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo();
                }
            },
        }),
        nextFuture1BMC: builder.mutation({
            query: (card) => ({
                url: "/future_1/BMC/nextCard",
                method: "POST",
                body: card,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data }: any = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData("getFuture1BMC", {}, (draft: any) => {
                            return draft.map((card: any) => {
                                if (card.id === data[0]?.id) {
                                    return data[0];
                                } else if (card.id === data[1]?.id) {
                                    return data[1];
                                } else {
                                    return card;
                                }
                            });
                        })
                    );
                } catch (error) { }
            },
        }),
        resetFuture1BMC: builder.mutation({
            query: () => ({
                url: "/future_1/BMC/reset",
                method: "POST",
            }),
            invalidatesTags: ["Future_1_BMC"],
        }),
        resetFuture1BMCCard: builder.mutation({
            query: (card) => ({
                url: "/resetCard",
                method: "POST",
                body: card,
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData("getFuture1BMC", {}, (draft: any) => {
                        const updatedCardIndex = draft.findIndex(
                            (card: any) => card?.id === data?.id
                        );
                        if (updatedCardIndex !== -1) {
                            draft[updatedCardIndex] = data;
                        }
                        return draft;
                    })
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo();
                }
            },
        }),
        commentFuture1BMCCard: builder.mutation({
            query: (card) => ({
                url: "/add-comment",
                method: "POST",
                body: card,
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData("getFuture1BMC", {}, (draft: any) => {
                        const updatedCardIndex = draft.findIndex(
                            (card: any) => card?.id === data?.id
                        );
                        if (updatedCardIndex !== -1) {
                            draft[updatedCardIndex] = data;
                        }
                        return draft;
                    })
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo();
                }
            },
        }),
        uncommentFuture1BMCCard: builder.mutation({
            query: (card) => ({
                url: "/delete-comment",
                method: "POST",
                body: card,
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData("getFuture1BMC", {}, (draft: any) => {
                        const updatedCardIndex = draft.findIndex(
                            (existingCard: any) => existingCard?.id === data?.id
                        );
                        if (updatedCardIndex !== -1) {
                            draft.splice(updatedCardIndex, 1);
                        }
                        return draft;
                    })
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo();
                }
            },
        }),
        shareFuture1BMCCard: builder.mutation({
            query: (card) => ({
                url: "/add-shared-user",
                method: "POST",
                body: card,
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData("getFuture1BMC", {}, (draft: any) => {
                        const updatedCardIndex = draft.findIndex(
                            (card: any) => card?.id === data?.id
                        );
                        if (updatedCardIndex !== -1) {
                            draft[updatedCardIndex] = data;
                        }
                        return draft;
                    })
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo();
                }
            },
        }),
        unshareFuture1BMCCard: builder.mutation({
            query: (card) => ({
                url: "/delete-shared-user",
                method: "POST",
                body: card,
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData("getFuture1BMC", {}, (draft: any) => {
                        const updatedCardIndex = draft.findIndex(
                            (existingCard: any) => existingCard?.id === data?.id
                        );
                        if (updatedCardIndex !== -1) {
                            draft.splice(updatedCardIndex, 1);
                        }
                        return draft;
                    })
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo();
                }
            },
        }),
        //==============================================
        //
        // Future 1 CVP
        //
        //==============================================
        prefillFuture1CVP: builder.mutation({
            query: (data) => ({
                url: "/future_1/CVP/prefill",
                method: "POST",
                body: data,
            }),
        }),
        getFuture1CVP: builder.query({
            query: () => ({
                url: "/future_1/CVP",
            }),
            providesTags: ["Future_1_CVP"],
        }),
        updateFuture1CVP: builder.mutation({
            query: (data) => ({
                url: "/updateCard",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData("getFuture1CVP", {}, (draft: any) => {
                        const updatedCardIndex = draft.findIndex(
                            (card: any) => card?.id === data?.id
                        );
                        if (updatedCardIndex !== -1) {
                            draft[updatedCardIndex] = data;
                        }
                        return draft;
                    })
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo();
                }
            },
        }),
        nextFuture1CVP: builder.mutation({
            query: (card) => ({
                url: "/future_1/CVP/nextCard",
                method: "POST",
                body: card,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data }: any = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData("getFuture1CVP", {}, (draft: any) => {
                            return draft.map((card: any) => {
                                if (card.id === data[0]?.id) {
                                    return data[0];
                                } else if (card.id === data[1]?.id) {
                                    return data[1];
                                } else {
                                    return card;
                                }
                            });
                        })
                    );
                } catch (error) { }
            },
        }),
        resetFuture1CVP: builder.mutation({
            query: () => ({
                url: "/future_1/CVP/reset",
                method: "POST",
            }),
            invalidatesTags: ["Future_1_CVP"],
        }),
        resetFuture1CVPCard: builder.mutation({
            query: (card) => ({
                url: "/resetCard",
                method: "POST",
                body: card,
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData("getFuture1CVP", {}, (draft: any) => {
                        const updatedCardIndex = draft.findIndex(
                            (card: any) => card?.id === data?.id
                        );
                        if (updatedCardIndex !== -1) {
                            draft[updatedCardIndex] = data;
                        }
                        return draft;
                    })
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo();
                }
            },
        }),
        getMenu: builder.query({
            query: () => ({
                url: "/Menu",
            }),
            providesTags: ["Menu"],
        }),
    }),
});
export const {
    useGetCompaniesQuery,
    useGetCompanyByIdQuery,
    useGetThinkBeyondQuery,
    useNextThinkBeyondMutation,
    useResetThinkBeyondMutation,
    useCreateCompanyMutation,
    useUpdateThinkBeyondMutation,
    usePrefillFuture1BMCMutation,
    useLazyGetFuture1BMCQuery,
    useUpdateFuture1BMCMutation,
    useNextFuture1BMCMutation,
    useResetFuture1BMCMutation,
    usePrefillFuture1CVPMutation,
    useLazyGetFuture1CVPQuery,
    useNextFuture1CVPMutation,
    useUpdateFuture1CVPMutation,
    useResetFuture1CVPMutation,
    useGetMenuQuery,
    useShareCompanyMutation,
    useUnshareCompanyMutation,
    useDeleteCompanyByIdMutation,
    useResetFuture1BMCCardMutation,
    useCommentFuture1BMCCardMutation,
    useUncommentFuture1BMCCardMutation,
    useShareFuture1BMCCardMutation,
    useUnshareFuture1BMCCardMutation,
} = apiSlice;
