import React from 'react'
import { Table } from 'react-bootstrap';
import { useGetEmployeesQuery } from '../features/api/apiSlice';
import { Employee } from '../models/base/Employee';
import { PagedDataResult } from '../results/PagedDataResult';

function EmployeeList() {

    //error varsa toastr ile uyarı göster
    //loading ise jsx içinde yükleniyor işareti göster
    //burada gelen veri simplified olmalı.
    const { data : pagedDataResultDataForEmployee, isLoading, error } = useGetEmployeesQuery()
    const pagedDataResultForEmployee  : PagedDataResult = pagedDataResultDataForEmployee as PagedDataResult;
    const employees : Employee[]= (pagedDataResultForEmployee?.data?.content) as Employee[];
    console.log(pagedDataResultForEmployee?.data?.content);

    return (
        <div>
            <Table striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Phone Number</th>
                        <th>Sex</th>
                        <th>Branch</th>
                        <th>Department</th>
                        <th>Occupation</th>
                    </tr>
                </thead>
                <tbody>
                  { employees &&
                  employees.map((emp:Employee ) =>(
                     <tr>
                     <td>{emp.name}</td>
                     <td>{emp.surname}</td>
                     <td>{emp.phoneNumber}</td>
                     <td>{emp.gender}</td>
                     <td>{emp.branch.name}</td>
                     <td>{emp.department.name}</td>
                     <td>{emp.occupation.occupation}</td>
                 </tr>
                  ))} 
                </tbody>
            </Table>
        </div>
    );
}

export default EmployeeList;