import { Model } from "../Model";
import { Currency } from "./Currency";
import { Employee } from "./Employee";
import { ExpenseType } from "./ExpenseType";
import { SocialActivity } from "./SocialActivity";

export interface Expense extends Model {
  id: string;
  name: string;
  description: string;
  spendedBy: Employee;
  voucherNo: string;
  expenseType: ExpenseType;
  expenseAmount: number;
  expenseCurrencyType: Currency;
  socialActivity: SocialActivity;
  spentDateTime: Date;
  createdAt: Date;
  updatedAt: Date;
}
