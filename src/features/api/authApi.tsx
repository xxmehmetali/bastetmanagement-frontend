import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../../models/Model";
import { PagedDataResult } from "../../results/PagedDataResult";
import apiUrlProvider from "./config/apiUrlProvider";
import { User } from "../../models/base/User";
import { JwtResponse } from "../../models/authDtos/JwtResponse";
import { DataResult } from "../../results/DataResult";


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: apiUrlProvider.authApi,
        // NO NEED FOR AUTHENTICATION HEADER HERE!
    }),
    tagTypes: ['auth'],
    endpoints: (builder) => ({


        login: builder.mutation<DataResult<JwtResponse>, Partial<JwtResponse>>({
            query: (loginInfo) => ({
                url: apiUrlProvider.login + `/`,
                method: 'POST',
                body : loginInfo,
            }),
            invalidatesTags: ['auth']
          }),

          register: builder.mutation<JwtResponse, Partial<JwtResponse>>({
            query: (registerInfo) => ({
                url: apiUrlProvider.register + `/`,
                method: 'POST',
                body : registerInfo,
            }),
            invalidatesTags: ['auth']
          }),


    }),
});

export const { 
    useLoginMutation,
    useRegisterMutation
} = authApi;
