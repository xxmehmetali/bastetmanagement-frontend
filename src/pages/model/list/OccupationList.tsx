import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetOccupationsPagedSimplifiedQuery } from '../../../features/api/ocupationApi';
import { Pagination } from '../../../results/pagination/Pagination';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { Occupation } from '../../../models/base/Occupation';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { Table } from 'react-bootstrap';
import PaginationComponent from '../../../components/PaginationComponent';
import AddModelButtonComponent from '../../../components/AddModelButtonComponent';

export default function OccupationList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page")

  const { data: pagedDataResultDataForOccupation, isLoading, error } = useGetOccupationsPagedSimplifiedQuery(new Pagination(Number(page)));
  const pagedDataResultForOccupation: PagedDataResult = pagedDataResultDataForOccupation as PagedDataResult;
  const projects: Occupation[] = (pagedDataResultForOccupation?.data?.content) as Occupation[];

  const totalPages = pagedDataResultForOccupation?.data?.totalPages || 1;
  const navigate = useNavigate();
  function handleNavigateToDetail(id: string) {
    navigate(navigationUrlProvider.occupationDetailUrl + id)
  }
  return (
    <div>
      <AddModelButtonComponent buttonName={"Add Occupation"} redirectionUrl={navigationUrlProvider.occupationAddUrl}/>
      <Table striped className='listTable'>
        <thead>
          <tr>
            <th>Occupation</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {projects &&
            projects.map((occupation: Occupation) => (
              <tr onClick={() => { (handleNavigateToDetail(occupation.id)) }}>
                <td>{occupation.occupation}</td>
                <td>{occupation.detail}</td>
              </tr>
            ))}

        </tbody>
      </Table>

      <PaginationComponent totalPages={totalPages} currentPage={page} />
    </div>
  );
}
