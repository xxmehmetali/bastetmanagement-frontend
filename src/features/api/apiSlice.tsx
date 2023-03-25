import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Employee } from "../../models/base/Employee";
import { Page } from "../../results/Page";
import { PagedDataResult } from "../../results/PagedDataResult";
import apiUrlProvider from "./apiUrlProvider";


const simplifiedPrefix = apiUrlProvider.simplifiedPrefix;
export const apiSlice = createApi({
    reducerPath: "apiSlice",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrlProvider.apiBaseUrl }),
    endpoints: (builder) => ({
      getCategories: builder.query({
        query: () => "/products/categories",
      }),
      getProductBySearch: builder.query({
        query: (product) => `products/search?q=${product}`,
      }),
      getProducts: builder.query({
        query: () => "/products",
      }),
      getEmployees: builder.query<PagedDataResult,void>({
        query: () => apiUrlProvider.employee + "/findAll",
      }),
      getBranches: builder.query<any,void>({
        query: () => "/branch/findAll"
      }),
      getSocialActivityTypesSimplified: builder.query<any,void>({
        query: () => "/socialActivityType/simplified/findAll"
      }),
      getSocialActivityTypeSimplified: builder.query<any,void>({
        query: () => "/socialActivityType/simplified/findById/04960d87-67d1-41dc-a5ef-9e84c513f840"
      }),
    }),
  });

  export const { useGetCategoriesQuery, useGetProductsQuery, useGetEmployeesQuery, useGetBranchesQuery, useGetSocialActivityTypesSimplifiedQuery, useGetSocialActivityTypeSimplifiedQuery } = apiSlice;