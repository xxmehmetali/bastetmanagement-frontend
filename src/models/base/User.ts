import { Model } from "../Model";

export interface User extends Model {
  id: string;
  email: string;
  password: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}
