import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";
import { SocialActivityType } from "../../models/base/SocialActivityType";

export const socialActivityTypeApi = createApi({
  reducerPath: "socialActivityTypeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrlProvider.apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo") || "{}")
      headers.set('Authorization', "Bearer " + loggedInUserInfo.jwt);
      return headers;
    },
  }),
  tagTypes: ['socialActivityTypes'],
  endpoints: (builder) => ({

    getSocialActivityTypeById: builder.query<Model, string>({
      query: (id: string) => apiUrlProvider.socialActivityType + `/findById/${id}`,
    }),
    getSocialActivityTypeByIdSimplified: builder.query<Model, string>({
      query: (id: string) => apiUrlProvider.socialActivityType + `/simplified/findById/${id}`,
    }),
    getSocialActivityTypesPaged: builder.query<PagedDataResult, Pagination>({
      query: (pagination: Pagination) => apiUrlProvider.socialActivityType + `/findAll?page=${pagination.page}&size=${pagination.size}`,
    }),

    getSocialActivityTypesPagedSimplified: builder.query<PagedDataResult, Pagination>({
      query: (pagination: Pagination) => apiUrlProvider.socialActivityType + `/simplified/findAll?page=${pagination.page}&size=${pagination.size}`,
    }),

    getSelectElementSocialActivityTypes: builder.query<Model, void>({
      query: () => apiUrlProvider.socialActivityType + "/" + apiUrlProvider.selectElement + "/findAll",
    }),

    addSocialActivityType: builder.mutation<
      SocialActivityType,
      Partial<SocialActivityType>
    >({
      query: (socialActivityType) => ({
        url: apiUrlProvider.socialActivityType + `/add`,
        method: "POST",
        body: socialActivityType,
      }),
      invalidatesTags: ['socialActivityTypes'],
    }),
    deleteSocialActivityTypeById: builder.mutation({
      query: (id: string) => ({
        url: apiUrlProvider.socialActivityType + `/deleteById?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['socialActivityTypes'],
    }),

    updateSocialActivityType: builder.mutation<SocialActivityType, Partial<SocialActivityType>>({
      query: (socialActivityType) => ({
        url: apiUrlProvider.socialActivityType + `/update`,
        method: 'POST',
        body: socialActivityType,
      }),
      invalidatesTags: ['socialActivityTypes'],
    }),

  }),
});

export const {
  useGetSocialActivityTypeByIdQuery,
  useGetSocialActivityTypeByIdSimplifiedQuery,
  useGetSocialActivityTypesPagedQuery,
  useGetSocialActivityTypesPagedSimplifiedQuery,
  useAddSocialActivityTypeMutation,
  useGetSelectElementSocialActivityTypesQuery,
  useDeleteSocialActivityTypeByIdMutation,
  useUpdateSocialActivityTypeMutation
} = socialActivityTypeApi;
