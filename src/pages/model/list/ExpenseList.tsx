import React from 'react'
import { Expense } from '../../../models/base/Expense';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetExpensesPagedSimplifiedQuery } from '../../../features/api/expenseApi';
import { Pagination } from '../../../results/pagination/Pagination';
import { PagedDataResult } from '../../../results/PagedDataResult';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { Button, Table } from 'react-bootstrap';
import PaginationComponent from '../../../components/PaginationComponent';
import { formatDate } from '../../../functions/FormatDateFunction';
import AddModelButtonComponent from '../../../components/AddModelButtonComponent';
import { useDeleteExpenseTypeByIdMutation } from '../../../features/api/expenseTypeApi';

export default function ExpenseList() {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page")

  const { data: pagedDataResultDataForExpense, isLoading, error } = useGetExpensesPagedSimplifiedQuery(new Pagination(Number(page)));
  const pagedDataResultForExpense: PagedDataResult = pagedDataResultDataForExpense as PagedDataResult;
  const expenses: Expense[] = (pagedDataResultForExpense?.data?.content) as Expense[];

  const totalPages = pagedDataResultForExpense?.data?.totalPages || 1;
  const [deleteExpense, { data }] = useDeleteExpenseTypeByIdMutation();
  
  async function handleDelete(id: any) {
    const result = await deleteExpense(id);
    //ResolveResult(result)
  }
  const navigate = useNavigate();
  function handleNavigateToDetail(id: string) {
      navigate(navigationUrlProvider.expenseDetailUrl + id)
  }
  function handleNavigateToUpdate(id: string) {
    navigate(navigationUrlProvider.expenseUpdateUrl + id)
  }
return (
  <div>
    <AddModelButtonComponent buttonName={"Add Expense"} redirectionUrl={navigationUrlProvider.expenseAddUrl}/>
    <Table striped className='listTable'>
      
      <thead>
      EXPENSELER DATABASE DE BAYA EKSIK (FOREIGN KEYLERI, BUNLARI DOLDUR SORGULARLA)
        <tr>
          <th>Name</th>
          <th>Spended By</th>
          <th>Expense Type</th>
          <th>Spent Date Time</th>
          <th> </th>
            <th> </th>
        </tr>
      </thead>
      <tbody>
        {expenses &&
          expenses.map((exp: Expense) => (
            <tr >
              <td onClick={() => { (handleNavigateToDetail(exp.id)) }}>{exp.name}</td>
              <td onClick={() => { (handleNavigateToDetail(exp.id)) }}>{exp.spendedBy?.name} {exp.spendedBy?.surname}</td>
              <td onClick={() => { (handleNavigateToDetail(exp.id)) }}>{exp.expenseType.name}</td> 
              <td onClick={() => { (handleNavigateToDetail(exp.id)) }}>{formatDate(exp.spentDateTime)}</td>
              <td>
                  
                  <Button variant="warning" onClick={() => {handleNavigateToUpdate(exp.id) }}>Update</Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => {handleDelete(exp.id)}}>
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
