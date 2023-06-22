import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Pagination } from '../../../results/pagination/Pagination';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { Task } from '../../../models/base/Task';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import {Button, Table} from 'react-bootstrap';
import PaginationComponent from '../../../components/PaginationComponent';
import { useGetSocialActivityTypesPagedSimplifiedQuery, useDeleteSocialActivityTypeByIdMutation } from '../../../features/api/socialActivityTypeApi';
import { SocialActivityType } from '../../../models/base/SocialActivityType';
import AddModelButtonComponent from '../../../components/AddModelButtonComponent';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';

export default function SocialActivityTypeList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page")

    const { data: pagedDataResultDataForSocialActivityType, isLoading, error, isSuccess } = useGetSocialActivityTypesPagedSimplifiedQuery(new Pagination(Number(page)));
    const pagedDataResultForSocialActivityType: PagedDataResult = pagedDataResultDataForSocialActivityType as PagedDataResult;
    const socialActivityTypes: SocialActivityType[] = (pagedDataResultForSocialActivityType?.data?.content) as SocialActivityType[];

    const totalPages = pagedDataResultForSocialActivityType?.data?.totalPages || 1;
  
    if (isSuccess)
      ResolveResult(pagedDataResultForSocialActivityType)

  const [deleteSocialActivityType, { data }] =
    useDeleteSocialActivityTypeByIdMutation();

  async function handleDelete(id: any) {
    const result = await deleteSocialActivityType(id);
    //ResolveResult(result)
  }
  const navigate = useNavigate();
  function handleNavigateToDetail(id: string) {
    navigate(navigationUrlProvider.socialActivityTypeDetailUrl + id);
  }
  function handleNavigateToUpdate(id: string) {
    navigate(navigationUrlProvider.socialActivityTypeUpdateUrl + id)
  }
  return (
    <div>
      <AddModelButtonComponent
        buttonName={"Add Social Activity Type"}
        redirectionUrl={navigationUrlProvider.socialActivityTypeAddUrl}
      />
      <Table striped className="listTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>

            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {socialActivityTypes &&
            socialActivityTypes.map(
              (socialActivityType: SocialActivityType) => (
                <tr>
                  <td
                    onClick={() => {
                      handleNavigateToDetail(socialActivityType.id);
                    }}
                  >
                    {socialActivityType.name}
                  </td>
                  <td
                    onClick={() => {
                      handleNavigateToDetail(socialActivityType.id);
                    }}
                  >
                    {socialActivityType.description}
                  </td>
                  <td>
                    <Button variant="warning" onClick={() => {handleNavigateToUpdate(socialActivityType.id) }}>Update</Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => {
                        handleDelete(socialActivityType.id);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </Table>

      <PaginationComponent totalPages={totalPages} currentPage={page} />
    </div>
  );
}
