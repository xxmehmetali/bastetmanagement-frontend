import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDeleteOccupationByIdMutation, useGetOccupationsPagedSimplifiedQuery } from '../../../features/api/ocupationApi';
import { Pagination } from '../../../results/pagination/Pagination';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { Occupation } from '../../../models/base/Occupation';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { Button, Table } from 'react-bootstrap';
import PaginationComponent from '../../../components/PaginationComponent';
import AddModelButtonComponent from '../../../components/AddModelButtonComponent';

export default function OccupationList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page")

  const { data: pagedDataResultDataForOccupation, isLoading, error } = useGetOccupationsPagedSimplifiedQuery(new Pagination(Number(page)));
  const pagedDataResultForOccupation: PagedDataResult = pagedDataResultDataForOccupation as PagedDataResult;
  const projects: Occupation[] = (pagedDataResultForOccupation?.data?.content) as Occupation[];

  const totalPages = pagedDataResultForOccupation?.data?.totalPages || 1;
  const [deleteOccupation, { data }] = useDeleteOccupationByIdMutation();
  async function handleDelete(id: any) {
    const result = await deleteOccupation(id);
    //ResolveResult(result)
  }
  const navigate = useNavigate();
  function handleNavigateToDetail(id: string) {
    navigate(navigationUrlProvider.occupationDetailUrl + id)
  }
  function handleNavigateToUpdate(id: string) {
    navigate(navigationUrlProvider.occupationUpdateUrl + id)
  }
  return (
    <div>
      <AddModelButtonComponent buttonName={"Add Occupation"} redirectionUrl={navigationUrlProvider.occupationAddUrl}/>
      <Table striped className='listTable'>
        <thead>
          <tr>
            <th>Occupation</th>
            <th>Detail</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {projects &&
            projects.map((occupation: Occupation) => (
              <tr >
                <td onClick={() => { (handleNavigateToDetail(occupation.id)) }}>{occupation.occupation}</td>
                <td onClick={() => { (handleNavigateToDetail(occupation.id)) }}>{occupation.detail}</td>
                <td>
                  
                  <Button variant="warning" onClick={() => {handleNavigateToUpdate(occupation.id) }}>Update</Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => {handleDelete(occupation.id)}}>
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
