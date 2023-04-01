import { Corporation } from "./Corporation";
import { Employee } from "./Employee";
import { Model } from "../Model";

export interface Branch extends Model {
  id: string;
  name: string;
  description: string;
  phoneNumber: string;
  address: string;
  corporation: Corporation;
  employees: Employee[];
  createdAt: Date;
  updatedAt: Date;
}
