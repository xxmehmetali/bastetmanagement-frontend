import { useGetSelectElementCurrenciesQuery } from "../../features/api/currencyApi";
import { CurrencySelectElement } from "../../models/frontdtos/CurrencySelectElement";
import { DataResult } from "../../results/DataResult";


export function GetCurrencySelectElements() {
    const { data: selectElementCurrencies } = useGetSelectElementCurrenciesQuery();
    const selectElementCurrenciesAsDataResult: DataResult<CurrencySelectElement[]> = selectElementCurrencies as DataResult<CurrencySelectElement[]>;
    const currencySelectElementList: CurrencySelectElement[] = (selectElementCurrenciesAsDataResult?.data) as CurrencySelectElement[];

    return currencySelectElementList;
}