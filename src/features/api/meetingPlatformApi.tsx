import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";
import { MeetingPlatform } from "../../models/base/MeetingPlatform";

export const meetingplatformApi = createApi({
    reducerPath: "meetingplatformApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrlProvider.apiBaseUrl }),
    tagTypes: ['meetingPlatforms'],
    endpoints: (builder) => ({

        getMeetingPlatformById: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.meetingplatform + `/findById/${id}`,
        }),
        getMeetingPlatformByIdSimplified: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.meetingplatform + `/simplified/findById/${id}`,
        }),
        getMeetingPlatformsPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.meetingplatform + `/findAll?page=${pagination.page}&size=${pagination.size}`,
        }),
        getMeetingPlatformsPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.meetingplatform + `/simplified/findAll?page=${pagination.page}&size=${pagination.size}`,
        }),

        getSelectElementMeetingPlatforms: builder.query<Model, void>({
            query: () => apiUrlProvider.meetingplatform + "/" + apiUrlProvider.selectElement + "/findAll",
        }),

        addMeetingPlatform: builder.mutation<MeetingPlatform, Partial<MeetingPlatform>>({
            query: (meetingPlatform) => ({
              url: apiUrlProvider.meetingplatform + `/add`,
              method: 'POST',
              body : meetingPlatform,
            }),
            invalidatesTags: ['meetingPlatforms'],
          }),


    }),
});

export const { useGetMeetingPlatformByIdQuery, useGetMeetingPlatformByIdSimplifiedQuery, useGetMeetingPlatformsPagedQuery, useGetMeetingPlatformsPagedSimplifiedQuery, useAddMeetingPlatformMutation, useGetSelectElementMeetingPlatformsQuery } = meetingplatformApi;
