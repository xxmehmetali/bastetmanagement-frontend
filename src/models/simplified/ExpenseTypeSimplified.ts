import { Model } from "../Model";

export interface ExpenseTypeSimplified extends Model {
  id: string;
  name: string;
  description: string;
}
