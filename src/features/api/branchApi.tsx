import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";
import { Branch } from "../../models/base/Branch";

export const branchApi = createApi({
    reducerPath: "branchApi",
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrlProvider.apiBaseUrl,
        prepareHeaders:  (headers, { getState }) => {
            const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo") || "{}")
            headers.set('Authorization', "Bearer " + loggedInUserInfo.jwt);
            return headers;
          },
    }),
    tagTypes: ['branches'],
    endpoints: (builder) => ({

        getBranchById: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.branch + `/findById/${id}`,
        }),
        getBranchByIdSimplified: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.branch + `/simplified/findById/${id}`,
        }),
        getBranchesPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.branch + `/findAll?page=${pagination.page}&size=${pagination.size}`,
        }),

        getBranchesPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.branch + `/simplified/findAll?page=${pagination.page}&size=${pagination.size}`,
        }),

        getSelectElementBranches: builder.query<Model, void>({
            query: () => apiUrlProvider.branch + "/" + apiUrlProvider.selectElement + "/findAll",
        }),

        addBranch: builder.mutation<Branch, Partial<Branch>>({
            query: (branch) => ({
              url: apiUrlProvider.branch + `/add`,
              method: 'POST',
              body : branch,
            }),
            invalidatesTags: ['branches'],
          }),

    deleteBranchById: builder.mutation({
      query: (id: string) => ({
        url: apiUrlProvider.branch + `/deleteById?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["branches"],
    }),
  }),
});

export const {
  useGetBranchByIdQuery,
  useGetBranchByIdSimplifiedQuery,
  useGetBranchesPagedQuery,
  useGetBranchesPagedSimplifiedQuery,
  useAddBranchMutation,
  useGetSelectElementBranchesQuery,
  useDeleteBranchByIdMutation,
} = branchApi;
