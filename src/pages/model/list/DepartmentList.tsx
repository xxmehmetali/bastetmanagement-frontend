import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetDepartmentsPagedSimplifiedQuery } from '../../../features/api/departmentApi';
import { Pagination } from '../../../results/pagination/Pagination';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { Department } from '../../../models/base/Department';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { Table } from 'react-bootstrap';
import PaginationComponent from '../../../components/PaginationComponent';

export default function DepartmentList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page")

  const { data: pagedDataResultDataForDepartment, isLoading, error } = useGetDepartmentsPagedSimplifiedQuery(new Pagination(Number(page)));
  const pagedDataResultForDepartment: PagedDataResult = pagedDataResultDataForDepartment as PagedDataResult;
  const departments: Department[] = (pagedDataResultForDepartment?.data?.content) as Department[];

  const totalPages = pagedDataResultForDepartment?.data?.totalPages || 1;
  const navigate = useNavigate();
  function handleNavigateToDetail(id: string) {
    navigate(navigationUrlProvider.departmentDetailUrl + id)
  }

  return (
    <div>
      <Table striped className='listTable'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {departments &&
            departments.map((dprt: Department) => (
              <tr onClick={() => { (handleNavigateToDetail(dprt.id)) }}>
                <td>{dprt.name}</td>
                <td>{dprt.description}</td>
              </tr>
            ))}

        </tbody>
      </Table>

      <PaginationComponent totalPages={totalPages} currentPage={page} />
    </div>
  );
}
