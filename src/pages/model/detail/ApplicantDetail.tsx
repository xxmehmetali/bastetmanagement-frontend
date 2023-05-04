
import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetApplicantByIdQuery } from '../../../features/api/applicantApi';
import { Applicant } from '../../../models/base/Applicant';
import { DataResult } from '../../../results/DataResult';
import { Table } from 'react-bootstrap';
import { formatDate } from '../../../functions/FormatDateFunction';
import CvTableComponent from '../../../components/tablecomponents/CvTableComponent';

export default function ApplicantDetail() {
  let { id } = useParams();

  const { data: applicantDataResultDataForApplicant, isLoading, error } = useGetApplicantByIdQuery(id || "");
  const applicantDataResultForApplicant: DataResult<Applicant> = applicantDataResultDataForApplicant as DataResult<Applicant>;
  const applicant: Applicant = (applicantDataResultForApplicant?.data) as Applicant;

  if(error){
    return(
      <div>Error</div>
    )
  }

  return (
    <div>
      {applicant &&
        <Table striped className='detailTable'>
          <thead>
            <tr>
              <th>id</th>
              <th>{applicant.id}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{applicant.name}</td>
            </tr>
            <tr>
              <td>Surname</td>
              <td>{applicant.surname}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{applicant.address}</td>
            </tr>
            <tr>
              <td>Phone Number</td>
              <td>{applicant.phoneNumber}</td>
            </tr>
            <tr>
              <td>National ID</td>
              <td>{applicant.nationalId}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{applicant.gender}</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <CvTableComponent cv={applicant.cv}/>
              </td>
            </tr>
            <tr>
              <td>HR Assessment Status</td>
              <td>{applicant.hrAssessmentStatus}</td>
            </tr>
            <tr>
              <td>Technical Assessment Status</td>
              <td>{applicant.technicalAssessmentStatus}</td>
            </tr>
            <tr>
              <td>HR Review</td>
              <td>{applicant.hrReview}</td>
            </tr>
            <tr>
              <td>Technical Review</td>
              <td>{applicant.technicalReview}</td>
            </tr>
            <tr>
              <td>Applicant Meeting XXXXXX</td>
              <td>{applicant.id}</td>
            </tr>
            <tr>
              <td>Created At</td>
              <td>{formatDate(applicant.createdAt)}</td>
            </tr>
            <tr>
              <td>Updated At</td>
              <td>{formatDate(applicant.updatedAt)}</td>
            </tr>
            {/* <tr>
              <td colSpan={2}>
              <BranchTableComponent branch={employee.branch}/>
              </td>
            </tr> */}
            {/* <tr>
              <td colSpan={2}>
                <DepartmentTableComponent department={employee.department} />
              </td>
            </tr> */}
          </tbody>
        </Table>}
    </div>
  );
}
    