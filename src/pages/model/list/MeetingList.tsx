import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetMeetingsPagedSimplifiedQuery } from '../../../features/api/meetingApi';
import { Pagination } from '../../../results/pagination/Pagination';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { Meeting } from '../../../models/base/Meeting';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { Table } from 'react-bootstrap';
import PaginationComponent from '../../../components/PaginationComponent';
import { formatDate } from '../../../functions/FormatDateFunction';
import AddModelButtonComponent from '../../../components/AddModelButtonComponent';

export default function MeetingList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page")

  const { data: pagedDataResultDataForMeetingPlatform, isLoading, error } = useGetMeetingsPagedSimplifiedQuery(new Pagination(Number(page)));
  const pagedDataResultForMeetingPlatform: PagedDataResult = pagedDataResultDataForMeetingPlatform as PagedDataResult;
  const projects: Meeting[] = (pagedDataResultForMeetingPlatform?.data?.content) as Meeting[];

  const totalPages = pagedDataResultForMeetingPlatform?.data?.totalPages || 1;
  const navigate = useNavigate();
  function handleNavigateToDetail(id: string) {
    navigate(navigationUrlProvider.meetingDetailUrl + id)
  }

  return (
    <div>
      <AddModelButtonComponent buttonName={"Add Meeting"} redirectionUrl={navigationUrlProvider.meetingAddUrl}/>
      <Table striped className='listTable'>
        <thead>
          <tr>
            <th>Meeting Owner</th>
            <th>Begin</th>
            <th>End</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {projects &&
            projects.map((meeting: Meeting) => (
              <tr onClick={() => { (handleNavigateToDetail(meeting.id)) }}>
                <td>{meeting.meetingOwner.name} {meeting.meetingOwner.surname}</td>
                <td>{formatDate(meeting.beginHour)}</td>
                <td>{formatDate(meeting.endHour)}</td>
                <td>{meeting.meetingUrl}</td>
              </tr>
            ))}

        </tbody>
      </Table>

      <PaginationComponent totalPages={totalPages} currentPage={page} />
    </div>
  );
}
