import { Model } from "../Model";

export interface Cv extends Model {
  id: string;
  cvFile: string;
  CvKeywords: string;
  createdAt: Date;
  updatedAt: Date;
}
