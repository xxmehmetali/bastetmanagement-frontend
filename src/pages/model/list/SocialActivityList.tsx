import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Pagination } from '../../../results/pagination/Pagination';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { SocialActivity } from '../../../models/base/SocialActivity';
import { useGetSocialActivitiesPagedSimplifiedQuery } from '../../../features/api/socialActivityApi';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { Table } from 'react-bootstrap';
import PaginationComponent from '../../../components/PaginationComponent';
import { formatDate } from '../../../functions/FormatDateFunction';

export default function SocialActivityList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page")

  const { data: pagedDataResultDataForSocialActivities, isLoading, error } = useGetSocialActivitiesPagedSimplifiedQuery(new Pagination(Number(page)));
  const pagedDataResultForSocialActivities: PagedDataResult = pagedDataResultDataForSocialActivities as PagedDataResult;
  const socialActivities: SocialActivity[] = (pagedDataResultForSocialActivities?.data?.content) as SocialActivity[];

  const totalPages = pagedDataResultForSocialActivities?.data?.totalPages || 1;
  


  const navigate = useNavigate();
  function handleNavigateToDetail(id: string) {
      navigate(navigationUrlProvider.socialActivityDetailUrl + id)
  }
  return (
    <div>
      <Table striped className='listTable'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Place</th>
          </tr>
        </thead>
        <tbody>
          {socialActivities &&
            socialActivities.map((socialActivity: SocialActivity) => (
              <tr onClick={() => { (handleNavigateToDetail(socialActivity.id)) }}>
                <td>{socialActivity.name}</td>
                <td>{socialActivity.description}</td>
                <td>{formatDate(socialActivity.date)}</td>
                <td>{socialActivity.place}</td>
              </tr>
            ))}
        </tbody>
      </Table>

      <PaginationComponent totalPages={totalPages} currentPage={page}/>
    </div>
  );
}
