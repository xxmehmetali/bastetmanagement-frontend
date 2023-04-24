import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";

export const departmentApi = createApi({
    reducerPath: "departmentApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrlProvider.apiBaseUrl }),
    endpoints: (builder) => ({

        getDepartmentById: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.department + `/findById/${id}`,
        }),
        getDepartmentByIdSimplified: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.department + `/simplified/findById/${id}`,
        }),
        getDepartmentsPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.department + `/findAll?page=${pagination?.page || apiPaginationConfig.defaultPageNo}&size=${pagination?.size || apiPaginationConfig.defaultPageSize}`,
        }),

        getDepartmentsPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.department + `/simplified/findAll?page=${pagination.page}&size=${pagination.size}`,
        }),


    }),
});

export const { useGetDepartmentByIdQuery, useGetDepartmentByIdSimplifiedQuery, useGetDepartmentsPagedQuery, useGetDepartmentsPagedSimplifiedQuery } = departmentApi;
