import { Model } from "../Model";
import { ExpenseTypeSimplified } from "./ExpenseTypeSimplified";

export interface ExpenseSimplified extends Model {
  id: string;
  name: string;
  description: string;
  vaucherNo: number;
  expenseType: ExpenseTypeSimplified;
  spentDateTime: Date;
}
