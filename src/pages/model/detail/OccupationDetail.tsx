
import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetOccupationByIdQuery } from '../../../features/api/ocupationApi';
import { DataResult } from '../../../results/DataResult';
import { Occupation } from '../../../models/base/Occupation';
import { Table } from 'react-bootstrap';
import { formatDate } from '../../../functions/FormatDateFunction';

export default function OccupationDetail() {
  let { id } = useParams();

  const { data: occupationDataResultDataForOccupation, isLoading, error } = useGetOccupationByIdQuery(id || "");
  const occupationDataResultForOccupation: DataResult<Occupation> = occupationDataResultDataForOccupation as DataResult<Occupation>;
  const occupation: Occupation = (occupationDataResultForOccupation?.data) as Occupation;

  if (error) {
    return (
      <div>Error</div>
    )
  }

  return (
    <div>
      {occupation &&
        <Table striped className='detailTable'>
          <thead>
            <tr>
              <th>id</th>
              <th>{occupation.id}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Occupation</td>
              <td>{occupation.occupation}</td>
            </tr>
            <tr>
              <td>Detail</td>
              <td>{occupation.detail}</td>
            </tr>
            <tr>
              <td>Created At</td>
              <td>{formatDate(occupation.createdAt)}</td>
            </tr>
            <tr>
              <td>Updated At</td>
              <td>{formatDate(occupation.updatedAt)}</td>
            </tr>
          </tbody>
        </Table>}
    </div>
  );
}
    