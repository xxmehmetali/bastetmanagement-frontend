
// Base Urls
const apiDevelopmentBaseUrl = "http://localhost:8080"
const apiProductionBaseUrl = "http://localhost:8080"

// Api Versions
const apiVersionUrl = "/api/v1"

// Simplified Prefix
const simplifiedPrefix = "/simplified"

// Endpoints
const applicant = "/applicant"
const applicantmeeting ="/applicantmeeting"
const branch= "/branch"
const context = "/context"
const corporation = "/corporation"
const currency = "/currency"
const cv = "/cv"
const dayoff = "/dayoff"
const department = "/department"
const employee = "/employee"
const expense = "/expense"
const expensetype = "/expensetype"
const meeting = "/meeting"
const meetingplatform = "/meetingplatform"
const occupation = "/occupation"
const project = "/project"
const role = "/role"
const socialActivity = "/socialactivity"
const socialActivityType = "/socialActivityType"
const task = "/task"
const user = "/user"

const apiBaseUrl = apiDevelopmentBaseUrl + apiVersionUrl 
export default {apiBaseUrl, apiVersionUrl, simplifiedPrefix, applicant, applicantmeeting, branch, context, corporation, currency, cv, dayoff, department, employee, expense, expensetype, meeting, meetingplatform, occupation, project, role, socialActivity, socialActivityType, task, user};
