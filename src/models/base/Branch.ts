import { Corporation } from "./Corporation";
import { Employee } from "./Employee";

export interface Branch {
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
