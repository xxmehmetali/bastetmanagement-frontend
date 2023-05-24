import React from 'react'
import { useGetProjectsPagedSimplifiedQuery } from '../../../features/api/projectApi';
import { Pagination } from '../../../results/pagination/Pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { Applicant } from '../../../models/base/Applicant';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { Table } from 'react-bootstrap';
import PaginationComponent from '../../../components/PaginationComponent';
import { Project } from '../../../models/base/Project';
import { formatDate } from '../../../functions/FormatDateFunction';
import AddModelButtonComponent from '../../../components/AddModelButtonComponent';

export default function ProjectList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page")

  const { data: pagedDataResultDataForProject, isLoading, error } = useGetProjectsPagedSimplifiedQuery(new Pagination(Number(page)));
  const pagedDataResultForProject: PagedDataResult = pagedDataResultDataForProject as PagedDataResult;
  const projects: Project[] = (pagedDataResultForProject?.data?.content) as Project[];

  const totalPages = pagedDataResultForProject?.data?.totalPages || 1;
  const navigate = useNavigate();
  function handleNavigateToDetail(id: string) {
    navigate(navigationUrlProvider.projectDetailUrl + id)
  }

  return (
    <div>
      <AddModelButtonComponent buttonName={"Add Project"} redirectionUrl={navigationUrlProvider.projectAddUrl}/>
      <Table striped className='listTable'>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {projects &&
            projects.map((project: Project) => (
              <tr onClick={() => { (handleNavigateToDetail(project.id)) }}>
                <td>{project.name}</td>
              </tr>
            ))}

        </tbody>
      </Table>

      <PaginationComponent totalPages={totalPages} currentPage={page} />
    </div>
  );
}
