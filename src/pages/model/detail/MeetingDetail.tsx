
import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetMeetingByIdQuery } from '../../../features/api/meetingApi';
import { DataResult } from '../../../results/DataResult';
import { Meeting } from '../../../models/base/Meeting';
import { Table } from 'react-bootstrap';
import EmployeeTableComponent from '../../../components/tablecomponents/EmployeeTableComponent';
import { EmployeeStatus } from '../../../models/enums/EmployeeStatus';
import { formatDate } from '../../../functions/FormatDateFunction';

export default function MeetingDetail() {
  let { id } = useParams();

  const { data: meetingDataResultDataForMeeting, isLoading, error } = useGetMeetingByIdQuery(id || "");
  const meetingDataResultForMeeting: DataResult<Meeting> = meetingDataResultDataForMeeting as DataResult<Meeting>;
  const meeting: Meeting = (meetingDataResultForMeeting?.data) as Meeting;

  if (error) {
    return (
      <div>Error</div>
    )
  }

  return (
    <div>
      {meeting &&
        <Table striped className='detailTable'>
          <thead>
            MEETINGE KIMLERIN KATILDIGINI GÖREMİYORUZ. BACKENDDEN GELMİYOR. BUNA BİR BAK
            <tr>
              <th>id</th>
              <th>{meeting.id}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Begin Hour</td>
              <td>{formatDate(meeting.beginHour)}</td>
            </tr>
            <tr>
              <td>End Hour</td>
              <td>{formatDate(meeting.endHour)}</td>
            </tr>
            <tr>
              <td>Meeting Url</td>
              <td>{meeting.meetingUrl}</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <EmployeeTableComponent employee={meeting.meetingOwner} accordionTitle={EmployeeStatus.MEETING_OWNER} />
              </td>
            </tr>
            <tr>
              <td>Created At</td>
              <td>{formatDate(meeting.createdAt)}</td>
            </tr>
            <tr>
              <td>Updated At</td>
              <td>{formatDate(meeting.updatedAt)}</td>
            </tr>
          </tbody>
        </Table>}
    </div>
  );
}
