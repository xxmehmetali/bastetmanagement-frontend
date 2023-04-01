import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Menu from '../layouts/Menu';
import EmployeeDetail from '../pages/model/detail/EmployeeDetail';
import SocialActivityDetail from '../pages/model/detail/SocialActivityDetail';
import ApplicantList from '../pages/model/list/ApplicantList';
import BranchList from '../pages/model/list/BranchList';
import ContextList from '../pages/model/list/ContextList';
import CorporationList from '../pages/model/list/CorporationList';
import CurrencyList from '../pages/model/list/CurrencyList';
import CvList from '../pages/model/list/CvList';
import DayoffList from '../pages/model/list/DayoffList';
import EmployeeList from '../pages/model/list/EmployeeList';
import ExpenseList from '../pages/model/list/ExpenseList';
import Login from '../pages/model/list/Login';
import MeetingList from '../pages/model/list/MeetingList';
import MeetingPlatformList from '../pages/model/list/MeetingPlatformList';
import OccupationList from '../pages/model/list/OccupationList';
import ProjectList from '../pages/model/list/ProjectList';
import RoleList from '../pages/model/list/RoleList';
import SocialActivityList from '../pages/model/list/SocialActivityList';
import TaskList from '../pages/model/list/TaskList';
import UserList from '../pages/model/list/UserList';

export default function Dashboard() {
    return (
        <div>
            <ToastContainer position="bottom-right" />
            DASHBOARD

            {/* burda eğer login olmadıysa menuyu göster  */}
            {/* <Menu /> */}


            {/* LOGİN OLDUYSA AŞAĞIYI GÖSTER */}

            {(() => {
                if (true) {
                    return (
                        <Container>
                            <Row>
                                <Col md="3">
                                    <Login />
                                </Col>
                                <Col md="9">
                                    <Routes>
                                        {/* KALDIRILACAK ALTTAKİ */}
                                        <Route path='/' element={<EmployeeList />} />



                                        <Route path='/model/employee' element={<EmployeeList />} />
                                        <Route path='/model/applicant' element={<ApplicantList />} />
                                        <Route path='/model/branch' element={<BranchList/> } />
                                        <Route path='/model/context' element={<ContextList />} />
                                        <Route path='/model/corporation' element={<CorporationList />} />
                                        <Route path='/model/currency' element={<CurrencyList />} />
                                        <Route path='/model/cv' element={<CvList />} />
                                        <Route path='/model/dayoff' element={<DayoffList />} />
                                        <Route path='/model/expense' element={<ExpenseList />} />
                                        <Route path='/model/meeting' element={<MeetingList />} />
                                        <Route path='/model/meetingPlatform' element={<MeetingPlatformList />} />
                                        <Route path='/model/occupation' element={<OccupationList />} />
                                        <Route path='/model/project' element={<ProjectList />} />
                                        <Route path='/model/role' element={<RoleList />} />
                                        <Route path='/model/socialActivity' element={<SocialActivityList />} />
                                        <Route path='/model/task' element={<TaskList />} />
                                        <Route path='/model/user' element={<UserList />} />


                                        <Route path='/model/employeeDetail/:id' element={<EmployeeDetail />} />
                                    </Routes>
                                </Col>
                            </Row>
                        </Container>
                    )
                } else {
                    return (
                        ""
                    )
                }
            })()}

            <Container>
                <Row>
                    <Col md="3">
                        <Menu />
                    </Col>
                    <Col md="9">
                        <Routes>
                            {/* <Route path='/' element={<ProductList />} />
                            <Route path='/products' element={<ProductList />} />
                            <Route path='/products/:productId' element={<ProductDetail />} />
                            <Route path='/cart' element={<CartDetail />} /> */}
                        </Routes>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}
