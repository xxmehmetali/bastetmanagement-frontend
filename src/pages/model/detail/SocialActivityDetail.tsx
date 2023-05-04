
import React from 'react'
import { useGetSocialActivityByIdQuery } from '../../../features/api/socialActivityApi';
import { DataResult } from '../../../results/DataResult';
import { SocialActivity } from '../../../models/base/SocialActivity';
import { Table } from 'react-bootstrap';
import { formatDate } from '../../../functions/FormatDateFunction';
import { useParams } from 'react-router-dom';
import EmployeeTableComponent from '../../../components/tablecomponents/EmployeeTableComponent';
import ExpenseTableComponent from '../../../components/tablecomponents/ExpenseTableComponent';
import SocialActivityTypeTableComponent from '../../../components/tablecomponents/SocialActivityTypeTableComponent';

export default function SocialActivityDetail() {
  let { id } = useParams();

  const { data: socialActivityDataResultDataForSocialActivity, isLoading, error } = useGetSocialActivityByIdQuery(id || "");
  const socialActivityDataResultForSocialActivity: DataResult<SocialActivity> = socialActivityDataResultDataForSocialActivity as DataResult<SocialActivity>;
  const socialActivity: SocialActivity = (socialActivityDataResultForSocialActivity?.data) as SocialActivity;

  if (error) {
    return (
      <div>Error</div>
    )
  }

  return (
    <div>
      {socialActivity &&
        <Table striped className='detailTable'>
          <thead>
            <tr>
              <th>id</th>
              <th>{socialActivity.id}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{socialActivity.name}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{socialActivity.description}</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>{formatDate(socialActivity.date)}</td>
            </tr>
            <tr>
              <td colSpan={2}>
                {socialActivity.employees.length > 0 ?
                  <EmployeeTableComponent employeeList={socialActivity.employees} accordionTitle={"Employees Attended"} />
                  :
                  "No Attendants For This Social Activity !"
                }

              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <ExpenseTableComponent expense={socialActivity.expense} />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <SocialActivityTypeTableComponent socialActivityType={socialActivity.socialActivityType} />
              </td>
            </tr>

          </tbody>
        </Table>}
    </div>
  );
}
