
import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetBranchByIdQuery } from '../../../features/api/branchApi';
import { Branch } from '../../../models/base/Branch';
import { DataResult } from '../../../results/DataResult';
import { Table } from 'react-bootstrap';
import BranchTableComponent from '../../../components/BranchTableComponent';
import CorporationTableComponent from '../../../components/CorporationTableComponent';

export default function BranchDetail() {
  let { id } = useParams();

  const { data: branchDataResultDataForBranch, isLoading, error } = useGetBranchByIdQuery(id || "");
  const branchDataResultForBranch: DataResult<Branch> = branchDataResultDataForBranch as DataResult<Branch>;
  const branch: Branch = (branchDataResultForBranch?.data) as Branch;

  if(error){
    return(
      <div>Error</div>
    )
  }

  return (
    <div>
      {branch &&
        <Table striped className='detailTable'>
          <thead>
            <tr>
              <th>id</th>
              <th>{branch.id}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{branch.name}</td>
            </tr>
            <tr>
              <td>Surname</td>
              <td>{branch.description}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{branch.address}</td>
            </tr>
            <tr>
              <td>Phone Number</td>
              <td>{branch.phoneNumber}</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <CorporationTableComponent corporation={branch.corporation}/>
              </td>
            </tr>
            {/* <tr>
              <td colSpan={2}>
                <BranchTableComponent branch={corporation.branch}/>
              </td>
            </tr>
            <tr>
              <td>Created At</td>
              <td>{formatDate(branch.createdAt)}</td>
            </tr>
            <tr>
              <td>Created At</td>
              <td>{formatDate(branch.updatedAt)}</td>
            </tr> */}
          </tbody>
        </Table>}
    </div>
  );
}
    