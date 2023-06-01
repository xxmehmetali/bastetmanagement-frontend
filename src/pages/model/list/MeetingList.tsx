import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDeleteMeetingByIdMutation, useGetMeetingsPagedSimplifiedQuery } from '../../../features/api/meetingApi';
import { Pagination } from '../../../results/pagination/Pagination';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { Meeting } from '../../../models/base/Meeting';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { Button, Table } from 'react-bootstrap';
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
  const [deleteMeeting, { data }] = useDeleteMeetingByIdMutation();

  async function handleDelete(id: any) {
    const result = await deleteMeeting(id);
    //ResolveResult(result)
  }
  const navigate = useNavigate();
  function handleNavigateToDetail(id: string) {
    navigate(navigationUrlProvider.meetingDetailUrl + id)
  }
  function handleNavigateToUpdate(id: string) {
    navigate(navigationUrlProvider.meetingUpdateUrl + id)
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
              <tr >
                <td onClick={() => { (handleNavigateToDetail(meeting.id)) }}>{meeting.meetingOwner.name} {meeting.meetingOwner.surname}</td>
                <td onClick={() => { (handleNavigateToDetail(meeting.id)) }}>{formatDate(meeting.beginHour)}</td>
                <td onClick={() => { (handleNavigateToDetail(meeting.id)) }}>{formatDate(meeting.endHour)}</td>
                <td onClick={() => { (handleNavigateToDetail(meeting.id)) }}>{meeting.meetingUrl}</td>
                <td>
                  
                  <Button variant="warning" onClick={() => {handleNavigateToUpdate(meeting.id) }}>Update</Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => {handleDelete(meeting.id)}}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}

        </tbody>
      </Table>

      <PaginationComponent totalPages={totalPages} currentPage={page} />
    </div>
  );
}
