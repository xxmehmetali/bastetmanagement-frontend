import { Project } from "./Project";
import { Model } from "../Model";

export interface Corporation extends Model {
  id: string;
  name: string;
  description: string;
  taxNumber: string;
  foundationDate: Date;
  projects: Project[];
  createdAt: Date;
  updatedAt: Date;
}
