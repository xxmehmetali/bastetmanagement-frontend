import React from 'react'
import { useDeleteApplicantMeetingByIdMutation, useGetApplicantMeetingsPagedSimplifiedQuery } from '../../../features/api/applicantMeetingApi';
import { Pagination } from '../../../results/pagination/Pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { ApplicantMeeting } from '../../../models/base/ApplicantMeeting';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { Button, Table } from 'react-bootstrap';
import PaginationComponent from '../../../components/PaginationComponent';
import { formatDate } from '../../../functions/FormatDateFunction';
import AddModelButtonComponent from '../../../components/AddModelButtonComponent';

export default function ApplicantMeetingList() {
  const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page")

    const { data: pagedDataResultDataForApplicantMeeting, isLoading, error } = useGetApplicantMeetingsPagedSimplifiedQuery(new Pagination(Number(page)));
    const pagedDataResultForApplicantMeeting: PagedDataResult = pagedDataResultDataForApplicantMeeting as PagedDataResult;
    const applicantMeetings : ApplicantMeeting[] = (pagedDataResultForApplicantMeeting?.data?.content) as ApplicantMeeting[];

    const totalPages = pagedDataResultForApplicantMeeting?.data?.totalPages || 1;
    const [deleteApplicantMeeting, { data }] = useDeleteApplicantMeetingByIdMutation();

    async function handleDelete(id : any) {
      const result = await deleteApplicantMeeting(id)
      //ResolveResult(result)
    }
    function handleNavigateToUpdate(id: string) {
      navigate(navigationUrlProvider.applicatMeetingUpdateUrl + id)
    }

    const navigate = useNavigate();
    function handleNavigateToDetail(id: string) {
        navigate(navigationUrlProvider.applicantmeetingDetailUrl + id)
    }

  return (
    <div> 
      <AddModelButtonComponent buttonName={"Add Applicant Meeting"} redirectionUrl={navigationUrlProvider.applicantmeetingAddUrl}/>
      <Table striped className='listTable'>
    <thead>
      <tr>
        <th>Meeting Owner</th>
        <th>Meeting Platform</th>
        <th>Begin Hour</th>
        <th>End Hour</th>
        <th> </th>
        <th> </th>

      </tr>
    </thead>
    <tbody>

      {applicantMeetings &&
        applicantMeetings.map((applicantMeetings: ApplicantMeeting) => (
          <tr>
            <td onClick={() => { (handleNavigateToDetail(applicantMeetings.id)) }}>{applicantMeetings.meetingOwner.name} {applicantMeetings.meetingOwner.surname}</td>
            <td onClick={() => { (handleNavigateToDetail(applicantMeetings.id)) }}>{applicantMeetings.meetingPlatform.name}</td>
            <td onClick={() => { (handleNavigateToDetail(applicantMeetings.id)) }}>{formatDate(applicantMeetings.beginHour)}</td>
            <td onClick={() => { (handleNavigateToDetail(applicantMeetings.id)) }}>{formatDate(applicantMeetings.endHour)}</td>
            <td>                 
                  <Button variant="warning" onClick={() => {handleNavigateToUpdate(applicantMeetings.id) }} >
                    Update
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => {handleDelete(applicantMeetings.id)}}>Delete</Button>
                </td>
          </tr>
        ))}

    </tbody>
    </Table>

    <PaginationComponent totalPages={totalPages} currentPage={page}/>
    
    </div>
  );
}
