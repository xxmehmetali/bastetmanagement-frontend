import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";
import { SocialActivity } from "../../models/base/SocialActivity";

export const socialActivityApi = createApi({
  reducerPath: "socialActivityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrlProvider.apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo") || "{}")
      headers.set('Authorization', "Bearer " + loggedInUserInfo.jwt);
      return headers;
    },
  }),
  tagTypes: ['socialActivities'],
  endpoints: (builder) => ({

    getSocialActivityById: builder.query<Model, string>({
      query: (id: string) => apiUrlProvider.socialActivity + `/findById/${id}`,
      providesTags: ['socialActivities']
    }),

    getSocialActivityIdSimplified: builder.query<Model, string>({
      query: (id: string) => apiUrlProvider.socialActivity + `/simplified/findById/${id}`,
      providesTags: ['socialActivities']
    }),

    getSocialActivitiesPaged: builder.query<PagedDataResult, Pagination>({
      query: (pagination: Pagination) => apiUrlProvider.socialActivity + `/findAll?page=${pagination.page}&size=${pagination.size}`,
      providesTags: ['socialActivities']
    }),

    getSocialActivitiesPagedSimplified: builder.query<PagedDataResult, Pagination>({
      query: (pagination: Pagination) => apiUrlProvider.socialActivity + `/simplified/findAll?page=${pagination.page}&size=${pagination.size}`,
      providesTags: ['socialActivities']
    }),

    getSelectElementSocialActivities: builder.query<Model, void>({
      query: () => apiUrlProvider.socialActivity + "/" + apiUrlProvider.selectElement + "/findAll",
      providesTags: ['socialActivities']
    }),

    addSocialActivity: builder.mutation<SocialActivity, Partial<SocialActivity>>({
      query: (socialActivity) => ({
        url: apiUrlProvider.socialActivity + `/add`,
        method: "POST",
        body: socialActivity,
      }),
      invalidatesTags: ['socialActivities'],
    }),

    deleteSocialActivityById: builder.mutation({
      query: (id: string) => ({
        url: apiUrlProvider.socialActivity + `/deleteById?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['socialActivities'],
    }),

    updateSocialActivity: builder.mutation<SocialActivity, Partial<SocialActivity>>({
      query: (socialActivity) => ({
        url: apiUrlProvider.socialActivity + `/update`,
        method: 'POST',
        body: socialActivity,
      }),
      invalidatesTags: ['socialActivities'],
    }),

  }),
});

export const {
  useGetSocialActivitiesPagedQuery,
  useGetSocialActivitiesPagedSimplifiedQuery,
  useGetSocialActivityByIdQuery,
  useGetSocialActivityIdSimplifiedQuery,
  useAddSocialActivityMutation,
  useGetSelectElementSocialActivitiesQuery,
  useDeleteSocialActivityByIdMutation,
  useUpdateSocialActivityMutation

} = socialActivityApi;