
// Base Urls
const apiDevelopmentBaseUrl = "http://localhost:8080"
const apiProductionBaseUrl = "http://localhost:8080"

// Api Versions
const apiVersionUrl = "/api/v1"

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
export default {apiBaseUrl, apiVersionUrl, simplifiedPrefix, modelPrefix, applicant, applicantmeeting, branch, context, corporation, currency, cv, dayoff, department, employee, expense, expensetype, meeting, meetingplatform, occupation, project, role, socialActivity, socialActivityType, task, user, selectElement};
