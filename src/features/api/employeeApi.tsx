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
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrlProvider.apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo") || "{}")
      headers.set('Authorization', "Bearer " + loggedInUserInfo.jwt);
      return headers;
    },
  }),
  tagTypes: ['employees'],
  endpoints: (builder) => ({

    getEmployeeById: builder.query<DataResult<Employee>, string>({
      query: (id: string) => apiUrlProvider.employee + `/findById/${id}`,
      providesTags: ['employees']
    }),

    getEmployeeByIdSimplified: builder.query<Model, string>({
      query: (id: string) => apiUrlProvider.employee + `/simplified/findById/${id}`,
      providesTags: ['employees']
    }),

    getEmployeesPaged: builder.query<PagedDataResult, Pagination>({
      query: (pagination: Pagination) => apiUrlProvider.employee + `/findAll?page=${pagination.page}&size=${pagination.size}`,
      providesTags: ['employees']
    }),

    getEmployeesPagedSimplified: builder.query<PagedDataResult, Pagination>({
      query: (pagination: Pagination) => apiUrlProvider.employee + `/simplified/findAll?page=${pagination.page}&size=${pagination.size}`,
      providesTags: ['employees']    
    }),

    getSelectElementEmployees: builder.query<Model, void>({
      query: () => apiUrlProvider.employee + "/" + apiUrlProvider.selectElement + "/findAll",
      providesTags: ['employees']
    }),

    addEmployee: builder.mutation<Employee, Partial<Employee>>({
      query: (employee) => ({
        url: apiUrlProvider.employee + `/add`,
        method: "POST",
        body: employee,
      }),
      invalidatesTags: ['employees'],
    }),
    deleteEmployeesById: builder.mutation({
      query: (id: string) => ({
        url: apiUrlProvider.employee + `/deleteById?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['employees'],
    }),

    updateEmployee: builder.mutation<Employee, Partial<Employee>>({
      query: (employee) => ({
        url: apiUrlProvider.employee + `/update`,
        method: 'POST',
        body: employee,
      }),
      invalidatesTags: ['employees'],
    }),

  }),
});

export const {
  useGetEmployeeByIdQuery,
  useGetEmployeeByIdSimplifiedQuery,
  useGetEmployeesPagedQuery,
  useGetEmployeesPagedSimplifiedQuery,
  useAddEmployeeMutation,
  useGetSelectElementEmployeesQuery,
  useDeleteEmployeesByIdMutation,
  useUpdateEmployeeMutation
} = employeeApi;
