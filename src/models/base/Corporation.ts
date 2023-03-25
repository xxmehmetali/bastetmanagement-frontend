import { Project } from "./Project";

export interface Corporation {
  id: string;
  name: string;
  description: string;
  taxNumber: string;
  foundationDate: Date;
  projects: Project[];
}
