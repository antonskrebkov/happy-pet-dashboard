import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ICategory } from "@/interfaces/ICategory";

export const categoriesAPI = createApi({
  reducerPath: "categoriesAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://64807757f061e6ec4d4954e4.mockapi.io/categories",
  }),
  tagTypes: ["Categories"],
  endpoints: (build) => ({
    createNewCategory: build.mutation({
      query: (category: ICategory) => ({
        url: "/",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: build.mutation({
      query: (category: ICategory) => ({
        url: `/${category.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const { useCreateNewCategoryMutation, useDeleteCategoryMutation } =
  categoriesAPI;
