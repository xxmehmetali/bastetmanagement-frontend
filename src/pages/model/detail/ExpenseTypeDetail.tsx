
import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetExpenseTypeByIdQuery } from '../../../features/api/expenseTypeApi';
import { DataResult } from '../../../results/DataResult';
import { ExpenseType } from '../../../models/base/ExpenseType';
import { formatDate } from '../../../functions/FormatDateFunction';
import { Table } from 'react-bootstrap';

export default function ExpenseTypeDetail() {
  let { id } = useParams();

  const { data: expenseTypeDataResultDataForExpenseType, isLoading, error } = useGetExpenseTypeByIdQuery(id || "");
  const expenseTypeDataResultForExpenseType: DataResult<ExpenseType> = expenseTypeDataResultDataForExpenseType as DataResult<ExpenseType>;
  const expenseType: ExpenseType = (expenseTypeDataResultForExpenseType?.data) as ExpenseType;

  if(error){
    return(
      <div>Error</div>
    )
  }

  return (
    <div>
      {expenseType &&
        <Table striped className='detailTable'>
          <thead>
            <tr>
              <th>id</th>
              <th>{expenseType.id}</th>
            </tr>
          </thead>
          <tbody>            
            <tr>
              <td>Name</td>
              <td>{expenseType.name}</td>
            </tr>            
            <tr>
              <td>Description</td>
              <td>{expenseType.description}</td>
            </tr>           
            <tr>
              <td>Created At</td>
              <td>{formatDate(expenseType.createdAt)}</td>
            </tr>
            <tr>
              <td>Created At</td>
              <td>{formatDate(expenseType.updatedAt)}</td>
            </tr>
          </tbody>
        </Table>}
    </div>
  );
}
    