import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Corporation } from '../../../models/base/Corporation';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { useDeleteCorporationByIdMutation, useGetCorporationsPagedSimplifiedQuery } from '../../../features/api/corporationApi';
import { Pagination } from '../../../results/pagination/Pagination';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { Button, Table } from 'react-bootstrap';
import PaginationComponent from '../../../components/PaginationComponent';
import { formatDate } from '../../../functions/FormatDateFunction';
import AddModelButtonComponent from '../../../components/AddModelButtonComponent';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';

export default function CorporationList() {
  const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page")

    const { data: pagedDataResultDataForCorporation, isLoading, error, isSuccess } = useGetCorporationsPagedSimplifiedQuery(new Pagination(Number(page)));
    const pagedDataResultForCorporation: PagedDataResult = pagedDataResultDataForCorporation as PagedDataResult;
    const corporations: Corporation[] = (pagedDataResultForCorporation?.data?.content) as Corporation[];

    const totalPages = pagedDataResultForCorporation?.data?.totalPages || 1;

    if(isSuccess)
      ResolveResult(pagedDataResultForCorporation)
    const [deleteCorpotation, { data }] = useDeleteCorporationByIdMutation();

    async function handleDelete(id: any) {
      const result = await deleteCorpotation(id);
      //ResolveResult(result)
    }

    const navigate = useNavigate();
    function handleNavigateToDetail(id: string) {
        navigate(navigationUrlProvider.corporationDetailUrl + id)
    }
    function handleNavigateToUpdate(id: string) {
      navigate(navigationUrlProvider.coporationUpdateUrl + id)
    }
  return (
    <div>
     <AddModelButtonComponent buttonName={"Add Corporation"} redirectionUrl={navigationUrlProvider.corporationAddUrl}/>
      <Table striped className='listTable'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Foundation Date</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>

          {corporations &&
            corporations.map((corp: Corporation) => (
              <tr >
                <td onClick={() => { (handleNavigateToDetail(corp.id)) }}>{corp.name}</td>
                <td onClick={() => { (handleNavigateToDetail(corp.id)) }}>{corp.description}</td>
                <td onClick={() => { (handleNavigateToDetail(corp.id)) }}>{formatDate(corp.foundationDate)}</td>
                <td>

                  <Button variant="warning" onClick={() => {handleNavigateToUpdate(corp.id) }}>Update</Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => {handleDelete(corp.id)}}>
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
