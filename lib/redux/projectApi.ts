import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProjectApiSlice = createApi({
    reducerPath: "ProjectApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://bobapi.azurewebsites.net",
        headers: {
            "content-type": "application/json",
        },
    }),
    keepUnusedDataFor: 10000000,
    tagTypes: ["projects", "project", "sharedUsers"],
    endpoints: (builder) => ({
        getAllProjects: builder.query({
            query: () => ({
                url: `/v1/project/allprojects?user_id=3&shared_projects=1`,
            }),
            providesTags: ["projects"],
        }),
        getProjectById: builder.query({
            query: (projectId: any) => ({
                url: `/v1/project/getproject?user_id=3&project_id=${projectId}`,
            }),
            keepUnusedDataFor: 5,
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
        }),
        createProject: builder.mutation({
            query: (projectData) => ({
                url: "/v1/project/newproject",
                method: "POST",
                body: JSON.stringify({
                    project_data: {
                        companyName: projectData?.companyName,
                        industry: projectData?.industry,
                        vertical: projectData?.vertical,
                        companyType: projectData?.companyType,
                        companySize: projectData?.companySize,
                        companyHeadquarters: projectData?.companyHeadquarters,
                        companyTargetRegions: projectData?.companyTargetRegions,
                        fundingStage: projectData?.fundingStage,
                        annualRevenue: projectData?.annualRevenue,
                        businessModel: projectData?.businessModel,
                    },
                    user_id: 3,
                }),
            }),
            invalidatesTags: ["projects"],
            // async onQueryStarted(data, { dispatch, queryFulfilled }) {
            //     try {
            //         // Correctly invoke queryFulfilled to get the data
            //         const responseData: any = await queryFulfilled;
            //         const patchResult = dispatch(
            //             ProjectApiSlice.util.updateQueryData('getAllProjects', {}, (draft: any) => {
            //                 draft?.own_projects?.push(responseData[0]);
            //             })
            //         );
            //     } catch (error) {
            //         // Handle errors if needed
            //     }
            // },
        }),
        deleteProjectById: builder.mutation({
            query: (projectId: any) => ({
                url: "/v1/project/delete",
                method: "POST",
                body: JSON.stringify({
                    user_id: 3,
                    project_id: projectId,
                }),
            }),
            async onQueryStarted(projectId, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        ProjectApiSlice.util.updateQueryData(
                            "getAllProjects",
                            {},
                            (draft: any) => {
                                const companyIndex = draft?.owned_projects?.findIndex(
                                    (company: any) => company?.project_id === projectId
                                );
                                if (companyIndex !== -1) {
                                    draft?.owned_projects?.splice(companyIndex, 1);
                                }
                                return draft;
                            }
                        )
                    );
                } catch (error) {
                    // Handle errors
                }
            },
        }),
        //=====================================
        //=============== Share ===============
        //=====================================
        getSharedUsersProject: builder.query({
            query: (projectId: any) => ({
                url: `/v1/project/shared_with?user_id=3&project_id=${projectId}`,
            }),
            providesTags: ["sharedUsers"],
        }),
        shareProject: builder.mutation({
            query: (data: any) => ({
                url: `/v1/project/share`,
                method: "POST",
                body: JSON.stringify({
                    user_id: 3,
                    project_id: data?.project_id,
                    shared_user_id: data?.shared_id,
                    shared_user_role: "editor",
                }),
            }),
        }),
        unShareProject: builder.mutation({
            query: (data: any) => ({
                url: `/v1/project/delete_share`,
                method: "POST",
                body: JSON.stringify({
                    user_id: 3,
                    project_id: data?.project_id,
                    shared_user_id: data?.shared_id,
                }),
            }),
            invalidatesTags: ["sharedUsers"],
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    ProjectApiSlice.util.updateQueryData(
                        "getSharedUsersProject",
                        data?.project_id,
                        (draft: any) => {
                            draft = draft?.filter(
                                (user: any) => user?.user_id != data?.shared_id
                            );
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo();
                }
            },
        }),
    }),
});
export const {
    useGetAllProjectsQuery,
    useLazyGetProjectByIdQuery,
    useUnShareProjectMutation,
    useLazyGetSharedUsersProjectQuery,
    useCreateProjectMutation,
    useDeleteProjectByIdMutation,
} = ProjectApiSlice;
