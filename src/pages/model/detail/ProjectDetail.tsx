
import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetProjectByIdQuery } from '../../../features/api/projectApi';
import { DataResult } from '../../../results/DataResult';
import { Project } from '../../../models/base/Project';
import { Table } from 'react-bootstrap';
import { formatDate } from '../../../functions/FormatDateFunction';
import ContextTableComponent from '../../../components/ContextTableComponent';
import CorporationTableComponent from '../../../components/CorporationTableComponent';

export default function ProjectDetail() {
  let { id } = useParams();

  const { data: projectDataResultDataForProject, isLoading, error } = useGetProjectByIdQuery(id || "");
  const projectDataResultForProject: DataResult<Project> = projectDataResultDataForProject as DataResult<Project>;
  const project: Project = (projectDataResultForProject?.data) as Project;

  if (error) {
    return (
      <div>Error</div>
    )
  }

  return (
    <div>
      {project &&
        <Table striped className='detailTable'>
          <thead>
            <tr>
              <th>id</th>
              <th>{project.id}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{project.name}</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <ContextTableComponent contextList={project.contexts}/>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <CorporationTableComponent corporation={project.corporation} />
              </td>
            </tr>
            <tr>
              <td>Created At</td>
              <td>{formatDate(project.createdAt)}</td>
            </tr>
            <tr>
              <td>Updated At</td>
              <td>{formatDate(project.updatedAt)}</td>
            </tr>
          </tbody>
        </Table>}
    </div>
  );
}
    