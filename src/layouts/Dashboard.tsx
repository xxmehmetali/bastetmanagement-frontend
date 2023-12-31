import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import navigationUrlProvider from '../providers/navigationUrlProvider';

import Menu from '../layouts/Menu';
import ApplicantDetail from '../pages/model/detail/ApplicantDetail';
import BranchDetail from '../pages/model/detail/BranchDetail';
import ContextDetail from '../pages/model/detail/ContextDetail';
import CorporationDetail from '../pages/model/detail/CorporationDetail';
import CurrencyDetail from '../pages/model/detail/CurrencyDetail';
import CvDetail from '../pages/model/detail/CvDetail';
import DayoffDetail from '../pages/model/detail/DayoffDetail';
import EmployeeDetail from '../pages/model/detail/EmployeeDetail';
import ExpenseDetail from '../pages/model/detail/ExpenseDetail';
import MeetingDetail from '../pages/model/detail/MeetingDetail';
import MeetingPlatformDetail from '../pages/model/detail/MeetingPlatformDetail';
import OccupationDetail from '../pages/model/detail/OccupationDetail';
import ProjectDetail from '../pages/model/detail/ProjectDetail';
import SocialActivityDetail from '../pages/model/detail/SocialActivityDetail';
import TaskDetail from '../pages/model/detail/TaskDetail';
import ApplicantList from '../pages/model/list/ApplicantList';
import BranchList from '../pages/model/list/BranchList';
import ContextList from '../pages/model/list/ContextList';
import CorporationList from '../pages/model/list/CorporationList';
import CurrencyList from '../pages/model/list/CurrencyList';
import CvList from '../pages/model/list/CvList';
import DayoffList from '../pages/model/list/DayoffList';
import EmployeeList from '../pages/model/list/EmployeeList';
import ExpenseList from '../pages/model/list/ExpenseList';
import MeetingList from '../pages/model/list/MeetingList';
import MeetingPlatformList from '../pages/model/list/MeetingPlatformList';
import OccupationList from '../pages/model/list/OccupationList';
import ProjectList from '../pages/model/list/ProjectList';
import RoleList from '../pages/model/list/RoleList';
import SocialActivityList from '../pages/model/list/SocialActivityList';
import SocialActivityTypeList from '../pages/model/list/SocialActivityTypeList';

import TaskList from '../pages/model/list/TaskList';
import UserList from '../pages/model/list/UserList';
import ApplicantMeetingList from '../pages/model/list/ApplicantMeetingList';
import DepartmentDetail from '../pages/model/detail/DepartmentDetail';
import DepartmentList from '../pages/model/list/DepartmentList';
import ApplicantMeetingDetail from '../pages/model/detail/ApplicantMeetingDetail';
import SocialActivityTypeDetail from '../pages/model/detail/SocialActivityTypeDetail';
import ExpenseTypeDetail from '../pages/model/detail/ExpenseTypeDetail';
import ExpenseTypeList from '../pages/model/list/ExpenseTypeList';
import EmployeeAdd from '../pages/model/add/EmployeeAdd';
import ApplicantAdd from '../pages/model/add/ApplicantAdd';
import ApplicantMeetingAdd from '../pages/model/add/ApplicantMeetingAdd';
import BranchAdd from '../pages/model/add/BranchAdd';
import ContextAdd from '../pages/model/add/ContextAdd';
import CorporationAdd from '../pages/model/add/CorporationAdd';
import CurrencyAdd from '../pages/model/add/CurrencyAdd';
import CvAdd from '../pages/model/add/CvAdd';
import DayoffAdd from '../pages/model/add/DayoffAdd';
import DepartmentAdd from '../pages/model/add/DepartmentAdd';
import ExpenseAdd from '../pages/model/add/ExpenseAdd';
import ExpenseTypeAdd from '../pages/model/add/ExpenseTypeAdd';
import MeetingAdd from '../pages/model/add/MeetingAdd';
import MeetingPlatformAdd from '../pages/model/add/MeetingPlatformAdd';
import OccupationAdd from '../pages/model/add/OccupationAdd';
import ProjectAdd from '../pages/model/add/ProjectAdd';
import SocialActivityAdd from '../pages/model/add/SocialActivityAdd';
import SocialActivityTypeAdd from '../pages/model/add/SocialActivityTypeAdd';
import TaskAdd from '../pages/model/add/TaskAdd';
import Auth from '../pages/model/auth/Auth';
import Register from '../pages/model/auth/Register';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Login from '../pages/model/auth/Login';
import Profile from '../pages/profile/Profile';
import EmployeeUpdate from '../pages/model/update/EmployeeUpdate';
import ApplicantUpdate from '../pages/model/update/ApplicantUpdate';
import ApplicantMeetingUpdate from '../pages/model/update/ApplicantMeetingUpdate';
import BranchUpdate from '../pages/model/update/BranchUpdate';
import ContextUpdate from '../pages/model/update/Context.update';
import CorporationUpdate from '../pages/model/update/CorporationUpdate';
import CurrencyUpdate from '../pages/model/update/CurrencyUpdate';
import DayoffUpdate from '../pages/model/update/DayoffUpdate';
import DepartmentUpdate from '../pages/model/update/DepartmentUpdate';
import ExpenseUpdate from '../pages/model/update/ExpenseUpdate';
import ExpenseTypeUpdate from '../pages/model/update/ExpenseTypeUpdate';
import MeetingUpdate from '../pages/model/update/MeetingUpdate';
import MeetingPlatformUpdate from '../pages/model/update/MeetingPlatformUpdate';
import OccupationUpdate from '../pages/model/update/OccupationUpdate';
import ProjectUpdate from '../pages/model/update/ProjectUpdate';
import SocialActivityUpdate from '../pages/model/update/SocialActivityUpdate';
import SocialActivityTypeUpdate from '../pages/model/update/SocialActivityTypeUpdate';
import TaskUpdate from '../pages/model/update/TaskUpdate';
import PageNotFound from '../pages/PageNotFound';

