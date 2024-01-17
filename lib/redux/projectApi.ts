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
    getAllUsers: builder.query({
      query: () => ({
        url: `/v1/users/getallusers`,
      }),
    }),
    getAllCanvas: builder.query({
      query: ({ userId, projectId }: any) => ({
        url: `/v1/project/allcanvases?user_id=${userId}&project_id=${projectId}`,
      }),
    }),
    getAllProjects: builder.query({
      query: (userId) => ({
        url: `/v1/project/allprojects?user_id=${userId}&shared_projects=1`,
      }),
      providesTags: ["projects"],
    }),
    getProjectById: builder.query({
      query: ({ projectId, userId }: any) => ({
        url: `/v1/project/getproject?user_id=${userId}&project_id=${projectId}`,
      }),
      providesTags: ["project"],
    }),
    createProject: builder.mutation({
      query: ({ projectData, userId }) => ({
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
          user_id: userId,
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
      query: ({ projectId, userId }: any) => ({
        url: "/v1/project/delete",
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          project_id: projectId,
        }),
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            ProjectApiSlice.util.updateQueryData(
              "getAllProjects",
              data?.userId,
              (draft: any) => {
                const companyIndex = draft?.owned_projects?.findIndex(
                  (company: any) => company?.project_id === data?.projectId
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
      query: ({ projectId, userId }: any) => ({
        url: `/v1/project/shared_with?user_id=${userId}&project_id=${projectId}`,
      }),
      providesTags: ["sharedUsers"],
    }),
    shareProject: builder.mutation({
      query: ({ projectId, shared_users, userId }: any) => ({
        url: `/v1/project/share`,
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          project_id: projectId,
          shared_user_id: shared_users?.[0]?.user_id,
          shared_user_role: "editor",
        }),
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const response: any = await queryFulfilled;
          dispatch(
            ProjectApiSlice.util.updateQueryData(
              "getSharedUsersProject",
              { userId: data?.userId, projectId: data?.projectId },
              (draft: any) => {
                draft?.push({ ...response?.data?.user, role: "editor" });
                return draft;
              }
            )
          );
        } catch (error) {}
      },
    }),
    unShareProject: builder.mutation({
      query: ({ projectId, shared_id, userId }: any) => ({
        url: `/v1/project/delete_share`,
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          project_id: projectId,
          shared_user_id: shared_id,
        }),
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled; // Wait for the mutation to complete
          // Update shared users data
          dispatch(
            ProjectApiSlice.util.updateQueryData(
              "getSharedUsersProject",
              { userId: data?.userId, projectId: data?.projectId },
              (draft: any) => {
                // Remove the unshared user from the shared users list
                draft = draft?.filter(
                  (user: any) => user.user_id !== data?.shared_id
                );
                return draft;
              }
            )
          );
        } catch (error) {
          // Handle errors if needed
        }
      },
    }),
  }),
});
export const {
  useGetAllProjectsQuery,
  useLazyGetProjectByIdQuery,
  useShareProjectMutation,
  useUnShareProjectMutation,
  useLazyGetSharedUsersProjectQuery,
  useCreateProjectMutation,
  useDeleteProjectByIdMutation,
  useGetAllUsersQuery,
  useLazyGetAllCanvasQuery
} = ProjectApiSlice;
