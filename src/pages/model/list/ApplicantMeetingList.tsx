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
import { ResolveResult } from '../../../functions/toastify/ResolveResult';

export default function ApplicantMeetingList() {
  const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page")

    const { data: pagedDataResultDataForApplicantMeeting, isLoading, error, isSuccess, status } = useGetApplicantMeetingsPagedSimplifiedQuery(new Pagination(Number(page)));
    const pagedDataResultForApplicantMeeting: PagedDataResult = pagedDataResultDataForApplicantMeeting as PagedDataResult;
    const applicantMeetings : ApplicantMeeting[] = (pagedDataResultForApplicantMeeting?.data?.content) as ApplicantMeeting[];

    //isSuccess just indicates that the request is made successfuly. But Inside of the response, there may be result:error.
    if(isSuccess)
      ResolveResult(pagedDataResultForApplicantMeeting)

    const totalPages = pagedDataResultForApplicantMeeting?.data?.totalPages || 1;
    const [deleteApplicantMeeting, { data }] = useDeleteApplicantMeetingByIdMutation();

    async function handleDelete(id : any) {
      console.log(id);
      const result = await deleteApplicantMeeting(id)
      ResolveResult(result)
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
        applicantMeetings.map((applicantMeeting: ApplicantMeeting) => (
          <tr key={applicantMeeting.id}>
            <td onClick={() => { (handleNavigateToDetail(applicantMeeting.id)) }}>{applicantMeeting.meetingOwner.name} {applicantMeeting.meetingOwner.surname}</td>
            <td onClick={() => { (handleNavigateToDetail(applicantMeeting.id)) }}>{applicantMeeting.meetingPlatform.name}</td>
            <td onClick={() => { (handleNavigateToDetail(applicantMeeting.id)) }}>{formatDate(applicantMeeting.beginHour)}</td>
            <td onClick={() => { (handleNavigateToDetail(applicantMeeting.id)) }}>{formatDate(applicantMeeting.endHour)}</td>
            <td>                 
                  <Button variant="warning" onClick={() => {handleNavigateToUpdate(applicantMeeting.id) }} >
                    Update
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => {handleDelete(applicantMeeting.id)}}>Delete</Button>
                </td>
          </tr>
        ))}

    </tbody>
    </Table>

    <PaginationComponent totalPages={totalPages} currentPage={page}/>
    
    </div>
  );
}
