import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDeleteDepartmentsByIdMutation, useGetDepartmentsPagedSimplifiedQuery } from '../../../features/api/departmentApi';
import { Pagination } from '../../../results/pagination/Pagination';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { Department } from '../../../models/base/Department';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { Button, Table } from 'react-bootstrap';
import PaginationComponent from '../../../components/PaginationComponent';
import AddModelButtonComponent from '../../../components/AddModelButtonComponent';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';

export default function DepartmentList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page")

  const { data: pagedDataResultDataForDepartment, isLoading, error, isSuccess } = useGetDepartmentsPagedSimplifiedQuery(new Pagination(Number(page)));
  const pagedDataResultForDepartment: PagedDataResult = pagedDataResultDataForDepartment as PagedDataResult;
  const departments: Department[] = (pagedDataResultForDepartment?.data?.content) as Department[];

  const totalPages = pagedDataResultForDepartment?.data?.totalPages || 1;

  if(isSuccess)
    ResolveResult(pagedDataResultForDepartment)

  const [deleteDepartment, { data }] = useDeleteDepartmentsByIdMutation();

  async function handleDelete(id: any) {
    const result = await deleteDepartment(id);
    //ResolveResult(result)
  }
  const navigate = useNavigate();
  function handleNavigateToDetail(id: string) {
    navigate(navigationUrlProvider.departmentDetailUrl + id)
  }
  function handleNavigateToUpdate(id: string) {
    navigate(navigationUrlProvider.departmentUpdateUrl + id)
  }
  return (
    <div>
      <AddModelButtonComponent buttonName={"Add Department"} redirectionUrl={navigationUrlProvider.departmentAddUrl}/>
      <Table striped className='listTable'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {departments &&
            departments.map((dprt: Department) => (
              <tr >
                <td onClick={() => { (handleNavigateToDetail(dprt.id)) }}>{dprt.name}</td>
                <td onClick={() => { (handleNavigateToDetail(dprt.id)) }}>{dprt.description}</td>
                <td>
                  <Button variant="warning" onClick={() => {handleNavigateToUpdate(dprt.id) }}>Update</Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => {handleDelete(dprt.id)}}>
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
