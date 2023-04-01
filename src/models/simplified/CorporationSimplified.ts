import { Model } from "../Model";

export interface CorparationSimplified extends Model {
  id: string;
  name: string;
  description: string;
  taxNumber: string;
  foundationDate: string;
}
