
import React from 'react'
import { Dayoff } from '../../../models/base/Dayoff';
import { DayoffPaymentStatus } from '../../../models/enums/DayoffPaymentStatus';
import { useGetDayoffByIdQuery } from '../../../features/api/dayoffApi';
import { DataResult } from '../../../results/DataResult';
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import EmployeeTableComponent from '../../../components/EmployeeTableComponent';
import { formatDate } from '../../../functions/FormatDateFunction';

export default function DayoffDetail() {
  let { id } = useParams();

  const { data: dayOffDataResultDataForDayOff, isLoading, error } = useGetDayoffByIdQuery(id || "");
  const dayOffDataResultForDayOff: DataResult<Dayoff> = dayOffDataResultDataForDayOff as DataResult<Dayoff>;
  const dayOff: Dayoff = (dayOffDataResultForDayOff?.data) as Dayoff;

  if(error){
    return(
      <div>Error</div>
    )
  }
  return (
    <div>
      {dayOff &&
        <Table striped className='detailTable'>
          <thead>
            <tr>
              <th>id</th>
              <th>{dayOff.id}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2}>
                <EmployeeTableComponent employee={dayOff.employee}/>
              </td>
            </tr>
            <tr>
              <td>Begin Date</td>
              <td>{formatDate(dayOff.beginDate)}</td>
            </tr>
            <tr>
              <td>End Date</td>
              <td>{formatDate(dayOff.endDate)}</td>
            </tr>
            <tr>
              <td>Reason</td>
              <td>{dayOff.reason}</td>
            </tr>
            <tr>
              <td>Is Paid?</td>
              <td>{dayOff.isPaid ? DayoffPaymentStatus.PAID : DayoffPaymentStatus.NOT_PAID}</td>
            </tr>
            <tr>
              <td>Created At</td>
              <td>{formatDate(dayOff.createdAt)}</td>
            </tr>
            <tr>
              <td>Updated At</td>
              <td>{formatDate(dayOff.updatedAt)}</td>
            </tr>
          </tbody>
        </Table>}
    </div>
  );
}
    