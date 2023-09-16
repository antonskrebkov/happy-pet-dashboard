import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IQuestion } from "@/interfaces/IQuestion";

export const questionsAPI = createApi({
  reducerPath: "questionsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://648077e2f061e6ec4d4955d9.mockapi.io/questions",
  }),
  tagTypes: ["Questions"],
  endpoints: (build) => ({
    deleteQuestion: build.mutation({
      query: (question: IQuestion) => ({
        url: `/${question.id}`,
        method: "DELETE",
      }),
    }),
    searchQuestions: build.mutation({
      query: (query: string) => ({
        url: `?sortBy=id&order=desc&name=${query}`,
        method: "GET",
      }),
      invalidatesTags: ["Questions"],
    }),
  }),
});

export const { useDeleteQuestionMutation, useSearchQuestionsMutation } =
  questionsAPI;
