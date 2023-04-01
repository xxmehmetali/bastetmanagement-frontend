import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";

export const branchApi = createApi({
    reducerPath: "branchApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrlProvider.apiBaseUrl }),
    endpoints: (builder) => ({

        getBranchById: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.branch + `/findById/${id}`,
        }),
        getBranchByIdSimplified: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.branch + `/simplified/findById/${id}`,
        }),
        getBranchesPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.branch + `/findAll?page=${pagination?.page || apiPaginationConfig.defaultPageNo}&size=${pagination?.size || apiPaginationConfig.defaultPageSize}`,
        }),

        getBranchesPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.branch + `/simplified/findAll?page=${pagination?.page || apiPaginationConfig.defaultPageNo}&size=${pagination?.size || apiPaginationConfig.defaultPageSize}`,
        }),


    }),
});

export const { useGetBranchByIdQuery, useGetBranchByIdSimplifiedQuery, useGetBranchesPagedQuery, useGetBranchesPagedSimplifiedQuery } = branchApi;
