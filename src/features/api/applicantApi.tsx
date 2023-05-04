import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";

export const applicantApi = createApi({
    reducerPath: "applicantApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrlProvider.apiBaseUrl }),
    endpoints: (builder) => ({

        getApplicantById: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.applicant + `/findById/${id}`,
        }),
        getApplicantByIdSimplified: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.applicant + `/simplified/findById/${id}`,
        }),
        getApplicantsPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.applicant + `/findAll?page=${pagination.page}&size=${pagination.size}`,
        }),

        getApplicantsPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.applicant + `/simplified/findAll?page=${pagination.page}&size=${pagination.size}`,
        }),


    }),
});

export const { useGetApplicantByIdQuery, useGetApplicantByIdSimplifiedQuery, useGetApplicantsPagedQuery, useGetApplicantsPagedSimplifiedQuery } = applicantApi;
