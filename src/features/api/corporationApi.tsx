import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";
import { Corporation } from "../../models/base/Corporation";

export const corporationApi = createApi({
    reducerPath: "corporationApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: apiUrlProvider.apiBaseUrl,
        prepareHeaders:  (headers, { getState }) => {
            const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo") || "{}")
            headers.set('Authorization', "Bearer " + loggedInUserInfo.jwt);
            return headers;
          },
    }),
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

        getSelectElementCorporations: builder.query<Model, void>({
            query: () => apiUrlProvider.corporation + "/" + apiUrlProvider.selectElement + "/findAll",
        }),

        addCorporation: builder.mutation<Corporation, Partial<Corporation>>({
            query: (corporation) => ({
              url: apiUrlProvider.corporation + `/add`,
              method: 'POST',
              body : corporation,
            }),
            invalidatesTags: ['corporations'],
          }),

    deleteCorporationById: builder.mutation({
      query: (id: string) => ({
        url: apiUrlProvider.corporation + `/deleteById?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["corporations"],
    }),
  }),
});

export const {
  useGetCorporationByIdQuery,
  useGetCorporationByIdSimplifiedQuery,
  useGetCorporationsPagedQuery,
  useGetCorporationsPagedSimplifiedQuery,
  useAddCorporationMutation,
  useGetProjectsByCorporationIdQuery,
  useGetSelectElementCorporationsQuery,
  useDeleteCorporationByIdMutation,
} = corporationApi;
