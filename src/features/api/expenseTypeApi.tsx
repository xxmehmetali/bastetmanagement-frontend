import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";
import { ExpenseType } from "../../models/base/ExpenseType";

export const expenseTypeApi = createApi({
  reducerPath: "expenseTypeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrlProvider.apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo") || "{}")
      headers.set('Authorization', "Bearer " + loggedInUserInfo.jwt);
      return headers;
    },
  }),
  tagTypes: ['expenseTypes'],
  endpoints: (builder) => ({

    getExpenseTypeById: builder.query<Model, string>({
      query: (id: string) => apiUrlProvider.expensetype + `/findById/${id}`,
      providesTags: ['expenseTypes']
    }),

    getExpenseTypeByIdSimplified: builder.query<Model, string>({
      query: (id: string) => apiUrlProvider.expensetype + `/simplified/findById/${id}`,
      providesTags: ['expenseTypes']
    }),

    getExpenseTypesPaged: builder.query<PagedDataResult, Pagination>({
      query: (pagination: Pagination) => apiUrlProvider.expensetype + `/findAll?page=${pagination.page}&size=${pagination.size}`,
      providesTags: ['expenseTypes']
    }),

    getExpenseTypesPagedSimplified: builder.query<PagedDataResult, Pagination>({
      query: (pagination: Pagination) => apiUrlProvider.expensetype + `/simplified/findAll?page=${pagination.page}&size=${pagination.size}`,
      providesTags: ['expenseTypes']
    }),

    getSelectElementExpenseTypes: builder.query<Model, void>({
      query: () => apiUrlProvider.expensetype + "/" + apiUrlProvider.selectElement + "/findAll",
      providesTags: ['expenseTypes']
    }),

    addExpenseType: builder.mutation<ExpenseType, Partial<ExpenseType>>({
      query: (expenseType) => ({
        url: apiUrlProvider.expensetype + `/add`,
        method: "POST",
        body: expenseType,
      }),
      invalidatesTags: ['expenseTypes'],
    }),

    deleteExpenseTypeById: builder.mutation({
      query: (id: string) => ({
        url: apiUrlProvider.expensetype + `/deleteById?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['expenseTypes'],
    }),

    updateExpenseType: builder.mutation<ExpenseType, Partial<ExpenseType>>({
      query: (expensetype) => ({
        url: apiUrlProvider.expensetype + `/update`,
        method: 'POST',
        body: expensetype,
      }),
      invalidatesTags: ['expenseTypes'],
    }),

  }),
});

export const {
  useGetExpenseTypeByIdQuery,
  useGetExpenseTypeByIdSimplifiedQuery,
  useGetExpenseTypesPagedQuery,
  useGetExpenseTypesPagedSimplifiedQuery,
  useAddExpenseTypeMutation,
  useGetSelectElementExpenseTypesQuery,
  useDeleteExpenseTypeByIdMutation,
  useUpdateExpenseTypeMutation
} = expenseTypeApi;
