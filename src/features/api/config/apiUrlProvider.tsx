
// Base Urls
const apiDevelopmentBaseUrl = "http://localhost:8080"
const apiProductionBaseUrl = "http://localhost:8080"

//http://localhost:8080/api/auth/

// Api Versions
const apiV1 = "/v1"
const currentApi = apiV1

// Api
const pureApi = "/api"
const apiVersionUrl = pureApi + currentApi

// Authentication
const auth = "/auth"
const login = "/login"
const register = "/register"

const authApi = apiProductionBaseUrl + pureApi + auth
const loginApi = authApi + login
const registerApi = authApi + register

// Simplified Prefix
const simplifiedPrefix = "/simplified"

// Model Prefix
const modelPrefix = "/model"

// Select Element Prefix
const selectElement = "selectElement"

// Endpoints
const applicant = "/applicant"
const applicantmeeting ="/applicantMeeting"
const branch= "/branch"
const context = "/context"
const corporation = "/corporation"
const currency = "/currency"
const cv = "/cv"
const dayoff = "/dayoff"
const department = "/department"
const employee = "/employee"
const expense = "/expense"
const expensetype = "/expenseType"
const meeting = "/meeting"
const meetingplatform = "/meetingPlatform"
const occupation = "/occupation"
const project = "/project"
const role = "/role"
const socialActivity = "/socialActivity"
const socialActivityType = "/socialActivityType"
const task = "/task"
const user = "/user"

const apiBaseUrl = apiDevelopmentBaseUrl + apiVersionUrl 
export default {
    apiBaseUrl, 
    apiVersionUrl, 
    simplifiedPrefix, 
    modelPrefix, 
    applicant, 
    applicantmeeting, 
    branch, 
    context, 
    corporation, 
    currency, 
    cv, 
    dayoff, 
    department, 
    employee,
    expense, 
    expensetype, 
    meeting, 
    meetingplatform, 
    occupation, 
    project, 
    role, 
    socialActivity, 
    socialActivityType, 
    task, 
    user, 
    selectElement,
    authApi,
    loginApi,
    registerApi,
    login,
    register
};
