import { useGetSelectElementEmployeesQuery } from "../../features/api/employeeApi";
import { useGetSelectElementExpensesQuery } from "../../features/api/expenseApi";
import { useGetSelectElementExpenseTypesQuery } from "../../features/api/expenseTypeApi";
import { ExpenseSelectElement } from "../../models/frontdtos/ExpenseSelectElement";
import { ExpenseTypeSelectElement } from "../../models/frontdtos/ExpenseTypeSelectElement";
import { DataResult } from "../../results/DataResult";

export function GetExpenseTypeSelectElements() {
    const { data: selectElementExpenseTypes } = useGetSelectElementExpenseTypesQuery();
    const selectElementExpenseTypesAsDataResult: DataResult<ExpenseTypeSelectElement[]> = selectElementExpenseTypes as DataResult<ExpenseTypeSelectElement[]>;
    const expenseTypeSelectElementList: ExpenseTypeSelectElement[] = (selectElementExpenseTypesAsDataResult?.data) as ExpenseTypeSelectElement[];

    return expenseTypeSelectElementList;
}