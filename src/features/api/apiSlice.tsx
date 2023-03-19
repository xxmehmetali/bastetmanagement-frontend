import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
      getEmployees: builder.query<any,void>({
        query: () => apiUrlProvider.employee + "/findAll",
      }),
    }),
  });

  export const { useGetCategoriesQuery, useGetProductsQuery, useGetEmployeesQuery } = apiSlice;