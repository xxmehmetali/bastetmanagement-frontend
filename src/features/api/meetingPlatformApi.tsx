import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";

export const meetingplatformApi = createApi({
    reducerPath: "meetingplatformApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrlProvider.apiBaseUrl }),
    endpoints: (builder) => ({

        getMeetingPlatformById: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.meetingplatform + `/findById/${id}`,
        }),
        getMeetingPlatformByIdSimplified: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.meetingplatform + `/simplified/findById/${id}`,
        }),
        getMeetingPlatformsPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.meetingplatform + `/findAll?page=${pagination?.page || apiPaginationConfig.defaultPageNo}&size=${pagination?.size || apiPaginationConfig.defaultPageSize}`,
        }),
        getMeetingPlatformsPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.meetingplatform + `/simplified/findAll?page=${pagination?.page || apiPaginationConfig.defaultPageNo}&size=${pagination?.size || apiPaginationConfig.defaultPageSize}`,
        }),


    }),
});

export const { useGetMeetingPlatformByIdQuery, useGetMeetingPlatformByIdSimplifiedQuery, useGetMeetingPlatformsPagedQuery, useGetMeetingPlatformsPagedSimplifiedQuery } = meetingplatformApi;
