import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";

export const applicantMeetingApi = createApi({
    reducerPath: "applicantMeetingApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrlProvider.apiBaseUrl }),
    endpoints: (builder) => ({

        getApplicantMeetingById: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.applicantmeeting + `/findById/${id}`,
        }),
        getApplicantMeetingByIdSimplified: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.applicantmeeting + `/simplified/findById/${id}`,
        }),
        getApplicantMeetingsPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.applicantmeeting + `/findAll?page=${pagination?.page || apiPaginationConfig.defaultPageNo}&size=${pagination?.size || apiPaginationConfig.defaultPageSize}`,
        }),

        getApplicantMeetingsPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.applicantmeeting + `/simplified/findAll?page=${pagination?.page || apiPaginationConfig.defaultPageNo}&size=${pagination?.size || apiPaginationConfig.defaultPageSize}`,
        }),


    }),
});

export const { useGetApplicantMeetingByIdQuery, useGetApplicantMeetingByIdSimplifiedQuery, useGetApplicantMeetingsPagedQuery, useGetApplicantMeetingsPagedSimplifiedQuery } = applicantMeetingApi;
