import { SrvRecord } from "dns";

export interface Currency {
  id: string;
  currencyName: string;
  currencySymbol: string;
  createdAt: Date;
  updatedAt: Date;
}
