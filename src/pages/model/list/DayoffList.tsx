import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDeleteDayoffsByIdMutation, useGetDayoffsPagedSimplifiedQuery } from '../../../features/api/dayoffApi';
import { Pagination } from '../../../results/pagination/Pagination';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { Dayoff } from '../../../models/base/Dayoff';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { Button, Table } from 'react-bootstrap';
import PaginationComponent from '../../../components/PaginationComponent';
import { formatDate } from '../../../functions/FormatDateFunction';
import AddModelButtonComponent from '../../../components/AddModelButtonComponent';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';

export default function DayoffList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page")

  const { data: pagedDataResultDataForDayOff, isLoading, error } = useGetDayoffsPagedSimplifiedQuery(new Pagination(Number(page)));
  const pagedDataResultForDayOff: PagedDataResult = pagedDataResultDataForDayOff as PagedDataResult;
  const dayOffs: Dayoff[] = (pagedDataResultForDayOff?.data?.content) as Dayoff[];

  const totalPages = pagedDataResultForDayOff?.data?.totalPages || 1;
  const [deleteDayoff, { data }] = useDeleteDayoffsByIdMutation();

  async function handleDelete(id: any) {
    const result = await deleteDayoff(id);
    ResolveResult(result)
  }
  const navigate = useNavigate();
  function handleNavigateToDetail(id: string) {
      navigate(navigationUrlProvider.dayoffDetailUrl + id)
  }
  function handleNavigateToUpdate(id: string) {
    navigate(navigationUrlProvider.dayoffUpdateUrl + id)
  }
return (
  <div>
    <AddModelButtonComponent buttonName={"Add Dayoff"} redirectionUrl={navigationUrlProvider.dayoffAddUrl}/>
    <Table striped className='listTable'>
      <thead>
        <tr>
          <th>Employee</th>
          <th>Begin Date</th>
          <th>End Date</th>
          <th> </th>
            <th> </th>
        </tr>
      </thead>
      <tbody>

        {dayOffs &&
          dayOffs.map((dayOff: Dayoff) => (
            <tr >
              <td onClick={() => { (handleNavigateToDetail(dayOff.id)) }}>{dayOff.employee.name} {dayOff.employee.surname}</td>
              <td onClick={() => { (handleNavigateToDetail(dayOff.id)) }}>{formatDate(dayOff.beginDate)}</td>
              <td onClick={() => { (handleNavigateToDetail(dayOff.id)) }}>{formatDate(dayOff.endDate)}</td> 
              <td>
                  
                  <Button variant="warning" onClick={() => {handleNavigateToUpdate(dayOff.id) }}>Update</Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => {handleDelete(dayOff.id)}}>
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
