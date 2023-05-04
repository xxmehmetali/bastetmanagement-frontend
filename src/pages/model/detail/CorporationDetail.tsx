
import React from 'react'
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetCorporationByIdQuery } from '../../../features/api/corporationApi';
import { DataResult } from '../../../results/DataResult';
import { Corporation } from '../../../models/base/Corporation';
import { formatDate } from '../../../functions/FormatDateFunction';
import ProjectTableComponent from '../../../components/tablecomponents/ProjectTableComponent';

export default function CorporationDetail() {
  let { id } = useParams();

  const { data: corporationDataResultDataForCorporation, isLoading, error } = useGetCorporationByIdQuery(id || "");
  const corporationDataResultForCorporation: DataResult<Corporation> = corporationDataResultDataForCorporation as DataResult<Corporation>;
  const corporation: Corporation = (corporationDataResultForCorporation?.data) as Corporation;

  if(error){
    return(
      <div>Error</div>
    )
  }

  return (
    <div>
      {corporation &&
        <Table striped className='detailTable'>
          <thead>
            <tr>
              <th>id</th>
              <th>{corporation.id}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{corporation.name}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{corporation.description}</td>
            </tr>
            <tr>
              <td>Tax Number</td>
              <td>{corporation.taxNumber}</td>
            </tr>
            <tr>
              <td>Foundation Date</td>
              <td>{formatDate(corporation.foundationDate)}</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <ProjectTableComponent projectList={corporation.projects} accordionTitle={"Projects"}/>
              </td>
            </tr>           
            <tr>
              <td>Created At</td>
              <td>{formatDate(corporation.createdAt)}</td>
            </tr>
            <tr>
              <td>Created At</td>
              <td>{formatDate(corporation.updatedAt)}</td>
            </tr>
          </tbody>
        </Table>}
    </div>
  );
}
    