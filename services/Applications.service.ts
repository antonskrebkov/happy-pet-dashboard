import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IApplication } from "@/interfaces/IApplication";

export const applicationsAPI = createApi({
  reducerPath: "applicationsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://648077e2f061e6ec4d4955d9.mockapi.io/applications",
  }),
  tagTypes: ["Applications"],
  endpoints: (build) => ({
    deleteApplication: build.mutation({
      query: (application: IApplication) => ({
        url: `/${application.id}`,
        method: "DELETE",
        body: application,
      }),
      invalidatesTags: ["Applications"],
    }),
    searchApplications: build.mutation({
      query: (query: string) => ({
        url: `?sortBy=id&order=desc&surname=${query}`,
        method: "GET",
      }),
      invalidatesTags: ["Applications"],
    }),
  }),
});

export const { useDeleteApplicationMutation, useSearchApplicationsMutation } =
  applicationsAPI;
