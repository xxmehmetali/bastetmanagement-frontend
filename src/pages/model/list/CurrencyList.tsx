import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDeleteCurrencyByIdMutation, useGetCurrenciesPagedSimplifiedQuery } from '../../../features/api/currencyApi';
import { Pagination } from '../../../results/pagination/Pagination';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { Currency } from '../../../models/base/Currency';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { Button, Table } from 'react-bootstrap';
import PaginationComponent from '../../../components/PaginationComponent';
import AddModelButtonComponent from '../../../components/AddModelButtonComponent';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';

export default function CurrencyList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page")

  const { data: pagedDataResultDataForCurrency, isLoading, error, isSuccess } = useGetCurrenciesPagedSimplifiedQuery(new Pagination(Number(page)));
  const pagedDataResultForCurrency: PagedDataResult = pagedDataResultDataForCurrency as PagedDataResult;
  const currencies: Currency[] = (pagedDataResultForCurrency?.data?.content) as Currency[];

  const totalPages = pagedDataResultForCurrency?.data?.totalPages || 1;

  if(isSuccess)
    ResolveResult(pagedDataResultForCurrency)
  const [deleteCurrency, { data }] = useDeleteCurrencyByIdMutation();

  async function handleDelete(id: any) {
    const result = await deleteCurrency(id);
    //ResolveResult(result)
  }

  const navigate = useNavigate();
  function handleNavigateToDetail(id: string) {
      navigate(navigationUrlProvider.currencyDetailUrl + id)
  }
  function handleNavigateToUpdate(id: string) {
    navigate(navigationUrlProvider.currencyUpdateUrl + id)
  }
return (
  <div>
    <AddModelButtonComponent buttonName={"Add Currency"} redirectionUrl={navigationUrlProvider.currencyAddUrl}/>
    <Table striped className='listTable'>
      <thead>
        <tr>
          <th>Currency Name</th>
          <th>Currency Symbol</th>
          <th> </th>

        </tr>
      </thead>
      <tbody>

        {currencies &&
          currencies.map((cur: Currency) => (
            <tr>
              <td  onClick={() => { (handleNavigateToDetail(cur.id)) }}>{cur.currencyName}</td>
              <td  onClick={() => { (handleNavigateToDetail(cur.id)) }}>{cur.currencySymbol}</td>
              <td>

                  <Button variant="warning" style={{ marginRight : "1em" }} onClick={() => {handleNavigateToUpdate(cur.id) }}>Update</Button>
                  <Button variant="danger" onClick={() => {handleDelete(cur.id)}}>
                    Delete
                  </Button>
                </td>
              
            </tr>
          ))}

      </tbody>
    </Table>

    <PaginationComponent totalPages={totalPages} currentPage={page}/>
  </div>
  );
}
