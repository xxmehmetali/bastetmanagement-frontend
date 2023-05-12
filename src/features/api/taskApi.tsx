import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";
import { Task } from "../../models/base/Task";

export const taskApi = createApi({
    reducerPath: "taskApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrlProvider.apiBaseUrl }),
    tagTypes: ['tasks'],
    endpoints: (builder) => ({

        getTaskById: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.task + `/findById/${id}`,
        }),
        getTaskByIdSimplified: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.task + `/simplified/findById/${id}`,
        }),
        getTasksPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.task + `/findAll?page=${pagination.page}&size=${pagination.size}`,
        }),

        getTasksPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.task + `/simplified/findAll?page=${pagination.page}&size=${pagination.size}`,
        }),

        getSelectElementTasks: builder.query<Model, void>({
            query: () => apiUrlProvider.task + "/" + apiUrlProvider.selectElement + "/findAll",
        }),

        addTask: builder.mutation<Task, Partial<Task>>({
            query: (task) => ({
              url: apiUrlProvider.task + `/add`,
              method: 'POST',
              body : task,
            }),
            invalidatesTags: ['tasks'],
          }),

    }),
});

export const { useGetTaskByIdQuery, useGetTaskByIdSimplifiedQuery, useGetTasksPagedQuery, useGetTasksPagedSimplifiedQuery, useAddTaskMutation, useGetSelectElementTasksQuery } = taskApi;
