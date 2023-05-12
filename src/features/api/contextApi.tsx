import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";
import { Context } from "../../models/base/Context";

export const contextApi = createApi({
    reducerPath: "contextApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrlProvider.apiBaseUrl }),
    tagTypes: ['contexts'],
    endpoints: (builder) => ({

        
        getContextById: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.context + `/findById/${id}`,
        }),
        getContextByIdSimplified: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.context + `/simplified/findById/${id}`,
        }),
        getContextsPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.context + `/findAll?page=${pagination.page}&size=${pagination.size}`,
        }),

        getContextsPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.context + `/simplified/findAll?page=${pagination.page}&size=${pagination.size}`,
        }),

        getSelectElementContexts: builder.query<Model, void>({
            query: () => apiUrlProvider.context + "/" + apiUrlProvider.selectElement + "/findAll",
        }),

        addContext: builder.mutation<Context, Partial<Context>>({
            query: (context) => ({
              url: apiUrlProvider.context + `/add`,
              method: 'POST',
              body : context,
            }),
            invalidatesTags: ['contexts'],
          }),

    }),
});

export const { useGetContextByIdQuery, useGetContextByIdSimplifiedQuery, useGetContextsPagedQuery, useGetContextsPagedSimplifiedQuery, useAddContextMutation, useGetSelectElementContextsQuery } = contextApi;
