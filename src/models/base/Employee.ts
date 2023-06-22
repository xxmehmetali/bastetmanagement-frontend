import { Gender } from "../enums/Gender";
import { Model } from "../Model";
import { Branch } from "./Branch";
import { Currency } from "./Currency";
import { Department } from "./Department";
import { Occupation } from "./Occupation";

export interface Employee extends Model {
  
  id: string;
  name: string;
  surname: string;
  address: string;
  phoneNumber: string;
  nationalId: string;
  gender: Gender;
  salaryAmount: number;
  salaryCurrency: Currency;
  occupation: Occupation;
  startDate: Date;
  endDate: Date;
  branch: Branch;
  department: Department;
  createdAt: Date;
  updatedAt: Date;
}
