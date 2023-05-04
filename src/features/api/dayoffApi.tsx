import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";

export const dayoffApi = createApi({
    reducerPath: "dayoffApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrlProvider.apiBaseUrl }),
    endpoints: (builder) => ({

        getDayoffById: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.dayoff + `/findById/${id}`,
        }),
        getDayoffByIdSimplified: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.dayoff + `/simplified/findById/${id}`,
        }),
        getDayoffsPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.dayoff + `/findAll?page=${pagination.page}&size=${pagination.size}`,
        }),

        getDayoffsPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.dayoff + `/simplified/findAll?page=${pagination.page}&size=${pagination.size}`,
        }),


    }),
});

export const { useGetDayoffByIdQuery, useGetDayoffByIdSimplifiedQuery, useGetDayoffsPagedQuery, useGetDayoffsPagedSimplifiedQuery } = dayoffApi;
