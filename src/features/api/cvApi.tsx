import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";
import { Cv } from "../../models/base/Cv";

export const cvApi = createApi({
  reducerPath: "cvApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrlProvider.apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo") || "{}")
      headers.set('Authorization', "Bearer " + loggedInUserInfo.jwt);
      return headers;
    },
  }),
  tagTypes: ['cvs'],
  endpoints: (builder) => ({

    getCvById: builder.query<Model, string>({
      query: (id: string) => apiUrlProvider.cv + `/findById/${id}`,
      providesTags: ['cvs'],
    }),

    getCvByIdSimplified: builder.query<Model, string>({
      query: (id: string) => apiUrlProvider.cv + `/simplified/findById/${id}`,
      providesTags: ['cvs'],
    }),

    getCvsPaged: builder.query<PagedDataResult, Pagination>({
      query: (pagination: Pagination) => apiUrlProvider.cv + `/findAll?page=${pagination.page}&size=${pagination.size}`,
      providesTags: ['cvs'],
    }),

    getCvsPagedSimplified: builder.query<PagedDataResult, Pagination>({
      query: (pagination: Pagination) => apiUrlProvider.cv + `/simplified/findAll?page=${pagination.page}&size=${pagination.size}`,
      providesTags: ['cvs'],
    }),

    getSelectElementCvs: builder.query<Model, void>({
      query: () => apiUrlProvider.cv + "/" + apiUrlProvider.selectElement + "/findAll",
      providesTags: ['cvs'],
    }),

    addCv: builder.mutation<Cv, Partial<Cv>>({
      query: (cv) => ({
        url: apiUrlProvider.cv + `/add`,
        method: 'POST',
        body: cv,
      }),
      invalidatesTags: ['cvs'],
    }),

    deleteCvById: builder.mutation({
      query: (id: string) => ({
        url: apiUrlProvider.cv + `/deleteById?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['cvs'],
    }),

    updateCv: builder.mutation<Cv, Partial<Cv>>({
      query: (cv) => ({
        url: apiUrlProvider.cv + `/update`,
        method: 'POST',
        body: cv,
      }),
      invalidatesTags: ['cvs'],
    }),

  }),
});

export const {
  useGetCvByIdQuery,
  useGetCvByIdSimplifiedQuery,
  useGetCvsPagedQuery,
  useGetCvsPagedSimplifiedQuery,
  useAddCvMutation,
  useGetSelectElementCvsQuery,
  useDeleteCvByIdMutation,
  useUpdateCvMutation
} = cvApi;
