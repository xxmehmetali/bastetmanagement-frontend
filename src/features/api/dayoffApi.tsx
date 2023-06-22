import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";
import { Dayoff } from "../../models/base/Dayoff";

export const dayoffApi = createApi({
  reducerPath: "dayoffApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrlProvider.apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo") || "{}")
      headers.set('Authorization', "Bearer " + loggedInUserInfo.jwt);
      return headers;
    },
  }),
  tagTypes: ['dayoffs'],
  endpoints: (builder) => ({

    getDayoffById: builder.query<Model, string>({
      query: (id: string) => apiUrlProvider.dayoff + `/findById/${id}`,
      providesTags: ['dayoffs']
    }),

    getDayoffByIdSimplified: builder.query<Model, string>({
      query: (id: string) => apiUrlProvider.dayoff + `/simplified/findById/${id}`,
      providesTags: ['dayoffs']
    }),

    getDayoffsPaged: builder.query<PagedDataResult, Pagination>({
      query: (pagination: Pagination) => apiUrlProvider.dayoff + `/findAll?page=${pagination.page}&size=${pagination.size}`,
      providesTags: ['dayoffs']
    }),

    getDayoffsPagedSimplified: builder.query<PagedDataResult, Pagination>({
      query: (pagination: Pagination) => apiUrlProvider.dayoff + `/simplified/findAll?page=${pagination.page}&size=${pagination.size}`,
      providesTags: ['dayoffs']
    }),

    getSelectElementDayoffs: builder.query<Model, void>({
      query: () => apiUrlProvider.dayoff + "/" + apiUrlProvider.selectElement + "/findAll",
      providesTags: ['dayoffs']
    }),

    addDayoff: builder.mutation<Dayoff, Partial<Dayoff>>({
      query: (dayoff) => ({
        url: apiUrlProvider.dayoff + `/add`,
        method: 'POST',
        body: dayoff,
      }),
      invalidatesTags: ['dayoffs'],
    }),

    deleteDayoffsById: builder.mutation({
      query: (id: string) => ({
        url: apiUrlProvider.dayoff + `/deleteById?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['dayoffs'],
    }),

    updateDayoff: builder.mutation<Dayoff, Partial<Dayoff>>({
      query: (dayoff) => ({
        url: apiUrlProvider.dayoff + `/update`,
        method: 'POST',
        body: dayoff,
      }),
      invalidatesTags: ['dayoffs'],
    }),

  }),
});

export const {
  useGetDayoffByIdQuery,
  useGetDayoffByIdSimplifiedQuery,
  useGetDayoffsPagedQuery,
  useGetDayoffsPagedSimplifiedQuery,
  useAddDayoffMutation,
  useGetSelectElementDayoffsQuery,
  useDeleteDayoffsByIdMutation,
  useUpdateDayoffMutation

} = dayoffApi;
