
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
const meetingplatform = "/meetingplatform"
const occupation = "/occupation"
const project = "/project"
const role = "/role"
const socialActivity = "/socialactivity"
const socialActivityType = "/socialActivityType"
const task = "/task"
const user = "/user"

// --------------------------

const model = '/model';
const detailWord = 'Detail'
const addWord = 'Add'
const updateWord = 'Update'
const slash = '/'

// Authentication
const register = "/register"
const login = "/login"
const auth = "/auth"

// Personal
const profile = "/profile"

// List
const applicantListUrl = model + applicant
const applicantmeetingListUrl =  model + applicantmeeting
const branchListUrl =  model + branch
const contextListUrl =  model + context
const corporationListUrl =  model + corporation
const currencyListUrl =  model + currency
const cvListUrl =  model + cv
const dayoffListUrl =  model + dayoff
const departmentListUrl =  model + department
const employeeListUrl =  model + employee
const expenseListUrl =  model + expense
const expensetypeListUrl =  model + expensetype
const meetingListUrl =  model + meeting
const meetingplatformListUrl =  model + meetingplatform
const occupationListUrl =  model + occupation
const projectListUrl =  model + project
const roleListUrl = model + role
const socialActivityListUrl=  model + socialActivity
const socialActivityTypeListUrl=  model + socialActivityType
const taskListUrl=  model + task
const userListUrl=  model + user


// Detail
const applicantDetailUrl = model + applicant + detailWord + slash
const applicantmeetingDetailUrl =  model + applicantmeeting + detailWord + slash
const branchDetailUrl =  model + branch + detailWord + slash
const contextDetailUrl =  model + context + detailWord + slash
const corporationDetailUrl =  model + corporation + detailWord + slash
const currencyDetailUrl =  model + currency + detailWord + slash
const cvDetailUrl =  model + cv + detailWord + slash
const dayoffDetailUrl =  model + dayoff + detailWord + slash
const departmentDetailUrl =  model + department + detailWord + slash
const employeeDetailUrl =  model + employee + detailWord + slash
const expenseDetailUrl =  model + expense + detailWord + slash
const expensetypeDetailUrl =  model + expensetype + detailWord + slash
const roleDetailUrl =  model + role + detailWord + slash
const meetingDetailUrl =  model + meeting + detailWord + slash
const meetingplatformDetailUrl =  model + meetingplatform + detailWord + slash
const occupationDetailUrl =  model + occupation + detailWord + slash
const projectDetailUrl =  model + project + detailWord + slash
const socialActivityDetailUrl =  model + socialActivity + detailWord + slash
const socialActivityTypeDetailUrl =  model + socialActivityType + detailWord + slash
const taskDetailUrl =  model + task + detailWord + slash
const userDetailUrl =  model + user + detailWord + slash


// Add
const applicantAddUrl = model + applicant + addWord + slash
const applicantmeetingAddUrl =  model + applicantmeeting + addWord + slash
const branchAddUrl =  model + branch + addWord + slash
const contextAddUrl =  model + context + addWord + slash
const corporationAddUrl =  model + corporation + addWord + slash
const currencyAddUrl =  model + currency + addWord + slash
const cvAddUrl =  model + cv + addWord + slash
const dayoffAddUrl =  model + dayoff + addWord + slash
const departmentAddUrl =  model + department + addWord + slash
const employeeAddUrl =  model + employee + addWord + slash
const expenseAddUrl =  model + expense + addWord + slash
const expensetypeAddUrl =  model + expensetype + addWord + slash
const roleAddUrl =  model + role + addWord + slash
const meetingAddUrl =  model + meeting + addWord + slash
const meetingplatformAddUrl =  model + meetingplatform + addWord + slash
const occupationAddUrl =  model + occupation + addWord + slash
const projectAddUrl =  model + project + addWord + slash
const socialActivityAddUrl =  model + socialActivity + addWord + slash
const socialActivityTypeAddUrl =  model + socialActivityType + addWord + slash
const taskAddUrl =  model + task + addWord + slash
const userAddUrl =  model + user + addWord + slash

// Update
const employeeUpdateUrl = model + employee + updateWord + slash

export default {applicantListUrl, employeeListUrl, applicantmeetingListUrl, branchListUrl, contextListUrl, corporationListUrl, currencyListUrl, cvListUrl, dayoffListUrl, departmentListUrl, expenseListUrl, expensetypeListUrl, meetingListUrl, meetingplatformListUrl, occupationListUrl, projectListUrl, roleListUrl, socialActivityListUrl, socialActivityTypeListUrl, taskListUrl, userListUrl,
    applicantDetailUrl, applicantmeetingDetailUrl, branchDetailUrl, contextDetailUrl, corporationDetailUrl, currencyDetailUrl, cvDetailUrl, dayoffDetailUrl, departmentDetailUrl, employeeDetailUrl, expenseDetailUrl, expensetypeDetailUrl, roleDetailUrl, meetingDetailUrl, meetingplatformDetailUrl, occupationDetailUrl, projectDetailUrl, socialActivityDetailUrl, socialActivityTypeDetailUrl, taskDetailUrl, userDetailUrl,
    applicantAddUrl, applicantmeetingAddUrl, branchAddUrl, contextAddUrl, corporationAddUrl, currencyAddUrl, cvAddUrl, dayoffAddUrl, departmentAddUrl, employeeAddUrl, expenseAddUrl, expensetypeAddUrl, roleAddUrl, meetingAddUrl, meetingplatformAddUrl, occupationAddUrl, projectAddUrl, socialActivityAddUrl, socialActivityTypeAddUrl, taskAddUrl, userAddUrl,
    employeeUpdateUrl,
    register, login, auth, profile
}
