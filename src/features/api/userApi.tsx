import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";
import { User } from "../../models/base/User";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: apiUrlProvider.apiBaseUrl,
        prepareHeaders:  (headers, { getState }) => {
            const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo") || "{}")
            headers.set('Authorization', "Bearer " + loggedInUserInfo.jwt);
            return headers;
          },
    }),
    tagTypes: ['users'],
    endpoints: (builder) => ({

        getUserById: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.user + `/findById/${id}`,
        }),
        getUserByIdSimplified: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.user + `/simplified/findById/${id}`,
        }),
        getUserPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.user + `/findAll?page=${pagination.page}&size=${pagination.size}`,
        }),

        getUserPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.user + `/simplified/findAll?page=${pagination.page}&size=${pagination.size}`,
        }),

        getSelectElementUsers: builder.query<Model, void>({
            query: () => apiUrlProvider.user + "/" + apiUrlProvider.selectElement + "/findAll",
        }),

        getCurrentUserProfile: builder.query<Model, void>({
            query: () => apiUrlProvider.user + "/findCurrentUser",
        }),

        addUser: builder.mutation<User, Partial<User>>({
            query: (user) => ({
              url: apiUrlProvider.user + `/add`,
              method: 'POST',
              body : user,
            }),
            invalidatesTags: ['users'],
          }),

    }),
});

export const { useGetUserByIdQuery, useGetUserByIdSimplifiedQuery, useGetUserPagedQuery, useGetUserPagedSimplifiedQuery, useAddUserMutation, useGetSelectElementUsersQuery, useGetCurrentUserProfileQuery } = userApi;
