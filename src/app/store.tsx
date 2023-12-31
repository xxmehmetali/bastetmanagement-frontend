import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { applicantApi } from "../features/api/applicantApi";
import { applicantMeetingApi } from "../features/api/applicantMeetingApi";
import { branchApi } from "../features/api/branchApi";
import { contextApi } from "../features/api/contextApi";
import { corporationApi } from "../features/api/corporationApi";
import { currencyApi } from "../features/api/currencyApi";
import { cvApi } from "../features/api/cvApi";
import { dayoffApi } from "../features/api/dayoffApi";
import { departmentApi } from "../features/api/departmentApi";
import { employeeApi } from "../features/api/employeeApi";
import { expenseApi } from "../features/api/expenseApi";
import { expenseTypeApi } from "../features/api/expenseTypeApi";
import { meetingApi } from "../features/api/meetingApi";
import { meetingplatformApi } from "../features/api/meetingPlatformApi";
import { occupationApi } from "../features/api/ocupationApi";
import { projectApi } from "../features/api/projectApi";
import { socialActivityApi } from "../features/api/socialActivityApi";
import { socialActivityTypeApi } from "../features/api/socialActivityTypeApi";
import { taskApi } from "../features/api/taskApi";
import { pageDetailSlice } from "../features/slices/pageDetailSlice";
import { userApi } from "../features/api/userApi";
import userSlice from "../features/slices/userSlice";
import { authApi } from "../features/api/authApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const reducer = combineReducers({
    userSlice
});

export const store = configureStore({
    reducer: {
        [applicantApi.reducerPath]: applicantApi.reducer,
        [applicantMeetingApi.reducerPath]: applicantMeetingApi.reducer,
        [branchApi.reducerPath]: branchApi.reducer,
        [contextApi.reducerPath]: contextApi.reducer,
        [corporationApi.reducerPath]: corporationApi.reducer,
        [currencyApi.reducerPath]: currencyApi.reducer,
        [cvApi.reducerPath]: cvApi.reducer,
        [dayoffApi.reducerPath]: dayoffApi.reducer,
        [departmentApi.reducerPath]: departmentApi.reducer,
        [employeeApi.reducerPath]: employeeApi.reducer,
        [expenseApi.reducerPath]: expenseApi.reducer,
        [expenseTypeApi.reducerPath]: expenseTypeApi.reducer,
        [meetingApi.reducerPath]: meetingApi.reducer,
        [meetingplatformApi.reducerPath]: meetingplatformApi.reducer,
        [occupationApi.reducerPath]: occupationApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
        [socialActivityApi.reducerPath]: socialActivityApi.reducer,
        [socialActivityTypeApi.reducerPath]: socialActivityTypeApi.reducer,
        [taskApi.reducerPath]: taskApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        userSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            applicantApi.middleware,
            applicantMeetingApi.middleware,
            branchApi.middleware,
            contextApi.middleware,
            corporationApi.middleware,
            currencyApi.middleware,
            cvApi.middleware,
            dayoffApi.middleware,
            departmentApi.middleware,
            employeeApi.middleware,
            expenseApi.middleware,
            expenseTypeApi.middleware,
            meetingApi.middleware,
            meetingplatformApi.middleware,
            occupationApi.middleware,
            projectApi.middleware,
            socialActivityApi.middleware,
            socialActivityTypeApi.middleware,
            taskApi.middleware,
            userApi.middleware,
            authApi.middleware
        ),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// setupListeners(store.dispatch)