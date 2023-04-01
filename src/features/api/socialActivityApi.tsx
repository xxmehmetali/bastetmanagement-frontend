import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";

export const socialActivityApi = createApi({
    reducerPath: "socialActivityApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrlProvider.apiBaseUrl }),
    endpoints: (builder) => ({

        getSocialActivityById: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.socialActivity + `/findById/${id}`,
        }),
        getSocialActivityIdSimplified: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.socialActivity + `/simplified/findById/${id}`,
        }),
        getSocialActivitiesPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.socialActivity + `/findAll?page=${pagination?.page || apiPaginationConfig.defaultPageNo}&size=${pagination?.size || apiPaginationConfig.defaultPageSize}`,
        }),

        getSocialActivitiesPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.socialActivity + `/simplified/findAll?page=${pagination?.page || apiPaginationConfig.defaultPageNo}&size=${pagination?.size || apiPaginationConfig.defaultPageSize}`,
        }),


    }),
});

export const { useGetSocialActivitiesPagedQuery, useGetSocialActivitiesPagedSimplifiedQuery, useGetSocialActivityByIdQuery, useGetSocialActivityIdSimplifiedQuery } = socialActivityApi;
