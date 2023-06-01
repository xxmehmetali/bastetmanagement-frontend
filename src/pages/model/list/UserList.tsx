import React from 'react'
import { Button, Table } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Pagination } from '../../../results/pagination/Pagination';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { User } from '../../../models/base/User';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import PaginationComponent from '../../../components/PaginationComponent';
import { useDeleteUserByIdMutation, useGetUserPagedSimplifiedQuery } from '../../../features/api/userApi';
import AddModelButtonComponent from '../../../components/AddModelButtonComponent';

export default function UserList() {

    //error varsa toastr ile uyarı göster
    //loading ise jsx içinde yükleniyor işareti göster
    //burada gelen veri simplified olmalı.
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page")

    const { data: pagedDataResultDataForApplicant, isLoading, error } = useGetUserPagedSimplifiedQuery(new Pagination(Number(page)));
    const pagedDataResultForEmployee: PagedDataResult = pagedDataResultDataForApplicant as PagedDataResult;
    console.log(pagedDataResultForEmployee)
    const applicants: User[] = (pagedDataResultForEmployee?.data?.content) as User[];

    const totalPages = pagedDataResultForEmployee?.data?.totalPages || 1;
    const [deleteUser, { data }] = useDeleteUserByIdMutation();

    async function handleDelete(id: any) {
      const result = await deleteUser(id);
      //ResolveResult(result)
    }

    const navigate = useNavigate();
    function handleNavigateToDetail(id: string) {
        navigate(navigationUrlProvider.employeeDetailUrl + id)
    }
    function handleNavigateToUpdate(id: string) {
      navigate(navigationUrlProvider.userUpdateUrl + id)
    }


    //USER APİ BACKEND TARAFINDA YOK, BACKEND YAZ
  return (
    <div>
      <AddModelButtonComponent buttonName={"Add User"} redirectionUrl={navigationUrlProvider.userAddUrl}/>
      <Table striped className='listTable'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Phone Number</th>
            <th>Sex</th>
            <th>HR Assessment Status</th>
            <th>Technical Assessment Status</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>

          {applicants &&
            applicants.map((user: User) => (
              <tr onClick={() => { (handleNavigateToDetail(user.id)) }}>
                <td>{user.email}</td>
                <td>
                  
                  <Button variant="warning" onClick={() => {handleNavigateToUpdate(user.id) }}>Update</Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => {handleDelete(user.id)}}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}

        </tbody>
      </Table>

      <PaginationComponent totalPages={totalPages} currentPage={page}/>
    </div>
  );
}
