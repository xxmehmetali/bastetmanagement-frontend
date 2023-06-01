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
        }),
        getApplicantMeetingByIdSimplified: builder.query<Model, string>({
            query: (id: string) => apiUrlProvider.applicantmeeting + `/simplified/findById/${id}`,
        }),
        getApplicantMeetingsPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination: Pagination) => apiUrlProvider.applicantmeeting + `/findAll?page=${pagination.page}&size=${pagination.size}`,
        }),

        getApplicantMeetingsPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination: Pagination) => apiUrlProvider.applicantmeeting + `/simplified/findAll?page=${pagination.page}&size=${pagination.size}`,
        }),

        getSelectElementApplicantMeetings: builder.query<Model, void>({
            query: () => apiUrlProvider.applicantmeeting + "/" + apiUrlProvider.selectElement + "/findAll",
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
        }),
    }),
});

export const { useGetApplicantMeetingByIdQuery, useGetApplicantMeetingByIdSimplifiedQuery, useGetApplicantMeetingsPagedQuery, useGetApplicantMeetingsPagedSimplifiedQuery, useAddApplicantMeetingsMutation, useGetSelectElementApplicantMeetingsQuery, useDeleteApplicantMeetingByIdMutation  } = applicantMeetingApi;
