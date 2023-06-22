import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";
import { Occupation } from "../../models/base/Occupation";

export const occupationApi = createApi({
  reducerPath: "occupationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrlProvider.apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo") || "{}")
      headers.set('Authorization', "Bearer " + loggedInUserInfo.jwt);
      return headers;
    },
  }),
  tagTypes: ['occupations'],
  endpoints: (builder) => ({

    getOccupationById: builder.query<Model, string>({
      query: (id: string) => apiUrlProvider.occupation + `/findById/${id}`,
      providesTags: ['occupations']
    }),

    getOccupationByIdSimplified: builder.query<Model, string>({
      query: (id: string) => apiUrlProvider.occupation + `/simplified/findById/${id}`,
      providesTags: ['occupations']
    }),
    getOccupationsPaged: builder.query<PagedDataResult, Pagination>({
      query: (pagination: Pagination) => apiUrlProvider.occupation + `/findAll?page=${pagination.page}&size=${pagination.size}`,
      providesTags: ['occupations']
    }),

    getOccupationsPagedSimplified: builder.query<PagedDataResult, Pagination>({
      query: (pagination: Pagination) => apiUrlProvider.occupation + `/simplified/findAll?page=${pagination.page}&size=${pagination.size}`,
      providesTags: ['occupations']
    }),

    getSelectElementOccupations: builder.query<Model, void>({
      query: () => apiUrlProvider.occupation + "/" + apiUrlProvider.selectElement + "/findAll",
      providesTags: ['occupations']
    }),

    addOccupation: builder.mutation<Occupation, Partial<Occupation>>({
      query: (occupation) => ({
        url: apiUrlProvider.occupation + `/add`,
        method: "POST",
        body: occupation,
      }),
      invalidatesTags: ['occupations'],
    }),

    deleteOccupationById: builder.mutation({
      query: (id: string) => ({
        url: apiUrlProvider.occupation + `/deleteById?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['occupations'],
    }),

    updateOccupation: builder.mutation<Occupation, Partial<Occupation>>({
      query: (occupation) => ({
        url: apiUrlProvider.occupation + `/update`,
        method: 'POST',
        body: occupation,
      }),
      invalidatesTags: ['occupations'],
    }),

  }),
});

export const {
  useGetOccupationByIdQuery,
  useGetOccupationByIdSimplifiedQuery,
  useGetOccupationsPagedQuery,
  useGetOccupationsPagedSimplifiedQuery,
  useAddOccupationMutation,
  useGetSelectElementOccupationsQuery,
  useDeleteOccupationByIdMutation,
  useUpdateOccupationMutation
} = occupationApi;
