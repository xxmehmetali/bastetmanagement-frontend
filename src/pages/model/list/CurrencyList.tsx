import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetCurrenciesPagedSimplifiedQuery } from '../../../features/api/currencyApi';
import { Pagination } from '../../../results/pagination/Pagination';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { Currency } from '../../../models/base/Currency';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { Table } from 'react-bootstrap';
import PaginationComponent from '../../../components/PaginationComponent';

export default function CurrencyList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page")

  const { data: pagedDataResultDataForCurrency, isLoading, error } = useGetCurrenciesPagedSimplifiedQuery(new Pagination(Number(page)));
  const pagedDataResultForCurrency: PagedDataResult = pagedDataResultDataForCurrency as PagedDataResult;
  const currencies: Currency[] = (pagedDataResultForCurrency?.data?.content) as Currency[];

  const totalPages = pagedDataResultForCurrency?.data?.totalPages || 1;
  


  const navigate = useNavigate();
  function handleNavigateToDetail(id: string) {
      navigate(navigationUrlProvider.currencyDetailUrl + id)
  }
return (
  <div>
    <Table striped className='listTable'>
      <thead>
        <tr>
          <th>Currency Name</th>
          <th>Currency Symbol</th>
          
        </tr>
      </thead>
      <tbody>

        {currencies &&
          currencies.map((cur: Currency) => (
            <tr onClick={() => { (handleNavigateToDetail(cur.id)) }}>
              <td>{cur.currencyName}</td>
              <td>{cur.currencySymbol}</td>
              
            </tr>
          ))}

      </tbody>
    </Table>

    <PaginationComponent totalPages={totalPages} currentPage={page}/>
  </div>
  );
}
