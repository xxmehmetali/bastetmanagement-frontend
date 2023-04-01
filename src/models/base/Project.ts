import { Context } from "vm";
import { Model } from "../Model";
import { Corporation } from "./Corporation";

export interface Project extends Model {
  id: string;
  name: string;
  contexts: Context[];
  corporation: Corporation;
  createdAt: Date;
  updatedAt: Date;
}
