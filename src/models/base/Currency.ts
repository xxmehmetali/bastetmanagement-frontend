import { SrvRecord } from "dns";
import { Model } from "../Model";

export interface Currency extends Model {
  id: string;
  currencyName: string;
  currencySymbol: string;
  createdAt: Date;
  updatedAt: Date;
}
