import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";

import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";
import { DataResult } from "../../results/DataResult";
import { Employee } from "../../models/base/Employee";
import { Pagination } from "../../results/pagination/Pagination";

export const employeeApi = createApi({
    reducerPath: "employeeApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrlProvider.apiBaseUrl }),
    endpoints: (builder) => ({

        getEmployeeById: builder.query<DataResult<Employee>, string>({
            query: (id : string) => apiUrlProvider.employee + `/findById/${id}`,
        }),
        getEmployeeByIdSimplified: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.employee + `/simplified/findById/${id}`,
        }),
        getEmployeesPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.employee + `/findAll?page=${pagination.page}&size=${pagination.size}`,
        }),

        getEmployeesPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.employee + `/simplified/findAll?page=${pagination.page}&size=${pagination.size}`,
        }),

    }),
});

export const { useGetEmployeeByIdQuery, useGetEmployeeByIdSimplifiedQuery, useGetEmployeesPagedQuery, useGetEmployeesPagedSimplifiedQuery } = employeeApi;
