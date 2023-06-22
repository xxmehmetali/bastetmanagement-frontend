import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";
import { Expense } from "../../models/base/Expense";

export const expenseApi = createApi({
    reducerPath: "expenseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrlProvider.apiBaseUrl,
        prepareHeaders: (headers, { getState }) => {
            const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo") || "{}")
            headers.set('Authorization', "Bearer " + loggedInUserInfo.jwt);
            return headers;
        },
    }),
    tagTypes: ['expenses'],
    endpoints: (builder) => ({

        getExpenseById: builder.query<Model, string>({
            query: (id: string) => apiUrlProvider.expense + `/findById/${id}`,
            providesTags: ['expenses']
        }),

        getExpenseByIdSimplified: builder.query<Model, string>({
            query: (id: string) => apiUrlProvider.expense + `/simplified/findById/${id}`,
            providesTags: ['expenses']
        }),

        getExpensesPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination: Pagination) => apiUrlProvider.expense + `/findAll?page=${pagination.page}&size=${pagination.size}`,
            providesTags: ['expenses']
        }),

        getExpensesPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination: Pagination) => apiUrlProvider.expense + `/simplified/findAll?page=${pagination.page}&size=${pagination.size}`,
            providesTags: ['expenses']
        }),

        getSelectElementExpenses: builder.query<Model, void>({
            query: () => apiUrlProvider.expense + "/" + apiUrlProvider.selectElement + "/findAll",
            providesTags: ['expenses']
        }),

        addExpense: builder.mutation<Expense, Partial<Expense>>({
            query: (expense) => ({
                url: apiUrlProvider.expense + `/add`,
                method: 'POST',
                body: expense,
            }),
            invalidatesTags: ['expenses'],
        }),

        deleteExpenseById: builder.mutation({
            query: (id: string) => ({
              url: apiUrlProvider.expense + `/deleteById?id=${id}`,
              method: "DELETE",
            }),
            invalidatesTags: ['expenses'],
          }),

        updateExpense: builder.mutation<Expense, Partial<Expense>>({
            query: (expense) => ({
                url: apiUrlProvider.expense + `/update`,
                method: 'POST',
                body: expense,
            }),
            invalidatesTags: ['expenses'],
        }),

    }),

});

export const {
    useGetExpenseByIdQuery,
    useGetExpenseByIdSimplifiedQuery,
    useGetExpensesPagedQuery,
    useGetExpensesPagedSimplifiedQuery,
    useAddExpenseMutation,
    useGetSelectElementExpensesQuery,
    useDeleteExpenseByIdMutation,
    useUpdateExpenseMutation
} = expenseApi;