export default function Dashboard() {
    const { isUserLoggedIn } = useSelector((state: RootState) => state.userSlice);
    return (
        <div>
            <ToastContainer position="bottom-right" />
            {(() => {
                if (isUserLoggedIn) {
                    // if (true) {
                    return (
                        <Container>
                            <Row>
                                <Col md="2">
                                    <Menu />
                                </Col>
                                <Col md="10">
                                    <Routes>
                                        {/* LIST */}
                                        <Route path={navigationUrlProvider.applicantListUrl} element={<ApplicantList />} />
                                        <Route path={navigationUrlProvider.applicantmeetingListUrl} element={<ApplicantMeetingList />} />
                                        <Route path={navigationUrlProvider.employeeListUrl} element={<EmployeeList />} />
                                        <Route path={navigationUrlProvider.branchListUrl} element={<BranchList />} />
                                        <Route path={navigationUrlProvider.corporationListUrl} element={<CorporationList />} />
                                        <Route path={navigationUrlProvider.currencyListUrl} element={<CurrencyList />} />
                                        <Route path={navigationUrlProvider.cvListUrl} element={<CvList />} />
                                        <Route path={navigationUrlProvider.dayoffListUrl} element={<DayoffList />} />
                                        <Route path={navigationUrlProvider.departmentListUrl} element={<DepartmentList />} />
                                        <Route path={navigationUrlProvider.expenseListUrl} element={<ExpenseList />} />
                                        <Route path={navigationUrlProvider.expensetypeListUrl} element={<ExpenseTypeList />} />
                                        <Route path={navigationUrlProvider.meetingListUrl} element={<MeetingList />} />
                                        <Route path={navigationUrlProvider.meetingplatformListUrl} element={<MeetingPlatformList />} />
                                        <Route path={navigationUrlProvider.occupationListUrl} element={<OccupationList />} />
                                        <Route path={navigationUrlProvider.projectListUrl} element={<ProjectList />} />
                                        <Route path={navigationUrlProvider.roleListUrl} element={<RoleList />} />
                                        <Route path={navigationUrlProvider.socialActivityListUrl} element={<SocialActivityList />} />
                                        <Route path={navigationUrlProvider.socialActivityTypeListUrl} element={<SocialActivityTypeList />} />
                                        <Route path={navigationUrlProvider.taskListUrl} element={<TaskList />} />
                                        <Route path={navigationUrlProvider.userListUrl} element={<UserList />} />

                                        {/* DETAIL */}
                                        <Route path={navigationUrlProvider.employeeDetailUrl + ":id"} element={<EmployeeDetail />} />
                                        <Route path={navigationUrlProvider.applicantDetailUrl + ":id"} element={<ApplicantDetail />} />
                                        <Route path={navigationUrlProvider.applicantmeetingDetailUrl + ":id"} element={<ApplicantMeetingDetail />} />
                                        <Route path={navigationUrlProvider.branchDetailUrl + ":id"} element={<BranchDetail />} />
                                        <Route path={navigationUrlProvider.contextDetailUrl + ":id"} element={<ContextDetail />} />
                                        <Route path={navigationUrlProvider.corporationDetailUrl + ":id"} element={<CorporationDetail />} />
                                        <Route path={navigationUrlProvider.currencyDetailUrl + ":id"} element={<CurrencyDetail />} />
                                        <Route path={navigationUrlProvider.cvDetailUrl + ":id"} element={<CvDetail />} />
                                        <Route path={navigationUrlProvider.dayoffDetailUrl + ":id"} element={<DayoffDetail />} />
                                        <Route path={navigationUrlProvider.departmentDetailUrl + ":id"} element={<DepartmentDetail />} />
                                        <Route path={navigationUrlProvider.expenseDetailUrl + ":id"} element={<ExpenseDetail />} />
                                        <Route path={navigationUrlProvider.expensetypeDetailUrl + ":id"} element={<ExpenseTypeDetail />} />
                                        <Route path={navigationUrlProvider.meetingDetailUrl + ":id"} element={<MeetingDetail />} />
                                        <Route path={navigationUrlProvider.meetingplatformDetailUrl + ":id"} element={<MeetingPlatformDetail />} />
                                        <Route path={navigationUrlProvider.occupationDetailUrl + ":id"} element={<OccupationDetail />} />
                                        <Route path={navigationUrlProvider.projectDetailUrl + ":id"} element={<ProjectDetail />} />
                                        {/* <Route path='/model/roleDetail/:id' element={<Role/>} /> */}
                                        <Route path={navigationUrlProvider.socialActivityDetailUrl + ":id"} element={<SocialActivityDetail />} />
                                        <Route path={navigationUrlProvider.socialActivityTypeDetailUrl + ":id"} element={<SocialActivityTypeDetail />} />
                                        <Route path={navigationUrlProvider.taskDetailUrl + ":id"} element={<TaskDetail />} />
                                        {/* <Route path='/model/userDetail/:id' element={<UserDet />} /> */}

                                        {/* ADD */}
                                        <Route path={navigationUrlProvider.employeeAddUrl} element={<EmployeeAdd />} />
                                        <Route path={navigationUrlProvider.applicantAddUrl} element={<ApplicantAdd />} />
                                        <Route path={navigationUrlProvider.applicantmeetingAddUrl} element={<ApplicantMeetingAdd />} />
                                        <Route path={navigationUrlProvider.branchAddUrl} element={<BranchAdd />} />
                                        <Route path={navigationUrlProvider.contextAddUrl} element={<ContextAdd />} />
                                        <Route path={navigationUrlProvider.corporationAddUrl} element={<CorporationAdd />} />
                                        <Route path={navigationUrlProvider.currencyAddUrl} element={<CurrencyAdd />} />
                                        <Route path={navigationUrlProvider.cvAddUrl} element={<CvAdd />} />
                                        <Route path={navigationUrlProvider.dayoffAddUrl} element={<DayoffAdd />} />
                                        <Route path={navigationUrlProvider.departmentAddUrl} element={<DepartmentAdd />} />
                                        <Route path={navigationUrlProvider.expenseAddUrl} element={<ExpenseAdd />} />
                                        <Route path={navigationUrlProvider.expensetypeAddUrl} element={<ExpenseTypeAdd />} />
                                        <Route path={navigationUrlProvider.meetingAddUrl} element={<MeetingAdd />} />
                                        <Route path={navigationUrlProvider.meetingplatformAddUrl} element={<MeetingPlatformAdd />} />
                                        <Route path={navigationUrlProvider.occupationAddUrl} element={<OccupationAdd />} />
                                        <Route path={navigationUrlProvider.projectAddUrl} element={<ProjectAdd />} />
                                        {/* <Route path='/model/roleAdd/:id' element={<Role/>} /> */}
                                        <Route path={navigationUrlProvider.socialActivityAddUrl} element={<SocialActivityAdd />} />
                                        <Route path={navigationUrlProvider.socialActivityTypeAddUrl} element={<SocialActivityTypeAdd />} />
                                        <Route path={navigationUrlProvider.taskAddUrl} element={<TaskAdd />} />
                                        {/* <Route path='/model/userAdd/:id' element={<UserDet />} /> */}


                                        {/* UPDATE */}
                                        {/* <Route path={navigationUrlProvider.employeeUpdateUrl + ":id"} element={<EmployeeUpdate />} /> */}

                                        <Route path={navigationUrlProvider.applicantUpdateUrl + ":id"} element={<ApplicantUpdate />} />
                                        <Route path={navigationUrlProvider.applicatMeetingUpdateUrl + ":id"} element={<ApplicantMeetingUpdate />} />
                                        <Route path={navigationUrlProvider.branchUpdateUrl + ":id"} element={<BranchUpdate />} />
                                        <Route path={navigationUrlProvider.contextUpdateUrl + ":id"} element={<ContextUpdate />} />
                                        <Route path={navigationUrlProvider.coporationUpdateUrl + ":id"} element={<CorporationUpdate />} />
                                        <Route path={navigationUrlProvider.currencyUpdateUrl + ":id"} element={<CurrencyUpdate />} />
                                        <Route path={navigationUrlProvider.cvUpdateUrl + ":id"} element={<CvDetail />} />
                                        <Route path={navigationUrlProvider.dayoffUpdateUrl + ":id"} element={<DayoffUpdate />} />
                                        <Route path={navigationUrlProvider.departmentUpdateUrl + ":id"} element={<DepartmentUpdate />} />
                                        <Route path={navigationUrlProvider.expenseUpdateUrl + ":id"} element={<ExpenseUpdate />} />
                                        <Route path={navigationUrlProvider.expenseTypeUpdateUrl + ":id"} element={<ExpenseTypeUpdate />} />
                                        <Route path={navigationUrlProvider.meetingUpdateUrl + ":id"} element={<MeetingUpdate />} />
                                        <Route path={navigationUrlProvider.meetingPlatformUpdateUrl + ":id"} element={<MeetingPlatformUpdate />} />
                                        <Route path={navigationUrlProvider.occupationUpdateUrl + ":id"} element={<OccupationUpdate />} />
                                        <Route path={navigationUrlProvider.projectUpdateUrl + ":id"} element={<ProjectUpdate />} />
                                        {/* <Route path='/model/roleDetail/:id' element={<Role/>} /> */}
                                        <Route path={navigationUrlProvider.socialActivityUpdateUrl + ":id"} element={<SocialActivityUpdate />} />
                                        <Route path={navigationUrlProvider.socialActivityTypeUpdateUrl + ":id"} element={<SocialActivityTypeUpdate />} />
                                        <Route path={navigationUrlProvider.taskUpdateUrl + ":id"} element={<TaskUpdate />} />
                                        {/* <Route path='/model/userDetail/:id' element={<UserDet />} /> */}

                                        {/* PERSONAL */}
                                        <Route path={navigationUrlProvider.profile} element={<Profile />} />

                                    </Routes>
                                </Col>
                            </Row>
                        </Container>
                    )
                } else {
                    return (
                        <Container>
                            <Row>
                                <Col md="12">
                                    <Routes>
                                        <Route path='/' element={<Navigate to={navigationUrlProvider.auth} replace />} />
                                        <Route path={navigationUrlProvider.auth} element={<Auth />} />
                                        <Route path={navigationUrlProvider.login} element={<Login />} />
                                        <Route path={navigationUrlProvider.register} element={<Register />} />
                                        <Route path={navigationUrlProvider.employeeUpdateUrl + ":id"} element={<EmployeeUpdate />} />
                                    </Routes>
                                </Col>
                            </Row>
                        </Container>
                    )
                }
            })()}


            <Routes>
                {/* <Route path="*" element={<PageNotFound />} /> */}
            </Routes>
        </div>
    )
}
