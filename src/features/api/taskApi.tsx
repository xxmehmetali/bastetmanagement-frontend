import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";

export const taskApi = createApi({
    reducerPath: "taskApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrlProvider.apiBaseUrl }),
    endpoints: (builder) => ({

        getTaskById: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.task + `/findById/${id}`,
        }),
        getTaskByIdSimplified: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.task + `/simplified/findById/${id}`,
        }),
        getTasksPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.task + `/findAll?page=${pagination?.page || apiPaginationConfig.defaultPageNo}&size=${pagination?.size || apiPaginationConfig.defaultPageSize}`,
        }),

        getTasksPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.task + `/simplified/findAll?page=${pagination?.page || apiPaginationConfig.defaultPageNo}&size=${pagination?.size || apiPaginationConfig.defaultPageSize}`,
        }),


    }),
});

export const { useGetTaskByIdQuery, useGetTaskByIdSimplifiedQuery, useGetTasksPagedQuery, useGetTasksPagedSimplifiedQuery } = taskApi;
