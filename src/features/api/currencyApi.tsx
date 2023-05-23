import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import { Pagination } from "../../results/pagination/Pagination";
import apiUrlProvider from "./config/apiUrlProvider";
import apiPaginationConfig from "./config/apiPaginationConfig";
import { Currency } from "../../models/base/Currency";

export const currencyApi = createApi({
    reducerPath: "currencyApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: apiUrlProvider.apiBaseUrl,
        prepareHeaders:  (headers, { getState }) => {
            const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo") || "{}")
            headers.set('Authorization', "Bearer " + loggedInUserInfo.jwt);
            return headers;
          },
    }),
    tagTypes: ['currencies'],
    endpoints: (builder) => ({

        getCurrencyById: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.currency + `/findById/${id}`,
        }),
        getCurrencyByIdSimplified: builder.query<Model, string>({
            query: (id : string) => apiUrlProvider.currency + `/simplified/findById/${id}`,
        }),
        getCurrenciesPaged: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.currency + `/findAll?page=${pagination.page}&size=${pagination.size}`,
        }),

        getCurrenciesPagedSimplified: builder.query<PagedDataResult, Pagination>({
            query: (pagination : Pagination) => apiUrlProvider.currency + `/simplified/findAll?page=${pagination.page}&size=${pagination.size}`,
        }),

        getSelectElementCurrencies: builder.query<Model, void>({
            query: () => apiUrlProvider.currency + "/" + apiUrlProvider.selectElement + "/findAll",
        }),

        addCurrency: builder.mutation<Currency, Partial<Currency>>({
            query: (currency) => ({
              url: apiUrlProvider.currency + `/add`,
              method: 'POST',
              body : currency,
            }),
            invalidatesTags: ['currencies'],
          }),

    }),
});

export const { useGetCurrenciesPagedQuery, useGetCurrenciesPagedSimplifiedQuery, useGetCurrencyByIdQuery, useGetCurrencyByIdSimplifiedQuery, useAddCurrencyMutation, useGetSelectElementCurrenciesQuery } = currencyApi;
