import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";
import { Corporation } from "../../models/base/Corporation";

export const corporationApi = createApi({
    reducerPath: "corporationApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrlProvider.apiBaseUrl }),
    tagTypes: ['corporations'],
    endpoints: (builder) => ({

        getCorporationById: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.corporation + `/findById/${id}`,
        }),
        getCorporationByIdSimplified: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.corporation + `/simplified/findById/${id}`,
        }),
        getCorporationsPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.corporation + `/findAll?page=${pagination.page}&size=${pagination.size}`,
        }),

        getCorporationsPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.corporation + `/simplified/findAll?page=${pagination.page}&size=${pagination.size}`,
        }),

        getProjectsByCorporationId: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.project + `/findProjectsByCorporationId/${id}`,
        }),

        addCorporation: builder.mutation<Corporation, Partial<Corporation>>({
            query: (corporation) => ({
              url: apiUrlProvider.corporation + `/add`,
              method: 'POST',
              body : corporation,
            }),
            invalidatesTags: ['corporations'],
          }),



    }),
});

export const { useGetCorporationByIdQuery, useGetCorporationByIdSimplifiedQuery, useGetCorporationsPagedQuery, useGetCorporationsPagedSimplifiedQuery, useAddCorporationMutation, useGetProjectsByCorporationIdQuery } = corporationApi;
