
import { createSlice } from "@reduxjs/toolkit";
import { PagedDataResult } from "../../results/PagedDataResult";
import { apiSlice } from "../api/apiSlice";

const initialState = {
    loading: false,
    error: null,
    data: null as PagedDataResult | null,
}

export const employeeSlice = createSlice({
    name: 'pagedDataResult',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        
    }
});


export default employeeSlice.reducer;
