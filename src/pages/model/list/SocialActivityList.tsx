import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Pagination } from '../../../results/pagination/Pagination';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { SocialActivity } from '../../../models/base/SocialActivity';
import { useDeleteSocialActivityByIdMutation, useGetSocialActivitiesPagedSimplifiedQuery } from '../../../features/api/socialActivityApi';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { Button, Table } from 'react-bootstrap';
import PaginationComponent from '../../../components/PaginationComponent';
import { formatDate } from '../../../functions/FormatDateFunction';
import AddModelButtonComponent from '../../../components/AddModelButtonComponent';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';

export default function SocialActivityList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page")

  const { data: pagedDataResultDataForSocialActivities, isLoading, error, isSuccess } = useGetSocialActivitiesPagedSimplifiedQuery(new Pagination(Number(page)));
  const pagedDataResultForSocialActivities: PagedDataResult = pagedDataResultDataForSocialActivities as PagedDataResult;
  const socialActivities: SocialActivity[] = (pagedDataResultForSocialActivities?.data?.content) as SocialActivity[];

  const totalPages = pagedDataResultForSocialActivities?.data?.totalPages || 1;

  const [deleteSocialActivity, { data }] = useDeleteSocialActivityByIdMutation();
  async function handleDelete(id : any) {
    const result = await deleteSocialActivity(id)
    //ResolveResult(result)
  }

  if (isSuccess)
    ResolveResult(pagedDataResultForSocialActivities)

  const navigate = useNavigate();
  function handleNavigateToDetail(id: string) {
      navigate(navigationUrlProvider.socialActivityDetailUrl + id)
  }
  function handleNavigateToUpdate(id: string) {
    navigate(navigationUrlProvider.socialActivityUpdateUrl + id)
  }
  return (
    <div>
      <AddModelButtonComponent buttonName={"Add Social Activity"} redirectionUrl={navigationUrlProvider.socialActivityAddUrl}/>
      <Table striped className='listTable'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Place</th>
            <th> </th>
            <th> </th>

          </tr>
        </thead>
        <tbody>
          {socialActivities &&
            socialActivities.map((socialActivity: SocialActivity) => (
              <tr>
                <td  onClick={() => { (handleNavigateToDetail(socialActivity.id)) }}>{socialActivity.name}</td>
                <td  onClick={() => { (handleNavigateToDetail(socialActivity.id)) }}>{socialActivity.description}</td>
                <td  onClick={() => { (handleNavigateToDetail(socialActivity.id)) }}>{formatDate(socialActivity.date)}</td>
                <td  onClick={() => { (handleNavigateToDetail(socialActivity.id)) }}>{socialActivity.place}</td>
                <td>

                  <Button variant="warning" onClick={() => {handleNavigateToUpdate(socialActivity.id) }} >
                    Update
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => {handleDelete(socialActivity.id)}}>Delete</Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <PaginationComponent totalPages={totalPages} currentPage={page}/>
    </div>
  );
}
