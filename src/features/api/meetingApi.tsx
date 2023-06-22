import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";
import { Meeting } from "../../models/base/Meeting";

export const meetingApi = createApi({
  reducerPath: "meetingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrlProvider.apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo") || "{}")
      headers.set('Authorization', "Bearer " + loggedInUserInfo.jwt);
      return headers;
    },
  }),
  tagTypes: ['meetings'],
  endpoints: (builder) => ({

    getMeetingById: builder.query<Model, string>({
      query: (id: string) => apiUrlProvider.meeting + `/findById/${id}`,
      providesTags: ['meetings']
    }),

    getMeetingByIdSimplified: builder.query<Model, string>({
      query: (id: string) => apiUrlProvider.meeting + `/simplified/findById/${id}`,
      providesTags: ['meetings']
    }),

    getMeetingsPaged: builder.query<PagedDataResult, Pagination>({
      query: (pagination: Pagination) => apiUrlProvider.meeting + `/findAll?page=${pagination.page}&size=${pagination.size}`,
      providesTags: ['meetings']
    }),

    getMeetingsPagedSimplified: builder.query<PagedDataResult, Pagination>({
      query: (pagination: Pagination) => apiUrlProvider.meeting + `/simplified/findAll?page=${pagination.page}&size=${pagination.size}`,
      providesTags: ['meetings']
    }),

    getSelectElementMeetings: builder.query<Model, void>({
      query: () => apiUrlProvider.meeting + "/" + apiUrlProvider.selectElement + "/findAll",
      providesTags: ['meetings']
    }),

    addMeeting: builder.mutation<Meeting, Partial<Meeting>>({
      query: (meeting) => ({
        url: apiUrlProvider.meeting + `/add`,
        method: "POST",
        body: meeting,
      }),
      invalidatesTags: ['meetings'],
    }),

    deleteMeetingById: builder.mutation({
      query: (id: string) => ({
        url: apiUrlProvider.meeting + `/deleteById?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['meetings'],
    }),

    updateMeeting: builder.mutation<Meeting, Partial<Meeting>>({
      query: (meeting) => ({
        url: apiUrlProvider.meeting + `/update`,
        method: 'POST',
        body: meeting,
      }),
      invalidatesTags: ['meetings'],
    }),

  }),
});

export const {
  useGetMeetingByIdQuery,
  useGetMeetingByIdSimplifiedQuery,
  useGetMeetingsPagedQuery,
  useGetMeetingsPagedSimplifiedQuery,
  useAddMeetingMutation,
  useGetSelectElementMeetingsQuery,
  useDeleteMeetingByIdMutation,
  useUpdateMeetingMutation
} = meetingApi;
