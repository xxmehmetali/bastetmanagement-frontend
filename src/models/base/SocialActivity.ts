import { Model } from "../Model";
import { Employee } from "./Employee";
import { Expense } from "./Expense";
import { SocialActivityType } from "./SocialActivityType";

export interface SocialActivity extends Model {
  id: string;
  name: string;
  description: string;
  date: Date;
  place: string;
  employees: Employee[];
  expense: Expense;
  socialActivityType: SocialActivityType;
}
