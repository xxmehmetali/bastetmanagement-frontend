import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";
import { ApplicantMeeting } from "../../models/base/ApplicantMeeting";

export const applicantMeetingApi = createApi({
    reducerPath: "applicantMeetingApi",
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrlProvider.apiBaseUrl,
        prepareHeaders: (headers, { getState }) => {
            const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo") || "{}")
            headers.set('Authorization', "Bearer " + loggedInUserInfo.jwt);
            return headers;
        },
    }),
    tagTypes: ['applicantMeetings'],
    endpoints: (builder) => ({

        getApplicantMeetingById: builder.query<Model, string>({
            query: (id: string) => apiUrlProvider.applicantmeeting + `/findById/${id}`,
            providesTags: ['applicantMeetings']
        }),
        getApplicantMeetingByIdSimplified: builder.query<Model, string>({
            query: (id: string) => apiUrlProvider.applicantmeeting + `/simplified/findById/${id}`,
            providesTags: ['applicantMeetings']
        }),
        getApplicantMeetingsPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination: Pagination) => apiUrlProvider.applicantmeeting + `/findAll?page=${pagination.page}&size=${pagination.size}`,
            providesTags: ['applicantMeetings']
        }),

        getApplicantMeetingsPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination: Pagination) => apiUrlProvider.applicantmeeting + `/simplified/findAll?page=${pagination.page}&size=${pagination.size}`,
            providesTags: ['applicantMeetings']
        }),

        getSelectElementApplicantMeetings: builder.query<Model, void>({
            query: () => apiUrlProvider.applicantmeeting + "/" + apiUrlProvider.selectElement + "/findAll",
            providesTags: ['applicantMeetings']
        }),

        addApplicantMeetings: builder.mutation<ApplicantMeeting, Partial<ApplicantMeeting>>({
            query: (applicantMeeting) => ({
                url: apiUrlProvider.applicantmeeting + `/add`,
                method: 'POST',
                body: applicantMeeting,
            }),
            invalidatesTags: ['applicantMeetings'],
        }),

        deleteApplicantMeetingById: builder.mutation({
            query: (id : string) => ({
              url: apiUrlProvider.applicantmeeting + `/deleteById?id=${id}`,
              method: 'DELETE',
            }),
            invalidatesTags: ['applicantMeetings'],
        }),

        updateApplicantMeeting: builder.mutation<ApplicantMeeting, Partial<ApplicantMeeting>>({
            query: (applicantMeeting) => ({
                url: apiUrlProvider.applicantmeeting + `/update`,
                method: 'POST',
                body: applicantMeeting,
            }),
            invalidatesTags: ['applicantMeetings'],
        }),


    }),
});

export const {
    useGetApplicantMeetingByIdQuery,
    useGetApplicantMeetingByIdSimplifiedQuery,
    useGetApplicantMeetingsPagedQuery,
    useGetApplicantMeetingsPagedSimplifiedQuery,
    useAddApplicantMeetingsMutation,
    useGetSelectElementApplicantMeetingsQuery,
    useDeleteApplicantMeetingByIdMutation,
    useUpdateApplicantMeetingMutation
} = applicantMeetingApi;
