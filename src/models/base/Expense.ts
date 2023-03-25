import { Employee } from "./Employee";
import { ExpenseType } from "./ExpenseType";

export interface Expense {
  id: string;
  name: string;
  description: string;
  spendedBy: Employee;
  vaucherNo: number;
  expenseType: ExpenseType;
  spentDateTime: Date;
}
