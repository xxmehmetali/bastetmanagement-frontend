import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";

export const currencyApi = createApi({
    reducerPath: "currencyApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrlProvider.apiBaseUrl }),
    endpoints: (builder) => ({

        getCurrencyById: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.currency + `/findById/${id}`,
        }),
        getCurrencyByIdSimplified: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.currency + `/simplified/findById/${id}`,
        }),
        getCurrenciesPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.currency + `/findAll?page=${pagination?.page || apiPaginationConfig.defaultPageNo}&size=${pagination?.size || apiPaginationConfig.defaultPageSize}`,
        }),

        getCurrenciesPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.currency + `/simplified/findAll?page=${pagination?.page || apiPaginationConfig.defaultPageNo}&size=${pagination?.size || apiPaginationConfig.defaultPageSize}`,
        }),


    }),
});

export const { useGetCurrenciesPagedQuery, useGetCurrenciesPagedSimplifiedQuery, useGetCurrencyByIdQuery, useGetCurrencyByIdSimplifiedQuery } = currencyApi;
