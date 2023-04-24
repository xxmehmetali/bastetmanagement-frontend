
import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetMeetingPlatformByIdQuery } from '../../../features/api/meetingPlatformApi';
import { DataResult } from '../../../results/DataResult';
import { MeetingPlatform } from '../../../models/base/MeetingPlatform';
import { Table } from 'react-bootstrap';
import { formatDate } from '../../../functions/FormatDateFunction';

export default function MeetingPlatformDetail() {
  let { id } = useParams();

  const { data: meetingPlatformnDataResultDataForMeetingPlatform, isLoading, error } = useGetMeetingPlatformByIdQuery(id || "");
  const meetingPlatformDataResultForMeetingPlatform: DataResult<MeetingPlatform> = meetingPlatformnDataResultDataForMeetingPlatform as DataResult<MeetingPlatform>;
  const meetingPlatform: MeetingPlatform = (meetingPlatformDataResultForMeetingPlatform?.data) as MeetingPlatform;

  if (error) {
    return (
      <div>Error</div>
    )
  }

  return (
    <div>
      {meetingPlatform &&
        <Table striped className='detailTable'>
          <thead>
            <tr>
              <th>id</th>
              <th>{meetingPlatform.id}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{meetingPlatform.name}</td>
            </tr>
            <tr>
              <td>Base Url</td>
              <td>{meetingPlatform.baseUrl}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{meetingPlatform.description}</td>
            </tr>
            <tr>
              <td>Created At</td>
              <td>{formatDate(meetingPlatform.createdAt)}</td>
            </tr>
            <tr>
              <td>Updated At</td>
              <td>{formatDate(meetingPlatform.updatedAt)}</td>
            </tr>
          </tbody>
        </Table>}
    </div>
  );
}
    