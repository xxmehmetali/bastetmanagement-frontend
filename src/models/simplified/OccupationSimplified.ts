import { Model } from "../Model";

export interface OccupationSimplified extends Model {
  id: string;
  occupation: OccupationSimplified;
  detail: string;
}
