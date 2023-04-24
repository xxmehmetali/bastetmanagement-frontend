import { string } from "yup";
import { Model } from "../Model";

export interface Department extends Model {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
