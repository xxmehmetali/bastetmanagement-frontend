import React from 'react'
import { Table } from 'react-bootstrap';
import { useGetEmployeesQuery, useGetProductsQuery } from '../features/api/apiSlice';

// export default function EmployeeList() {

//     const { data : EmployeeListData} = useGetEmployeesQuery();
//     const employeeList = EmployeeListData ?? [];

//     console.log(employeeList)
//     console.log(useGetEmployeesQuery())
//     //burası cors a takılıyor backend de corsu kaldır

//     render() {
//     return (
//         <div>
//             // {JSON.stringify(employeeList)}
//             <Table striped>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Surname</th>
//                         <th>Phone Number</th>
//                         <th>Sex</th>
//                         <th>Branch</th>
//                         <th>Department</th>
//                         <th>Occupation</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>Name</td>
//                         <td>Surname</td>
//                         <td>Phone Number</td>
//                         <td>Sex</td>
//                         <td>Branch</td>
//                         <td>Department</td>
//                         <td>Occupation</td>
//                     </tr>

//                     <tr>
//                         <td>Name</td>
//                         <td>Surname</td>
//                         <td>Phone Number</td>
//                         <td>Sex</td>
//                         <td>Branch</td>
//                         <td>Department</td>
//                         <td>Occupation</td>
//                     </tr>

//                     <tr>
//                         <td>Name</td>
//                         <td>Surname</td>
//                         <td>Phone Number</td>
//                         <td>Sex</td>
//                         <td>Branch</td>
//                         <td>Department</td>
//                         <td>Occupation</td>
//                     </tr>

//                     <tr>
//                         <td>Name</td>
//                         <td>Surname</td>
//                         <td>Phone Number</td>
//                         <td>Sex</td>
//                         <td>Branch</td>
//                         <td>Department</td>
//                         <td>Occupation</td>
//                     </tr>
//                 </tbody>
//             </Table>
//         </div>
//     );
// }}


export default class FirstComponent extends React.Component <{}> {
    render() {
      return (
        <div>
          <h3>A Simple React Component Example with Typescript</h3>
          <div>
            <img height="250" src={Logo} /> 
          </div>
          <p>This component shows the Logrocket logo.</p>
          <p>For more info on Logrocket, please visit https://logrocket.com </p>
        </div>
      );
    }
  }