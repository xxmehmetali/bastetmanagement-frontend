import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Corporation } from '../../../models/base/Corporation';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { useGetCorporationsPagedSimplifiedQuery } from '../../../features/api/corporationApi';
import { Pagination } from '../../../results/pagination/Pagination';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { Table } from 'react-bootstrap';
import PaginationComponent from '../../../components/PaginationComponent';
import { formatDate } from '../../../functions/FormatDateFunction';

export default function CorporationList() {
  const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page")

    const { data: pagedDataResultDataForCorporation, isLoading, error } = useGetCorporationsPagedSimplifiedQuery(new Pagination(Number(page)));
    const pagedDataResultForCorporation: PagedDataResult = pagedDataResultDataForCorporation as PagedDataResult;
    const corporations: Corporation[] = (pagedDataResultForCorporation?.data?.content) as Corporation[];

    const totalPages = pagedDataResultForCorporation?.data?.totalPages || 1;
    


    const navigate = useNavigate();
    function handleNavigateToDetail(id: string) {
        navigate(navigationUrlProvider.corporationDetailUrl + id)
    }
  return (
    <div>
      {/*     id: string;
    name: string;
    description: string;
    taxNumber: string;
    foundationDate: Date;
    projects: Project[]; */}
      <Table striped className='listTable'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Foundation Date</th>
           
          </tr>
        </thead>
        <tbody>

          {corporations &&
            corporations.map((corp: Corporation) => (
              <tr onClick={() => { (handleNavigateToDetail(corp.id)) }}>
                <td>{corp.name}</td>                
                <td>{corp.description}</td>
                <td>{formatDate(corp.foundationDate)}</td> 
                
               
              </tr>
            ))}

        </tbody>
      </Table>

      <PaginationComponent totalPages={totalPages} currentPage={page}/>
    </div>
  );
}
