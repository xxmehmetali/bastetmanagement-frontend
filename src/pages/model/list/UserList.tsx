import React from 'react'
import { Table } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Pagination } from '../../../results/pagination/Pagination';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { User } from '../../../models/base/User';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import PaginationComponent from '../../../components/PaginationComponent';
import { useGetUserPagedSimplifiedQuery } from '../../../features/api/userApi';

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
    


    const navigate = useNavigate();
    function handleNavigateToDetail(id: string) {
        navigate(navigationUrlProvider.employeeDetailUrl + id)
    }


    //USER APİ BACKEND TARAFINDA YOK, BACKEND YAZ
  return (
    <div>
      <Table striped className='listTable'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Phone Number</th>
            <th>Sex</th>
            <th>HR Assessment Status</th>
            <th>Technical Assessment Status</th>
          </tr>
        </thead>
        <tbody>

          {applicants &&
            applicants.map((user: User) => (
              <tr onClick={() => { (handleNavigateToDetail(user.id)) }}>
                <td>{user.email}</td>
                
              </tr>
            ))}

        </tbody>
      </Table>

      <PaginationComponent totalPages={totalPages} currentPage={page}/>
    </div>
  );
}
