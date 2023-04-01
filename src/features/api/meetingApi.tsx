import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";

export const meetingApi = createApi({
    reducerPath: "meetingApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrlProvider.apiBaseUrl }),
    endpoints: (builder) => ({

        getMeetingById: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.meeting + `/findById/${id}`,
        }),
        getMeetingByIdSimplified: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.meeting + `/simplified/findById/${id}`,
        }),
        getMeetingsPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.meeting + `/findAll?page=${pagination?.page || apiPaginationConfig.defaultPageNo}&size=${pagination?.size || apiPaginationConfig.defaultPageSize}`,
        }),
        getMeetingsPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.meeting + `/simplified/findAll?page=${pagination?.page || apiPaginationConfig.defaultPageNo}&size=${pagination?.size || apiPaginationConfig.defaultPageSize}`,
        }),


    }),
});

export const { useGetMeetingByIdQuery, useGetMeetingByIdSimplifiedQuery, useGetMeetingsPagedQuery, useGetMeetingsPagedSimplifiedQuery } = meetingApi;
