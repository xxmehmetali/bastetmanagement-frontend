import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";

export const cvApi = createApi({
    reducerPath: "cvApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrlProvider.apiBaseUrl }),
    endpoints: (builder) => ({

        getCvById: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.cv + `/findById/${id}`,
        }),
        getCvByIdSimplified: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.cv + `/simplified/findById/${id}`,
        }),
        getCvsPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.cv + `/findAll?page=${pagination?.page || apiPaginationConfig.defaultPageNo}&size=${pagination?.size || apiPaginationConfig.defaultPageSize}`,
        }),

        getCvsPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.cv + `/simplified/findAll?page=${pagination?.page || apiPaginationConfig.defaultPageNo}&size=${pagination?.size || apiPaginationConfig.defaultPageSize}`,
        }),


    }),
});

export const { useGetCvByIdQuery, useGetCvByIdSimplifiedQuery, useGetCvsPagedQuery, useGetCvsPagedSimplifiedQuery } = cvApi;
