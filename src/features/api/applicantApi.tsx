import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";
import { Applicant } from "../../models/base/Applicant";

export const applicantApi = createApi({
    reducerPath: "applicantApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: apiUrlProvider.apiBaseUrl,
        prepareHeaders:  (headers, { getState }) => {
            const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo") || "{}")
            headers.set('Authorization', "Bearer " + loggedInUserInfo.jwt);
            return headers;
          },
    }),
    tagTypes: ['applicants'],
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

        getSelectElementApplicants: builder.query<Model, void>({
            query: () => apiUrlProvider.applicant + "/" + apiUrlProvider.selectElement + "/findAll",
        }),

        addApplicant: builder.mutation<Applicant, Partial<Applicant>>({
            query: (applicant) => ({
              url: apiUrlProvider.applicant + `/add`,
              method: 'POST',
              body : applicant,
            }),
            invalidatesTags: ['applicants'],
          }),

    }),
});

export const { useGetApplicantByIdQuery, useGetApplicantByIdSimplifiedQuery, useGetApplicantsPagedQuery, useGetApplicantsPagedSimplifiedQuery, useAddApplicantMutation, useGetSelectElementApplicantsQuery } = applicantApi;
