
import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetCurrencyByIdQuery } from '../../../features/api/currencyApi';
import { DataResult } from '../../../results/DataResult';
import { Currency } from '../../../models/base/Currency';
import { Table } from 'react-bootstrap';

export default function CurrencyDetail() {
  let { id } = useParams();

  const { data: currencyDataResultDataForCurrency, isLoading, error } =  useGetCurrencyByIdQuery(id || "");
  const currencyDataResultForCurrency: DataResult<Currency> = currencyDataResultDataForCurrency as DataResult<Currency>;
  const currency: Currency = (currencyDataResultForCurrency?.data) as Currency;

  if(error){
    return(
      <div>Error</div>
    )
  }

  return (
    <div>
      {currency &&
        <Table striped className='detailTable'>
          <thead>
            <tr>
              <th>id</th>
              <th>{currency.id}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{currency.currencyName}</td>
            </tr>
            <tr>
              <td>Surname</td>
              <td>{currency.currencySymbol}</td>
            </tr>
            {/* <tr>
              <td>Created At</td>
              <td>{formatDate(currency.createdAt)}</td>
            </tr>
            <tr>
              <td>Created At</td>
              <td>{formatDate(currency.updatedAt)}</td>
            </tr> */}
          </tbody>
        </Table>}
    </div>
  ); 
}
    