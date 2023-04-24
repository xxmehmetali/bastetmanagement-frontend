import { Model } from "../Model";

export interface ExpenseType extends Model {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
