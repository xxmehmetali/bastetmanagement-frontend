import React from 'react'
import { Card, ListGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import apiUrlProvider from "../features/api/config/apiUrlProvider";
import navigationUrlProvider from '../providers/navigationUrlProvider';

export default function Menu() {

  return (

    <Card style={{ width: '12rem', margin: '0 auto', position: "relative", left: "-50px" }}>
      <Card.Header style={{ background: "#ededed", fontWeight: 700 }}>Accesible Menus</Card.Header>
      <ListGroup variant="flush" className='accessible-menu'>
        <ListGroup.Item as={NavLink} to={navigationUrlProvider.applicantListUrl}>Applicants</ListGroup.Item>

        <ListGroup.Item as={NavLink} to={navigationUrlProvider.applicantmeetingListUrl}>Applicant Meetings</ListGroup.Item>

        <ListGroup.Item as={NavLink} to={navigationUrlProvider.branchListUrl}>Branches</ListGroup.Item>

        <ListGroup.Item as={NavLink} to={navigationUrlProvider.contextListUrl}>Contexts</ListGroup.Item>

        <ListGroup.Item as={NavLink} to={navigationUrlProvider.corporationListUrl}>Corporations</ListGroup.Item>

        <ListGroup.Item as={NavLink} to={navigationUrlProvider.currencyListUrl}>Currencies</ListGroup.Item>

        <ListGroup.Item as={NavLink} to={navigationUrlProvider.cvListUrl}>Cvs</ListGroup.Item>

        <ListGroup.Item as={NavLink} to={navigationUrlProvider.dayoffListUrl}>Dayoffs</ListGroup.Item>

        <ListGroup.Item as={NavLink} to={navigationUrlProvider.departmentListUrl}>Departments</ListGroup.Item>

        <ListGroup.Item as={NavLink} to={navigationUrlProvider.employeeListUrl}>Employees</ListGroup.Item>

        <ListGroup.Item as={NavLink} to={navigationUrlProvider.expenseListUrl}>Expenses</ListGroup.Item>

        <ListGroup.Item as={NavLink} to={navigationUrlProvider.expensetypeListUrl}>ExpenseTypes</ListGroup.Item>

        <ListGroup.Item as={NavLink} to={navigationUrlProvider.meetingListUrl}>Meetings</ListGroup.Item>

        <ListGroup.Item as={NavLink} to={navigationUrlProvider.meetingplatformListUrl}>Meeting Platforms</ListGroup.Item>

        <ListGroup.Item as={NavLink} to={navigationUrlProvider.occupationListUrl}>Occupations</ListGroup.Item>

        <ListGroup.Item as={NavLink} to={navigationUrlProvider.projectListUrl}>Projects</ListGroup.Item>

        <ListGroup.Item as={NavLink} to={navigationUrlProvider.roleListUrl}>Roles</ListGroup.Item>

        <ListGroup.Item as={NavLink} to={navigationUrlProvider.roleListUrl}>Role Enums</ListGroup.Item>

        <ListGroup.Item as={NavLink} to={navigationUrlProvider.socialActivityListUrl}>Social Activities</ListGroup.Item>

        <ListGroup.Item as={NavLink} to={navigationUrlProvider.socialActivityTypeListUrl}>Social Activity Types</ListGroup.Item>

        <ListGroup.Item as={NavLink} to={navigationUrlProvider.taskListUrl}>Tasks</ListGroup.Item>

        <ListGroup.Item as={NavLink} to={navigationUrlProvider.userListUrl}>Users</ListGroup.Item>


      </ListGroup>
    </Card>
  )
}
