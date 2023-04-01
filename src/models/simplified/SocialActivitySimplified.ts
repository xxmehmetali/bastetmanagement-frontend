import { Model } from "../Model";

export interface SocialActivitySimplified extends Model {
  id: string;
  name: string;
  description: string;
  date: Date;
  place: String;
}
