
import React from 'react'
import { useParams } from 'react-router-dom';
import { DataResult } from '../../../results/DataResult';
import { Expense } from '../../../models/base/Expense';
import { useGetExpenseByIdQuery } from '../../../features/api/expenseApi';
import { Table } from 'react-bootstrap';
import ExpenseTypeTableComponent from '../../../components/ExpenseTypeTableComponent';
import exp from 'constants';
import EmployeeTableComponent from '../../../components/EmployeeTableComponent';
import { EmployeeStatus } from '../../../models/enums/EmployeeStatus';
import { formatDate } from '../../../functions/FormatDateFunction';

export default function ExpenseDetail() {
  let { id } = useParams();

  const { data: expenseDataResultDataForExpense, isLoading, error } = useGetExpenseByIdQuery(id || "");
  const expenseDataResultForExpense: DataResult<Expense> = expenseDataResultDataForExpense as DataResult<Expense>;
  const expense: Expense = (expenseDataResultForExpense?.data) as Expense;

  if(error){
    return(
      <div>Error</div>
    )
  }
  return (
    <div>
      {expense &&
        <Table striped className='detailTable'>
          <thead>
            <tr>
              <th>id</th>
              <th>{expense.id}</th>
            </tr>
          </thead>
          <tbody>            
            <tr>
              <td>Name</td>
              <td>{expense.name}</td>
            </tr>            
            <tr>
              <td>Description</td>
              <td>{expense.description}</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <EmployeeTableComponent employee={expense.spendedBy} accordionTitle={EmployeeStatus.SPENDED_BY}/>
              </td>
            </tr>
            <tr>
              <td>Vaucher Number</td>
              <td>{expense.vaucherNo}</td>
            </tr>   
            <tr>
              <td colSpan={2}>
                <ExpenseTypeTableComponent expenseType={expense.expenseType} />
              </td>
            </tr>       
            <tr>
              <td>Spent Time</td>
              <td>{formatDate(expense.spentDateTime)}</td>
            </tr>       
            <tr>
              <td>Created At</td>
              <td>{formatDate(expense.createdAt)}</td>
            </tr>
            <tr>
              <td>Created At</td>
              <td>{formatDate(expense.updatedAt)}</td>
            </tr>
          </tbody>
        </Table>}
    </div>
  );
}
    