import { Model } from "../Model";

export interface CvSimplified extends Model {
  id: string;
  cvFile: string;
  CvKeywords: string;
}
