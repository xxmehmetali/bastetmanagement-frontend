import React from 'react'
import { useGetBranchesPagedSimplifiedQuery } from '../../../features/api/branchApi';
import { Pagination } from '../../../results/pagination/Pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { Branch } from '../../../models/base/Branch';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { Table } from 'react-bootstrap';
import PaginationComponent from '../../../components/PaginationComponent';
import AddModelButtonComponent from '../../../components/AddModelButtonComponent';

export default function BranchList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page")

  const { data: pagedDataResultDataForBranch, isLoading, error } = useGetBranchesPagedSimplifiedQuery(new Pagination(Number(page)));
  const pagedDataResultForEmployee: PagedDataResult = pagedDataResultDataForBranch  as PagedDataResult;
  const branches: Branch[] = (pagedDataResultForEmployee?.data?.content) as Branch[];

  const totalPages = pagedDataResultForEmployee?.data?.totalPages || 1;

  const navigate = useNavigate();
  function handleNavigateToDetail(id: string) {
      navigate(navigationUrlProvider.branchDetailUrl + id)
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
          </tr>
        </thead>
        <tbody>

          {branches &&
            branches.map((branch: Branch) => (
              <tr onClick={() => { (handleNavigateToDetail(branch.id)) }}>
                <td>{branch.name}</td>
                <td>{branch.description}</td>
                <td>{branch.phoneNumber}</td>
                <td>{branch.address}</td>
              </tr>
            ))}

        </tbody>
      </Table>

      <PaginationComponent totalPages={totalPages} currentPage={page} /> 
      </div>
  );
}
