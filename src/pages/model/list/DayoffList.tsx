import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetDayoffsPagedSimplifiedQuery } from '../../../features/api/dayoffApi';
import { Pagination } from '../../../results/pagination/Pagination';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { Dayoff } from '../../../models/base/Dayoff';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { Table } from 'react-bootstrap';
import PaginationComponent from '../../../components/PaginationComponent';
import { formatDate } from '../../../functions/FormatDateFunction';
import AddModelButtonComponent from '../../../components/AddModelButtonComponent';

export default function DayoffList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page")

  const { data: pagedDataResultDataForDayOff, isLoading, error } = useGetDayoffsPagedSimplifiedQuery(new Pagination(Number(page)));
  const pagedDataResultForDayOff: PagedDataResult = pagedDataResultDataForDayOff as PagedDataResult;
  const dayOffs: Dayoff[] = (pagedDataResultForDayOff?.data?.content) as Dayoff[];

  const totalPages = pagedDataResultForDayOff?.data?.totalPages || 1;
  
  const navigate = useNavigate();
  function handleNavigateToDetail(id: string) {
      navigate(navigationUrlProvider.dayoffDetailUrl + id)
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
        </tr>
      </thead>
      <tbody>

        {dayOffs &&
          dayOffs.map((dayOff: Dayoff) => (
            <tr onClick={() => { (handleNavigateToDetail(dayOff.id)) }}>
              <td>{dayOff.employee.name} {dayOff.employee.surname}</td>
              <td>{formatDate(dayOff.beginDate)}</td>
              <td>{formatDate(dayOff.endDate)}</td> 
            </tr>
          ))}
      </tbody>
    </Table>
    <PaginationComponent totalPages={totalPages} currentPage={page}/>
  </div>
  );
}
