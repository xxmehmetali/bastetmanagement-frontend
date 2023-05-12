
import React from 'react'
import { useParams } from 'react-router-dom';

import { DataResult } from '../../../results/DataResult';
import { useGetContextByIdQuery } from '../../../features/api/contextApi';
import { Table } from 'react-bootstrap';
import { formatDate } from '../../../functions/FormatDateFunction';
import { Context } from '../../../models/base/Context';

export default function ContextDetail() {
  let { id } = useParams();

  const { data: contextDataResultDataForContext, isLoading, error } = useGetContextByIdQuery(id || "");
  const contextDataResultForContext: DataResult<Context> = contextDataResultDataForContext as DataResult<Context>;
  const context: Context = (contextDataResultForContext?.data) as Context;

  if(error){
    return(
      <div>Error</div>
    )
  }

  return (
    <div>
      {context &&
        <Table striped className='detailTable'>
          <thead>
            <tr>
              <th>id</th>
              <th>{context.id}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{context.name}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{context.description}</td>
            </tr>           
            <tr>
              <td>Created At</td>
              <td>{formatDate(context.createdAt)}</td>
            </tr>
            <tr>
              <td>Created At</td>
              <td>{formatDate(context.updatedAt)}</td>
            </tr>
          </tbody>
        </Table>}
    </div>
  );
}
    