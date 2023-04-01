import { Model } from "../Model";

export interface BranchSimplified extends Model {
  id: string;
  name: string;
  description: string;
  phoneNumber: string;
  address: string;
}
