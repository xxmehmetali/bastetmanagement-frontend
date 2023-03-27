import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";

export const employeeApi = createApi({
    reducerPath: "employeeApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrlProvider.apiBaseUrl }),
    endpoints: (builder) => ({

        getEmployeeById: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.employee + `/findById/${id}`,
        }),
        getEmployeeByIdSimplified: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.employee + `/simplified/findById/${id}`,
        }),
        getEmployeesPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.employee + `/findAll?page=${pagination?.page || apiPaginationConfig.defaultPageNo}&size=${pagination?.size || apiPaginationConfig.defaultPageSize}`,
        }),

        getEmployeesPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.employee + `/simplified/findAll?page=${pagination?.page || apiPaginationConfig.defaultPageNo}&size=${pagination?.size || apiPaginationConfig.defaultPageSize}`,
        }),


    }),
});

export const { useGetEmployeeByIdQuery, useGetEmployeeByIdSimplifiedQuery, useGetEmployeesPagedQuery, useGetEmployeesPagedSimplifiedQuery } = employeeApi;
