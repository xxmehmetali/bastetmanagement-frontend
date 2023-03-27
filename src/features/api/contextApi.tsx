import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";

export const contextApi = createApi({
    reducerPath: "contextApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrlProvider.apiBaseUrl }),
    endpoints: (builder) => ({

        
        getContextById: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.context + `/findById/${id}`,
        }),
        getContextByIdSimplified: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.context + `/simplified/findById/${id}`,
        }),
        getContextsPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.context + `/findAll?page=${pagination?.page || apiPaginationConfig.defaultPageNo}&size=${pagination?.size || apiPaginationConfig.defaultPageSize}`,
        }),

        getContextsPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.context + `/simplified/findAll?page=${pagination?.page || apiPaginationConfig.defaultPageNo}&size=${pagination?.size || apiPaginationConfig.defaultPageSize}`,
        }),


    }),
});

export const { useGetContextByIdQuery, useGetContextByIdSimplifiedQuery, useGetContextsPagedQuery, useGetContextsPagedSimplifiedQuery } = contextApi;
