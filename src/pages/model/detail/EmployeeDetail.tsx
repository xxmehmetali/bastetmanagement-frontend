
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useGetEmployeeByIdQuery } from '../../../features/api/employeeApi';
import { DataResult } from '../../../results/DataResult';
import { Employee } from '../../../models/base/Employee';
import { strict } from 'assert';
import { string } from 'yup';
import { Button, Table } from 'react-bootstrap';
import BranchTableComponent from '../../../components/tablecomponents/BranchTableComponent';
import DepartmentTableComponent from '../../../components/tablecomponents/DepartmentTableComponent';
import OccupationTableComponent from '../../../components/tablecomponents/OccupationTableComponent';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';

export default function EmployeeDetail() {
  let { id }  = useParams();

  const { data: employeeDataResultDataForEmployee, isLoading, error } = useGetEmployeeByIdQuery(id || "");
  const employeeDataResultForEmployee: DataResult<Employee> = employeeDataResultDataForEmployee as DataResult<Employee>;
  const employee: Employee = (employeeDataResultForEmployee?.data) as Employee;

  console.log(employee)

  const navigate = useNavigate();
  function handleNavigateToUpdate(id: string) {
    navigate(navigationUrlProvider.employeeUpdateUrl + id)
  }

  if (error) {
    return (
      <div>Error</div>
    )
  }

  return (
    <div>
      <Button onClick={() => { (handleNavigateToUpdate(id?.toString() || "")) }}>Update</Button>
      {employee &&
        <Table striped className='detailTable'>
          <thead>
            <tr>
              <th>id</th>
              <th>{employee.id}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{employee.name}</td>
            </tr>
            <tr>
              <td>Surname</td>
              <td>{employee.surname}</td>
            </tr>

            <tr>
              <td>Address</td>
              <td>{employee.address}</td>
            </tr>
            <tr>
              <td>Phone Number</td>
              <td>{employee.phoneNumber}</td>
            </tr>
            <tr>
              <td>National Id</td>
              <td>{employee.nationalId}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{employee.gender}</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <OccupationTableComponent occupation={employee.occupation} />
              </td>
            </tr>
            <tr>
              <td>Start Date</td>
              <td>{employee.startDate.toString().slice(0, 10)}</td>
            </tr>
            <tr>
              <td>End Date</td>
              <td>{employee.endDate.toString().slice(0, 10)}</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <BranchTableComponent branch={employee.branch} />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <DepartmentTableComponent department={employee.department} />
              </td>
            </tr>
          </tbody>
        </Table>}
    </div>
  );
}
