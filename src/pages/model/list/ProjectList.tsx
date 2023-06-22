import React from 'react'
import { useDeleteProjectByIdMutation, useGetProjectsPagedSimplifiedQuery } from '../../../features/api/projectApi';
import { Pagination } from '../../../results/pagination/Pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { Applicant } from '../../../models/base/Applicant';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { Button, Table } from 'react-bootstrap';
import PaginationComponent from '../../../components/PaginationComponent';
import { Project } from '../../../models/base/Project';
import { formatDate } from '../../../functions/FormatDateFunction';
import AddModelButtonComponent from '../../../components/AddModelButtonComponent';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';

export default function ProjectList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page")

  const { data: pagedDataResultDataForProject, isLoading, error, isSuccess } = useGetProjectsPagedSimplifiedQuery(new Pagination(Number(page)));
  const pagedDataResultForProject: PagedDataResult = pagedDataResultDataForProject as PagedDataResult;
  const projects: Project[] = (pagedDataResultForProject?.data?.content) as Project[];

  const totalPages = pagedDataResultForProject?.data?.totalPages || 1;
  const [deleteProject, { data }] = useDeleteProjectByIdMutation();

  async function handleDelete(id: any) {
    const result = await deleteProject(id);
    //ResolveResult(result)
  }

  if (isSuccess)
    ResolveResult(pagedDataResultForProject)

  const navigate = useNavigate();
  function handleNavigateToDetail(id: string) {
    navigate(navigationUrlProvider.projectDetailUrl + id)
  }
  function handleNavigateToUpdate(id: string) {
    navigate(navigationUrlProvider.projectUpdateUrl + id)
  }

  return (
    <div>
      <AddModelButtonComponent buttonName={"Add Project"} redirectionUrl={navigationUrlProvider.projectAddUrl} />
      <Table striped className='listTable'>
        <thead>
          <tr>
            <th>Name</th>
            <th> </th>

          </tr>
        </thead>
        <tbody>
          {projects &&
            projects.map((project: Project) => (
              <tr >
                <td onClick={() => { (handleNavigateToDetail(project.id)) }}>{project.name}</td>
                <td>

                  <Button variant="warning" style={{ marginRight : "1em" }} onClick={() => {handleNavigateToUpdate(project.id) }}>Update</Button>
                  <Button variant="danger" onClick={() => {handleDelete(project.id)}}>
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
