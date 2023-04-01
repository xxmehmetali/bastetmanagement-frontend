import { Model } from "../Model";

export interface CurrencySimplified extends Model {
  id: string;
  currencyName: string;
  currencySymbol: string;
}
