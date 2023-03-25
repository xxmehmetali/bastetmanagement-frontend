import { Employee } from "./Employee";
import { Expense } from "./Expense";
import { SocialActivityType } from "./SocialActivityType";

export interface SocialActivity {
  id: string;
  name: string;
  description: string;
  date: Date;
  place: string;
  employees: Employee[];
  expense: Expense;
  socialActivityType: SocialActivityType;
}
