import { Model } from "../Model";

export interface Context extends Model {
  id: string;
  name: string;
  description: string;
}
