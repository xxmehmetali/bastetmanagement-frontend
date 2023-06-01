import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Pagination } from '../../../results/pagination/Pagination';
import { useDeleteContextByIdMutation, useGetContextsPagedSimplifiedQuery } from '../../../features/api/contextApi';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { Context } from 'vm';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { Button, Table } from 'react-bootstrap';
import PaginationComponent from '../../../components/PaginationComponent';
import AddModelButtonComponent from '../../../components/AddModelButtonComponent';

export default function ContextList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page")

  const { data: pagedDataResultDataForContext, isLoading, error } = useGetContextsPagedSimplifiedQuery(new Pagination(Number(page)));
  const pagedDataResultForContext: PagedDataResult = pagedDataResultDataForContext as PagedDataResult;
  const contexts: Context[] = (pagedDataResultForContext?.data?.content) as Context[];

  const totalPages = pagedDataResultForContext?.data?.totalPages || 1;
  const [deleteContext, { data }] = useDeleteContextByIdMutation();

  async function handleDelete(id: any) {
    const result = await deleteContext(id);
    //ResolveResult(result)
  }

  const navigate = useNavigate();
  function handleNavigateToDetail(id: string) {
      navigate(navigationUrlProvider.contextDetailUrl + id)
  }
  function handleNavigateToUpdate(id: string) {
    navigate(navigationUrlProvider.applicantUpdateUrl + id)
  }
return (
  <div>
    <AddModelButtonComponent buttonName={"Add Context"} redirectionUrl={navigationUrlProvider.contextAddUrl}/>
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

        {contexts &&
          contexts.map((context: Context) => (
            <tr >
              <td onClick={() => { (handleNavigateToDetail(context.id)) }}>{context.name}</td>
              <td onClick={() => { (handleNavigateToDetail(context.id)) }}>{context.description}</td>
              <td>
                  
                  <Button variant="warning" onClick={() => {handleNavigateToUpdate(context.id) }}>Update</Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => {handleDelete(context.id)}}>
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
