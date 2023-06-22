import { Model } from "../Model";
import { ExpenseTypeSimplified } from "./ExpenseTypeSimplified";

export interface ExpenseSimplified extends Model {
  id: string;
  name: string;
  description: string;
  voucherNo: string;
  expenseType: ExpenseTypeSimplified;
  spentDateTime: Date;
}
