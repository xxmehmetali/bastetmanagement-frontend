import { useGetSelectElementEmployeesQuery } from "../../features/api/employeeApi";
import { useGetSelectElementExpensesQuery } from "../../features/api/expenseApi";
import { ExpenseSelectElement } from "../../models/frontdtos/ExpenseSelectElement";
import { DataResult } from "../../results/DataResult";

export function GetExpenseSelectElements() {
    const { data: selectElementExpenses } = useGetSelectElementExpensesQuery();
    const selectElementExpensesAsDataResult: DataResult<ExpenseSelectElement[]> = selectElementExpenses as DataResult<ExpenseSelectElement[]>;
    const expenseSelectElementList: ExpenseSelectElement[] = (selectElementExpensesAsDataResult?.data) as ExpenseSelectElement[];

    return expenseSelectElementList;
}