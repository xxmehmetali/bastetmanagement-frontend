import React from 'react'
import { Table } from 'react-bootstrap';
import { useGetEmployeesPagedSimplifiedQuery } from '../../../features/api/employeeApi';
import { Employee } from '../../../models/base/Employee';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Pagination } from '../../../results/pagination/Pagination';
import PaginationBootstrap from 'react-bootstrap/Pagination';
import PaginationComponent from '../../../components/PaginationComponent';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';


function EmployeeList() {

    //error varsa toastr ile uyarı göster
    //loading ise jsx içinde yükleniyor işareti göster
    //burada gelen veri simplified olmalı.
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page")

    const { data: pagedDataResultDataForEmployee, isLoading, error } = useGetEmployeesPagedSimplifiedQuery(new Pagination(Number(page)));
    const pagedDataResultForEmployee: PagedDataResult = pagedDataResultDataForEmployee as PagedDataResult;
    console.log(pagedDataResultForEmployee)
    const employees: Employee[] = (pagedDataResultForEmployee?.data?.content) as Employee[];

    const totalPages = pagedDataResultForEmployee?.data?.totalPages || 1;
    


    const navigate = useNavigate();
    function handleNavigateToDetail(id: string) {
        navigate(navigationUrlProvider.employeeDetailUrl + id)
    }


    return (
        <div>
            <Table striped className='listTable'>
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

                    {employees &&
                        employees.map((emp: Employee) => (
                            <tr onClick={() => { (handleNavigateToDetail(emp.id)) }}>
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


            <PaginationComponent totalPages={totalPages} currentPage={page}/>
        </div>
    );
}

export default EmployeeList;