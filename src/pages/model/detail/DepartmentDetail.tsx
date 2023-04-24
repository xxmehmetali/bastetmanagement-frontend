
import React from 'react'
import { Department } from '../../../models/base/Department';
import { DataResult } from '../../../results/DataResult';
import { useGetDepartmentByIdQuery } from '../../../features/api/departmentApi';
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { formatDate } from '../../../functions/FormatDateFunction';

export default function DepartmentDetail() {
  let { id } = useParams();

  const { data: departmentDataResultDataForDepartment, isLoading, error } = useGetDepartmentByIdQuery(id || "");
  const departmentDataResultForDepartment: DataResult<Department> = departmentDataResultDataForDepartment as DataResult<Department>;
  const department: Department = (departmentDataResultForDepartment?.data) as Department;

  if(error){
    return(
      <div>Error</div>
    )
  }
  return (
    <div>
      {department &&
        <Table striped className='detailTable'>
          <thead>
            <tr>
              <th>id</th>
              <th>{department.id}</th>
            </tr>
          </thead>
          <tbody>            
            <tr>
              <td>Created At</td>
              <td>{department.name}</td>
            </tr>            
            <tr>
              <td>Phone Number</td>
              <td>{department.description}</td>
            </tr>           
            <tr>
              <td>Created At</td>
              <td>{formatDate(department.createdAt)}</td>
            </tr>
            <tr>
              <td>Created At</td>
              <td>{formatDate(department.updatedAt)}</td>
            </tr>
          </tbody>
        </Table>}
    </div>
  );
}
    