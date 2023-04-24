
import React from 'react'
import { useGetApplicantMeetingByIdQuery } from '../../../features/api/applicantMeetingApi';
import { DataResult } from '../../../results/DataResult';
import { ApplicantMeeting } from '../../../models/base/ApplicantMeeting';
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { formatDate } from '../../../functions/FormatDateFunction';
import EmployeeTableComponent from '../../../components/EmployeeTableComponent';
import { EmployeeStatus } from '../../../models/enums/EmployeeStatus';
import MeetingPlatformTableComponent from '../../../components/MeetingPlatformTableComponent';

export default function ApplicantMeetingDetail() {
  let { id } = useParams();

  const { data: applicantMeetingDataResultDataForApplicant, isLoading, error } = useGetApplicantMeetingByIdQuery(id || "");
  const applicantMeetingDataResultForApplicantMeeting: DataResult<ApplicantMeeting> = applicantMeetingDataResultDataForApplicant as DataResult<ApplicantMeeting>;
  const applicantMeeting: ApplicantMeeting = (applicantMeetingDataResultForApplicantMeeting?.data) as ApplicantMeeting;

  if(error){
    return(
      <div>Error</div>
    )
  }

  return (
    <div>
      {applicantMeeting &&
        <Table striped className='detailTable'>
          <thead>
            <tr>
              <th>id</th>
              <th>{applicantMeeting.id}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Begin Hour</td>
              <td>{formatDate(applicantMeeting.beginHour)}</td>
            </tr> 
            <tr>
              <td>End Hour</td>
              <td>{formatDate(applicantMeeting.endHour)}</td>
            </tr> 
            <tr>
              <td colSpan={2}>
                <EmployeeTableComponent employee={applicantMeeting.meetingOwner} accordionTitle={EmployeeStatus.MEETING_OWNER} />
              </td>
            </tr> 
            <tr>
              <td colSpan={2}>
                <MeetingPlatformTableComponent meetingPlatform={applicantMeeting.meetingPlatform} />
              </td>
            </tr> 
            <tr>
              <td>Created At</td>
              <td>{formatDate(applicantMeeting.createdAt)}</td>
            </tr>
            <tr>
              <td>Updated At</td>
              <td>{formatDate(applicantMeeting.updatedAt)}</td>
            </tr>
            
          </tbody>
        </Table>}
    </div>
  );
}
    