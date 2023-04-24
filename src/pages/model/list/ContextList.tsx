import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Pagination } from '../../../results/pagination/Pagination';
import { useGetContextsPagedSimplifiedQuery } from '../../../features/api/contextApi';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { Context } from 'vm';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { Table } from 'react-bootstrap';
import PaginationComponent from '../../../components/PaginationComponent';

export default function ContextList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page")

  const { data: pagedDataResultDataForContext, isLoading, error } = useGetContextsPagedSimplifiedQuery(new Pagination(Number(page)));
  const pagedDataResultForContext: PagedDataResult = pagedDataResultDataForContext as PagedDataResult;
  const contexts: Context[] = (pagedDataResultForContext?.data?.content) as Context[];

  const totalPages = pagedDataResultForContext?.data?.totalPages || 1;
  


  const navigate = useNavigate();
  function handleNavigateToDetail(id: string) {
      navigate(navigationUrlProvider.contextDetailUrl + id)
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

        {contexts &&
          contexts.map((context: Context) => (
            <tr onClick={() => { (handleNavigateToDetail(context.id)) }}>
              <td>{context.name}</td>
              <td>{context.description}</td>
            </tr>
          ))}

      </tbody>
    </Table>

    <PaginationComponent totalPages={totalPages} currentPage={page}/>
  </div>
  );
}
