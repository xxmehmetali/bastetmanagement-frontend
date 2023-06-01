import React from "react";
import { Button, Table } from "react-bootstrap";
import {
  useDeleteEmployeesByIdMutation,
  useGetEmployeesPagedSimplifiedQuery,
} from "../../../features/api/employeeApi";
import { Employee } from "../../../models/base/Employee";
import { PagedDataResult } from "../../../results/PagedDataResult";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Pagination } from "../../../results/pagination/Pagination";
import PaginationBootstrap from "react-bootstrap/Pagination";
import PaginationComponent from "../../../components/PaginationComponent";
import navigationUrlProvider from "../../../providers/navigationUrlProvider";
import AddModelButtonComponent from "../../../components/AddModelButtonComponent";

function EmployeeList() {
  //error varsa toastr ile uyarı göster
  //loading ise jsx içinde yükleniyor işareti göster
  //burada gelen veri simplified olmalı.
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");

  const {
    data: pagedDataResultDataForEmployee,
    isLoading,
    error,
  } = useGetEmployeesPagedSimplifiedQuery(new Pagination(Number(page)));
  const pagedDataResultForEmployee: PagedDataResult =
    pagedDataResultDataForEmployee as PagedDataResult;
  console.log(pagedDataResultForEmployee);
  const employees: Employee[] = pagedDataResultForEmployee?.data
    ?.content as Employee[];

  const totalPages = pagedDataResultForEmployee?.data?.totalPages || 1;
  const [deleteEmployee, { data }] = useDeleteEmployeesByIdMutation();

  async function handleDelete(id: any) {
    const result = await deleteEmployee(id);
    //ResolveResult(result)
  }

  const navigate = useNavigate();
  function handleNavigateToDetail(id: string) {
    navigate(navigationUrlProvider.employeeDetailUrl + id);
  }
  function handleNavigateToUpdate(id: string) {
    navigate(navigationUrlProvider.employeeUpdateUrl + id)
  }

  return (
    <div>
      <AddModelButtonComponent
        buttonName={"Add Employee"}
        redirectionUrl={navigationUrlProvider.employeeAddUrl}
      />
      <Table striped className="listTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Phone Number</th>
            <th>Sex</th>
            <th>Branch</th>
            <th>Department</th>
            <th>Occupation</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {employees &&
            employees.map((emp: Employee) => (
              <tr>
                <td
                  onClick={() => {
                    handleNavigateToDetail(emp.id);
                  }}
                >
                  {emp.name}
                </td>
                <td
                  onClick={() => {
                    handleNavigateToDetail(emp.id);
                  }}
                >
                  {emp.surname}
                </td>
                <td
                  onClick={() => {
                    handleNavigateToDetail(emp.id);
                  }}
                >
                  {emp.phoneNumber}
                </td>
                <td
                  onClick={() => {
                    handleNavigateToDetail(emp.id);
                  }}
                >
                  {emp.gender}
                </td>
                <td
                  onClick={() => {
                    handleNavigateToDetail(emp.id);
                  }}
                >
                  {emp.branch.name}
                </td>
                <td
                  onClick={() => {
                    handleNavigateToDetail(emp.id);
                  }}
                >
                  {emp.department.name}
                </td>
                <td
                  onClick={() => {
                    handleNavigateToDetail(emp.id);
                  }}
                >
                  {emp.occupation.occupation}
                </td>
                <td>
                  <Button variant="warning" onClick={() => {handleNavigateToUpdate(emp.id) }}>Update</Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      handleDelete(emp.id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <PaginationComponent totalPages={totalPages} currentPage={page} />
    </div>
  );
}

export default EmployeeList;
