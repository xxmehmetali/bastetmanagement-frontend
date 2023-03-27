import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";

export const socialActivityTypeApi = createApi({
    reducerPath: "socialActivityTypeApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrlProvider.apiBaseUrl }),
    endpoints: (builder) => ({

        getSocialActivityTypeById: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.socialActivityType + `/findById/${id}`,
        }),
        getSocialActivityTypeByIdSimplified: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.socialActivityType + `/simplified/findById/${id}`,
        }),
        getSocialActivityTypesPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.socialActivityType + `/findAll?page=${pagination?.page || apiPaginationConfig.defaultPageNo}&size=${pagination?.size || apiPaginationConfig.defaultPageSize}`,
        }),

        getSocialActivityTypesPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.socialActivityType + `/simplified/findAll?page=${pagination?.page || apiPaginationConfig.defaultPageNo}&size=${pagination?.size || apiPaginationConfig.defaultPageSize}`,
        }),


    }),
});

export const { useGetSocialActivityTypeByIdQuery, useGetSocialActivityTypeByIdSimplifiedQuery, useGetSocialActivityTypesPagedQuery, useGetSocialActivityTypesPagedSimplifiedQuery } = socialActivityTypeApi;
