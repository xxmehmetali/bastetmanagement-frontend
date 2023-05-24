import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";
import { Department } from "../../models/base/Department";

export const departmentApi = createApi({
    reducerPath: "departmentApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: apiUrlProvider.apiBaseUrl,
        prepareHeaders:  (headers, { getState }) => {
            const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo") || "{}")
            headers.set('Authorization', "Bearer " + loggedInUserInfo.jwt);
            return headers;
          },
    }),
    tagTypes: ['departments'],
    endpoints: (builder) => ({

        getDepartmentById: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.department + `/findById/${id}`,
        }),
        getDepartmentByIdSimplified: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.department + `/simplified/findById/${id}`,
        }),
        getDepartmentsPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.department + `/findAll?page=${pagination.page}&size=${pagination.size}`,
        }),

        getDepartmentsPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.department + `/simplified/findAll?page=${pagination.page}&size=${pagination.size}`,
        }),

        getSelectElementDepartments: builder.query<Model, void>({
            query: () => apiUrlProvider.department + "/" + apiUrlProvider.selectElement + "/findAll",
        }),

        addDepartment: builder.mutation<Department, Partial<Department>>({
            query: (department) => ({
              url: apiUrlProvider.department + `/add`,
              method: 'POST',
              body : department,
            }),
            invalidatesTags: ['departments'],
          }),

    deleteDepartmentsById: builder.mutation({
      query: (id: string) => ({
        url: apiUrlProvider.department + `/deleteById?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["departments"],
    }),
  }),
});

export const {
  useGetDepartmentByIdQuery,
  useGetDepartmentByIdSimplifiedQuery,
  useGetDepartmentsPagedQuery,
  useGetDepartmentsPagedSimplifiedQuery,
  useAddDepartmentMutation,
  useGetSelectElementDepartmentsQuery,
  useDeleteDepartmentsByIdMutation
} = departmentApi;
