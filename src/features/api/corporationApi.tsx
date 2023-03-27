import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";

export const corporationApi = createApi({
    reducerPath: "corporationApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrlProvider.apiBaseUrl }),
    endpoints: (builder) => ({

        getCorporationById: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.corporation + `/findById/${id}`,
        }),
        getCorporationByIdSimplified: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.corporation + `/simplified/findById/${id}`,
        }),
        getCorporationsPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.corporation + `/findAll?page=${pagination?.page || apiPaginationConfig.defaultPageNo}&size=${pagination?.size || apiPaginationConfig.defaultPageSize}`,
        }),

        getCorporationsPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.corporation + `/simplified/findAll?page=${pagination?.page || apiPaginationConfig.defaultPageNo}&size=${pagination?.size || apiPaginationConfig.defaultPageSize}`,
        }),


    }),
});

export const { useGetCorporationByIdQuery, useGetCorporationByIdSimplifiedQuery, useGetCorporationsPagedQuery, useGetCorporationsPagedSimplifiedQuery } = corporationApi;
