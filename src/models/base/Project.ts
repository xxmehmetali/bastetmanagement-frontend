import { Context } from "vm";
import { Corporation } from "./Corporation";

export interface Project {
  id: string;
  name: string;
  contexts: Context[];
  corporation: Corporation;
  createdAt: Date;
  updatedAt: Date;
}
