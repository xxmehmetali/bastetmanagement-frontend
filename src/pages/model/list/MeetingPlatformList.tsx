import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetMeetingPlatformsPagedSimplifiedQuery } from '../../../features/api/meetingPlatformApi';
import { Pagination } from '../../../results/pagination/Pagination';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { MeetingPlatform } from '../../../models/base/MeetingPlatform';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { Table } from 'react-bootstrap';
import PaginationComponent from '../../../components/PaginationComponent';

export default function MeetingPlatformList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page")

  const { data: pagedDataResultDataForMeetingPlatform, isLoading, error } = useGetMeetingPlatformsPagedSimplifiedQuery(new Pagination(Number(page)));
  const pagedDataResultForMeetingPlatform: PagedDataResult = pagedDataResultDataForMeetingPlatform as PagedDataResult;
  const projects: MeetingPlatform[] = (pagedDataResultForMeetingPlatform?.data?.content) as MeetingPlatform[];

  const totalPages = pagedDataResultForMeetingPlatform?.data?.totalPages || 1;
  const navigate = useNavigate();
  function handleNavigateToDetail(id: string) {
    navigate(navigationUrlProvider.meetingplatformDetailUrl + id)
  }

  return (
    <div>
      <Table striped className='listTable'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Base Url</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {projects &&
            projects.map((meetingPlatform: MeetingPlatform) => (
              <tr onClick={() => { (handleNavigateToDetail(meetingPlatform.id)) }}>
                <td>{meetingPlatform.name}</td>
                <td>{meetingPlatform.baseUrl}</td>
                <td>{meetingPlatform.description}</td>
              </tr>
            ))}

        </tbody>
      </Table>

      <PaginationComponent totalPages={totalPages} currentPage={page} />
    </div>
  );
}
