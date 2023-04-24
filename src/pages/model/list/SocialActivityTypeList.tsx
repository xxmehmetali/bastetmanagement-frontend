import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Pagination } from '../../../results/pagination/Pagination';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { Task } from '../../../models/base/Task';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { Table } from 'react-bootstrap';
import PaginationComponent from '../../../components/PaginationComponent';
import { useGetSocialActivityTypesPagedSimplifiedQuery } from '../../../features/api/socialActivityTypeApi';
import { SocialActivityType } from '../../../models/base/SocialActivityType';

export default function SocialActivityTypeList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page")

    const { data: pagedDataResultDataForSocialActivityType, isLoading, error } = useGetSocialActivityTypesPagedSimplifiedQuery(new Pagination(Number(page)));
    const pagedDataResultForSocialActivityType: PagedDataResult = pagedDataResultDataForSocialActivityType as PagedDataResult;
    const socialActivityTypes: SocialActivityType[] = (pagedDataResultForSocialActivityType?.data?.content) as SocialActivityType[];

    const totalPages = pagedDataResultForSocialActivityType?.data?.totalPages || 1;
  
    const navigate = useNavigate();
    function handleNavigateToDetail(id: string) {
        navigate(navigationUrlProvider.socialActivityTypeDetailUrl + id)
    }
  return (
    <div>
    <Table striped className='listTable'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>

        {socialActivityTypes &&
          socialActivityTypes.map((socialActivityType: SocialActivityType) => (
            <tr onClick={() => { (handleNavigateToDetail(socialActivityType.id)) }}>
              <td>{socialActivityType.name}</td>
              <td>{socialActivityType.description}</td>
            </tr>
          ))}

      </tbody>
    </Table>

    <PaginationComponent totalPages={totalPages} currentPage={page}/>
  </div>
  );
}
