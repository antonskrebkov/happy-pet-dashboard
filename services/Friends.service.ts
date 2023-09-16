import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IFriend } from "@/interfaces/IFriend";

export const friendsAPI = createApi({
  reducerPath: "friendsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://64807757f061e6ec4d4954e4.mockapi.io/friends",
    // baseUrl: "http://localhost:3002/friends",
  }),
  tagTypes: ["Friends"],
  endpoints: (build) => ({
    deleteFriend: build.mutation({
      query: (friend: IFriend) => ({
        url: `/${friend.id}`,
        method: "DELETE",
      }),
    }),
    addFriend: build.mutation({
      query: (friend: IFriend) => ({
        url: "/",
        method: "POST",
        body: friend,
      }),
      invalidatesTags: ["Friends"],
    }),
    updateFriend: build.mutation({
      query: (friend: IFriend) => ({
        url: `/${friend.id}`,
        method: "PUT",
        body: friend,
      }),
      invalidatesTags: ["Friends"],
    }),
    searchFriend: build.mutation({
      query: (query: string) => ({
        url: `?sortBy=id&order=desc&name=${query}`,
        method: "GET",
      }),
      invalidatesTags: ["Friends"],
    }),
  }),
});

export const {
  useDeleteFriendMutation,
  useAddFriendMutation,
  useUpdateFriendMutation,
  useSearchFriendMutation,
} = friendsAPI;
