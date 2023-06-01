import React from 'react'
import { useDeleteBranchByIdMutation, useGetBranchesPagedSimplifiedQuery } from '../../../features/api/branchApi';
import { Pagination } from '../../../results/pagination/Pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { Branch } from '../../../models/base/Branch';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { Button, Table } from 'react-bootstrap';
import PaginationComponent from '../../../components/PaginationComponent';
import AddModelButtonComponent from '../../../components/AddModelButtonComponent';

export default function BranchList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page")

  const { data: pagedDataResultDataForBranch, isLoading, error } = useGetBranchesPagedSimplifiedQuery(new Pagination(Number(page)));
  const pagedDataResultForEmployee: PagedDataResult = pagedDataResultDataForBranch  as PagedDataResult;
  const branches: Branch[] = (pagedDataResultForEmployee?.data?.content) as Branch[];

  const totalPages = pagedDataResultForEmployee?.data?.totalPages || 1;
  const [deleteBranch, { data }] = useDeleteBranchByIdMutation();

  const navigate = useNavigate();
  function handleNavigateToDetail(id: string) {
      navigate(navigationUrlProvider.branchDetailUrl + id)
  }
  async function handleDelete(id: any) {
    const result = await deleteBranch(id);
    //ResolveResult(result)
  }
  function handleNavigateToUpdate(id: string) {
    navigate(navigationUrlProvider.branchUpdateUrl + id)
  }


  return (
    
    <div>
      <AddModelButtonComponent buttonName={"Add Branch"} redirectionUrl={navigationUrlProvider.branchAddUrl}/>
 <Table striped className='listTable'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>

          {branches &&
            branches.map((branch: Branch) => (
              <tr>
                <td onClick={() => { (handleNavigateToDetail(branch.id)) }}>{branch.name}</td>
                <td onClick={() => { (handleNavigateToDetail(branch.id)) }}>{branch.description}</td>
                <td onClick={() => { (handleNavigateToDetail(branch.id)) }}>{branch.phoneNumber}</td>
                <td onClick={() => { (handleNavigateToDetail(branch.id)) }}> {branch.address}</td>
                <td>
                  
                  <Button variant="warning" onClick={() => {handleNavigateToUpdate(branch.id) }}>Update</Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => {handleDelete(branch.id)}}>
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
