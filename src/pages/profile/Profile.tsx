import React from "react";
import { useGetCurrentUserProfileQuery } from "../../features/api/userApi";
import { DataResult } from "../../results/DataResult";
import { User } from "../../models/base/User";
import { Table } from "react-bootstrap";
import { Employee } from "../../models/base/Employee";
import OccupationTableComponent from "../../components/tablecomponents/OccupationTableComponent";
import BranchTableComponent from "../../components/tablecomponents/BranchTableComponent";
import DepartmentTableComponent from "../../components/tablecomponents/DepartmentTableComponent";


export default function Profile() {
  const { data: userData, isLoading, error } = useGetCurrentUserProfileQuery();
  const userDataResult: DataResult<User> = userData as DataResult<User>;
  const user: User = userDataResult?.data as User;
  const employee: Employee = user?.employee as Employee;

  if (userDataResult?.success == false) {
    return (
      <div
        className="mt-5"
        style={{
          border: "1px solid black",
          borderRadius: "1em",
          height: "30vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h1 style={{ alignSelf: "center" }}>
          Unauthorized Request! Please Contact your Manager!
        </h1>
      </div>
    );
  }

  return (
    <div
      className="mt-3"
      style={{ border: "1px solid black", borderRadius: "1em", padding: "2em" }}
    >
      <h1>My Profile</h1>
      {employee && user && (
        <Table striped className="detailTable">
          <thead>
            <tr>
              <th>id</th>
              <th>{employee.id}</th>
            </tr>
          </thead>
          <tbody>
          <tr>
              <td>User Name</td>
              <td>{user.username}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{user.email}</td>
            </tr>
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
              <td>Salary Amount</td>
              <td>{employee.salaryAmount}</td>
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
        </Table>
      )}
    </div>
  );
}
