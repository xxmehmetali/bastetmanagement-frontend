import React from "react";
import { Button, Table } from "react-bootstrap";
import { useGetEmployeesPagedSimplifiedQuery } from "../../../features/api/employeeApi";
import { Employee } from "../../../models/base/Employee";
import { PagedDataResult } from "../../../results/PagedDataResult";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Pagination } from "../../../results/pagination/Pagination";
import PaginationBootstrap from "react-bootstrap/Pagination";
import PaginationComponent from "../../../components/PaginationComponent";
import navigationUrlProvider from "../../../providers/navigationUrlProvider";
import {
  useDeleteExpenseTypeByIdMutation,
  useGetExpenseTypesPagedSimplifiedQuery,
} from "../../../features/api/expenseTypeApi";
import { ExpenseType } from "../../../models/base/ExpenseType";
import AddModelButtonComponent from "../../../components/AddModelButtonComponent";

function ExpenseTypeList() {
  //error varsa toastr ile uyarı göster
  //loading ise jsx içinde yükleniyor işareti göster
  //burada gelen veri simplified olmalı.
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");

  const {
    data: pagedDataResultDataForExpenseType,
    isLoading,
    error,
  } = useGetExpenseTypesPagedSimplifiedQuery(new Pagination(Number(page)));
  const pagedDataResultForExpenseType: PagedDataResult =
    pagedDataResultDataForExpenseType as PagedDataResult;

  const expenseTypes: ExpenseType[] = pagedDataResultForExpenseType?.data
    ?.content as ExpenseType[];

  const totalPages = pagedDataResultForExpenseType?.data?.totalPages || 1;
  const [deleteExpenseType, { data }] = useDeleteExpenseTypeByIdMutation();

  async function handleDelete(id: any) {
    const result = await deleteExpenseType(id);
    //ResolveResult(result)
  }

  const navigate = useNavigate();
  function handleNavigateToDetail(id: string) {
    navigate(navigationUrlProvider.expensetypeDetailUrl + id);
  }

  function handleNavigateToUpdate(id: string) {
    navigate(navigationUrlProvider.expenseTypeUpdateUrl + id)
  }

  return (
    <div>
      <AddModelButtonComponent
        buttonName={"Add Expense Type"}
        redirectionUrl={navigationUrlProvider.expensetypeAddUrl}
      />
      <Table striped className="listTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {expenseTypes &&
            expenseTypes.map((expenseType: ExpenseType) => (
              <tr
                onClick={() => {
                  handleNavigateToDetail(expenseType.id);
                }}
              >
                <td>{expenseType.name}</td>
                <td>{expenseType.description}</td>
                <td>
                  <Button variant="warning" style={{ marginRight: "1em" }} onClick={() => {handleNavigateToUpdate(expenseType.id) }}>
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      handleDelete(expenseType.id);
                    }}
                  >
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

export default ExpenseTypeList;
