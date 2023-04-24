
import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetSocialActivityTypeByIdQuery } from '../../../features/api/socialActivityTypeApi';
import { DataResult } from '../../../results/DataResult';
import { SocialActivityType } from '../../../models/base/SocialActivityType';
import { Table } from 'react-bootstrap';

export default function SocialActivityTypeDetail() {
  let { id } = useParams();

  const { data: socialActivityTypeDataResultDataForSocialActivityType, isLoading, error } = useGetSocialActivityTypeByIdQuery(id || "");
  const socialActivityTypeDataResultForSocialActivityType: DataResult<SocialActivityType> = socialActivityTypeDataResultDataForSocialActivityType as DataResult<SocialActivityType>;
  const socialActivityType: SocialActivityType = (socialActivityTypeDataResultForSocialActivityType?.data) as SocialActivityType;

  if (error) {
    return (
      <div>Error</div>
    )
  }

  return (
    <div>
      {socialActivityType &&
        <Table striped className='detailTable'>
          <thead>
            <tr>
              <th>id</th>
              <th>{socialActivityType.id}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{socialActivityType.name}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{socialActivityType.description}</td>
            </tr>
          </tbody>
        </Table>}
    </div>
  );
}
    