import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDeleteMeetingPlatformsByIdMutation, useGetMeetingPlatformsPagedSimplifiedQuery } from '../../../features/api/meetingPlatformApi';
import { Pagination } from '../../../results/pagination/Pagination';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { MeetingPlatform } from '../../../models/base/MeetingPlatform';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { Button, Table } from 'react-bootstrap';
import PaginationComponent from '../../../components/PaginationComponent';
import AddModelButtonComponent from '../../../components/AddModelButtonComponent';

export default function MeetingPlatformList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page")

  const { data: pagedDataResultDataForMeetingPlatform, isLoading, error } = useGetMeetingPlatformsPagedSimplifiedQuery(new Pagination(Number(page)));
  const pagedDataResultForMeetingPlatform: PagedDataResult = pagedDataResultDataForMeetingPlatform as PagedDataResult;
  const projects: MeetingPlatform[] = (pagedDataResultForMeetingPlatform?.data?.content) as MeetingPlatform[];

  const totalPages = pagedDataResultForMeetingPlatform?.data?.totalPages || 1;
  const [deleteMeetingPlatform, { data }] = useDeleteMeetingPlatformsByIdMutation();

  async function handleDelete(id: any) {
    const result = await deleteMeetingPlatform(id);
    //ResolveResult(result)
  }
  const navigate = useNavigate();
  function handleNavigateToDetail(id: string) {
    navigate(navigationUrlProvider.meetingplatformDetailUrl + id)
  }
  function handleNavigateToUpdate(id: string) {
    navigate(navigationUrlProvider.meetingPlatformUpdateUrl + id)
  }
  return (
    <div>
      <AddModelButtonComponent buttonName={"Add Meeting Platform"} redirectionUrl={navigationUrlProvider.meetingplatformAddUrl}/>
      <Table striped className='listTable'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Base Url</th>
            <th>Description</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {projects &&
            projects.map((meetingPlatform: MeetingPlatform) => (
              <tr>
                <td onClick={() => { (handleNavigateToDetail(meetingPlatform.id)) }}>{meetingPlatform.name}</td>
                <td onClick={() => { (handleNavigateToDetail(meetingPlatform.id)) }}>{meetingPlatform.baseUrl}</td>
                <td onClick={() => { (handleNavigateToDetail(meetingPlatform.id)) }}>{meetingPlatform.description}</td>
                <td>
                  
                  <Button variant="warning" onClick={() => {handleNavigateToUpdate(meetingPlatform.id) }}>Update</Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => {handleDelete(meetingPlatform.id)}}>
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
