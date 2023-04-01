import { Model } from "../Model";
import { Employee } from "./Employee";
import { ExpenseType } from "./ExpenseType";

export interface Expense extends Model {
  id: string;
  name: string;
  description: string;
  spendedBy: Employee;
  vaucherNo: number;
  expenseType: ExpenseType;
  spentDateTime: Date;
}
