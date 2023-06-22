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
        prepareHeaders: (headers, { getState }) => {
            const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo") || "{}")
            headers.set('Authorization', "Bearer " + loggedInUserInfo.jwt);
            return headers;
        },
    }),
    tagTypes: ['applicants'],
    endpoints: (builder) => ({

        getApplicantById: builder.query<Model, string>({
            query: (id: string) => apiUrlProvider.applicant + `/findById/${id}`,
            providesTags: ['applicants']
        }),
        getApplicantByIdSimplified: builder.query<Model, string>({
            query: (id: string) => apiUrlProvider.applicant + `/simplified/findById/${id}`,
            providesTags: ['applicants']
        }),
        getApplicantsPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination: Pagination) => apiUrlProvider.applicant + `/findAll?page=${pagination.page}&size=${pagination.size}`,
            providesTags: ['applicants']
        }),

        getApplicantsPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination: Pagination) => apiUrlProvider.applicant + `/simplified/findAll?page=${pagination.page}&size=${pagination.size}`,
            providesTags: ['applicants']
        }),

        getSelectElementApplicants: builder.query<Model, void>({
            query: () => apiUrlProvider.applicant + "/" + apiUrlProvider.selectElement + "/findAll",
            providesTags: ['applicants']
        }),

        addApplicant: builder.mutation<Applicant, Partial<Applicant>>({
            query: (applicant) => ({
                url: apiUrlProvider.applicant + `/add`,
                method: 'POST',
                body: applicant,
            }),
            invalidatesTags: ['applicants'],
        }),

        deleteApplicantById: builder.mutation({
            query: (id: string) => ({
                url: apiUrlProvider.applicant + `/deleteById?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['applicants'],
        }),

        updateApplicant: builder.mutation<Applicant, Partial<Applicant>>({
            query: (applicant) => ({
                url: apiUrlProvider.applicant + `/update`,
                method: 'POST',
                body: applicant,
            }),
            invalidatesTags: ['applicants'],
        }),


    }),
});

export const {
    useGetApplicantByIdQuery,
    useGetApplicantByIdSimplifiedQuery,
    useGetApplicantsPagedQuery,
    useGetApplicantsPagedSimplifiedQuery,
    useAddApplicantMutation,
    useGetSelectElementApplicantsQuery,
    useDeleteApplicantByIdMutation,
    useUpdateApplicantMutation
} = applicantApi;
