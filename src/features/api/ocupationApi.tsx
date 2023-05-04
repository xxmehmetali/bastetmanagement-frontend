import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";

export const occupationApi = createApi({
    reducerPath: "occupationApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrlProvider.apiBaseUrl }),
    endpoints: (builder) => ({

        getOccupationById: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.occupation + `/findById/${id}`,
        }),
        getOccupationByIdSimplified: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.occupation + `/simplified/findById/${id}`,
        }),
        getOccupationsPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.occupation + `/findAll?page=${pagination.page}&size=${pagination.size}`,
        }),
        getOccupationsPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.occupation + `/simplified/findAll?page=${pagination.page}&size=${pagination.size}`,
        }),


    }),
});

export const { useGetOccupationByIdQuery, useGetOccupationByIdSimplifiedQuery, useGetOccupationsPagedQuery, useGetOccupationsPagedSimplifiedQuery } = occupationApi;
