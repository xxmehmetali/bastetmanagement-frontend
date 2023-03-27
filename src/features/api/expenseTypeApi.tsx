import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";

export const expenseTypeApi = createApi({
    reducerPath: "expenseTypeApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrlProvider.apiBaseUrl }),
    endpoints: (builder) => ({

        getExpenseTypeById: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.expensetype + `/findById/${id}`,
        }),
        getExpenseTypeByIdSimplified: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.expensetype + `/simplified/findById/${id}`,
        }),
        getExpenseTypesPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.expensetype + `/findAll?page=${pagination?.page || apiPaginationConfig.defaultPageNo}&size=${pagination?.size || apiPaginationConfig.defaultPageSize}`,
        }),
        getExpenseTypesPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.expensetype + `/simplified/findAll?page=${pagination?.page || apiPaginationConfig.defaultPageNo}&size=${pagination?.size || apiPaginationConfig.defaultPageSize}`,
        }),


    }),
});

export const { useGetExpenseTypeByIdQuery, useGetExpenseTypeByIdSimplifiedQuery, useGetExpenseTypesPagedQuery, useGetExpenseTypesPagedSimplifiedQuery } = expenseTypeApi;
