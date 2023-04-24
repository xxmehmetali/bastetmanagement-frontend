import React from 'react'
import { Table } from 'react-bootstrap';
import { Pagination } from '../../../results/pagination/Pagination';
import { useGetApplicantsPagedSimplifiedQuery } from '../../../features/api/applicantApi';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { Applicant } from '../../../models/base/Applicant';
import { useNavigate, useSearchParams } from 'react-router-dom';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import PaginationComponent from '../../../components/PaginationComponent';

export default function ApplicantList() {
    //error varsa toastr ile uyarı göster
    //loading ise jsx içinde yükleniyor işareti göster
    //burada gelen veri simplified olmalı.
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page")

    const { data: pagedDataResultDataForApplicant, isLoading, error } = useGetApplicantsPagedSimplifiedQuery(new Pagination(Number(page)));
    const pagedDataResultForEmployee: PagedDataResult = pagedDataResultDataForApplicant as PagedDataResult;
    const applicants: Applicant[] = (pagedDataResultForEmployee?.data?.content) as Applicant[];

    const totalPages = pagedDataResultForEmployee?.data?.totalPages || 1;
    


    const navigate = useNavigate();
    function handleNavigateToDetail(id: string) {
        navigate(navigationUrlProvider.applicantDetailUrl + id)
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
            <th>HR Assessment Status</th>
            <th>Technical Assessment Status</th>
          </tr>
        </thead>
        <tbody>

          {applicants &&
            applicants.map((applicant: Applicant) => (
              <tr onClick={() => { (handleNavigateToDetail(applicant.id)) }}>
                <td>{applicant.name}</td>
                <td>{applicant.surname}</td>
                <td>{applicant.phoneNumber}</td>
                <td>{applicant.gender}</td>
                <td>{applicant.hrAssessmentStatus}</td>
                <td>{applicant.technicalAssessmentStatus}</td>
              </tr>
            ))}

        </tbody>
      </Table>

      <PaginationComponent totalPages={totalPages} currentPage={page}/>
    </div>
  );
}
