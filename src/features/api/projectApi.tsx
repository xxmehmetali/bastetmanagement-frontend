import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";
import { Project } from "../../models/base/Project";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrlProvider.apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo") || "{}")
      headers.set('Authorization', "Bearer " + loggedInUserInfo.jwt);
      return headers;
    },
  }),
  tagTypes: ['projects'],
  endpoints: (builder) => ({

    getProjectById: builder.query<Model, string>({
      query: (id: string) => apiUrlProvider.project + `/findById/${id}`,
      providesTags: ['projects']
    }),

    getProjectByIdSimplified: builder.query<Model, string>({
      query: (id: string) => apiUrlProvider.project + `/simplified/findById/${id}`,
      providesTags: ['projects']
    }),

    getProjectsPaged: builder.query<PagedDataResult, Pagination>({
      query: (pagination: Pagination) => apiUrlProvider.project + `/findAll?page=${pagination.page}&size=${pagination.size}`,
      providesTags: ['projects']
    }),

    getProjectsPagedSimplified: builder.query<PagedDataResult, Pagination>({
      query: (pagination: Pagination) => apiUrlProvider.project + `/simplified/findAll?page=${pagination.page}&size=${pagination.size}`,
      providesTags: ['projects']
    }),
    getProjectsByCorporationId: builder.query<Model, string>({
      query: (id: string) => apiUrlProvider.project + `/findProjectsByCorporationId/${id}`,
      providesTags: ['projects']
    }),

    getSelectElementProjects: builder.query<Model, void>({
      query: () => apiUrlProvider.project + "/" + apiUrlProvider.selectElement + "/findAll",
      providesTags: ['projects']
    }),

    addProject: builder.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: apiUrlProvider.project + `/add`,
        method: "POST",
        body: project,
      }),
      invalidatesTags: ['projects'],
    }),

    deleteProjectById: builder.mutation({
      query: (id: string) => ({
        url: apiUrlProvider.project + `/deleteById?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['projects'],
    }),

    updateProject: builder.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: apiUrlProvider.project + `/update`,
        method: 'POST',
        body: project,
      }),
      invalidatesTags: ['projects'],
    }),

  }),
});

export const {
  useGetProjectByIdQuery,
  useGetProjectByIdSimplifiedQuery,
  useGetProjectsPagedQuery,
  useGetProjectsPagedSimplifiedQuery,
  useAddProjectMutation,
  useGetSelectElementProjectsQuery,
  useDeleteProjectByIdMutation,
  useUpdateProjectMutation
} = projectApi;
