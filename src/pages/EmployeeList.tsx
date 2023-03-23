import React from 'react'
import { Table } from 'react-bootstrap';
import { useGetEmployeesQuery, useGetProductsQuery } from '../features/api/apiSlice';

function EmployeeList() {

    const { data : EmployeeListData} = useGetEmployeesQuery();
    const employeeList = EmployeeListData ?? [];

    console.log(employeeList)
    //console.log(useGetEmployeesQuery())

    return (
        <div>
            {/* {JSON.stringify(employeeList)} */}
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
                  { employeeList &&
                  employeeList?.data?.content?.map((emp:any) =>(
                     <tr>
                     <td>{emp.name}</td>
                     <td>{emp.surname}</td>
                     <td>{emp.phoneNumber}</td>
                     <td>Sex</td>
                     <td>Branch</td>
                     <td>Department</td>
                     <td>Occupation</td>
                 </tr>
                  ))}
                   

                </tbody>
            </Table>
        </div>
    );
}

export default EmployeeList;