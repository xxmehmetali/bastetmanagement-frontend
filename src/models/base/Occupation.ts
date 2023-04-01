import { Model } from "../Model";

export interface Occupation extends Model {
  id: string;
  occupation: string;
  detail: string;
  createdAt: Date;
  updatedAt: Date;
}
