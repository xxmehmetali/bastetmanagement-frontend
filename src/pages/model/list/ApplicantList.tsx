import React from "react";
import { Button, Table } from "react-bootstrap";
import { Pagination } from "../../../results/pagination/Pagination";
import {
  useDeleteApplicantByIdMutation,
  useGetApplicantsPagedSimplifiedQuery,
} from "../../../features/api/applicantApi";
import { PagedDataResult } from "../../../results/PagedDataResult";
import { Applicant } from "../../../models/base/Applicant";
import { useNavigate, useSearchParams } from "react-router-dom";
import navigationUrlProvider from "../../../providers/navigationUrlProvider";
import PaginationComponent from "../../../components/PaginationComponent";
import AddModelButtonComponent from "../../../components/AddModelButtonComponent";
import Modal from "react-bootstrap/Modal";

export default function ApplicantList() {
  //error varsa toastr ile uyarı göster
  //loading ise jsx içinde yükleniyor işareti göster
  //burada gelen veri simplified olmalı.
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");

  const {
    data: pagedDataResultDataForApplicant,
    isLoading,
    error,
  } = useGetApplicantsPagedSimplifiedQuery(new Pagination(Number(page)));
  const pagedDataResultForEmployee: PagedDataResult =
    pagedDataResultDataForApplicant as PagedDataResult;
  const applicants: Applicant[] = pagedDataResultForEmployee?.data
    ?.content as Applicant[];

  const totalPages = pagedDataResultForEmployee?.data?.totalPages || 1;
  const [deleteApplicant, { data }] = useDeleteApplicantByIdMutation();

  async function handleDelete(id: any) {
    const result = await deleteApplicant(id);
    //ResolveResult(result)
  }

  const navigate = useNavigate();
  function handleNavigateToDetail(id: string) {
    navigate(navigationUrlProvider.applicantDetailUrl + id);
  }
  function handleNavigateToUpdate(id: string) {
    navigate(navigationUrlProvider.applicantUpdateUrl + id)
  }


  return (
    <div>
      <AddModelButtonComponent
        buttonName={"Add Applicant"}
        redirectionUrl={navigationUrlProvider.applicantAddUrl}
      />
      <Table striped className="listTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Phone Number</th>
            <th>Sex</th>
            <th>HR Assessment Status</th>
            <th>Technical Assessment Status</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {applicants &&
            applicants.map((applicant: Applicant) => (
              <tr>
                <td
                  onClick={() => {
                    handleNavigateToDetail(applicant.id);
                  }}
                >
                  {applicant.name}
                </td>
                <td
                  onClick={() => {
                    handleNavigateToDetail(applicant.id);
                  }}
                >
                  {applicant.surname}
                </td>
                <td
                  onClick={() => {
                    handleNavigateToDetail(applicant.id);
                  }}
                >
                  {applicant.phoneNumber}
                </td>
                <td
                  onClick={() => {
                    handleNavigateToDetail(applicant.id);
                  }}
                >
                  {applicant.gender}
                </td>
                <td
                  onClick={() => {
                    handleNavigateToDetail(applicant.id);
                  }}
                >
                  {applicant.hrAssessmentStatus}
                </td>
                <td
                  onClick={() => {
                    handleNavigateToDetail(applicant.id);
                  }}
                >
                  {applicant.technicalAssessmentStatus}
                </td>
                <td>
                  
                  <Button variant="warning" onClick={() => {handleNavigateToUpdate(applicant.id) }}>Update</Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => {handleDelete(applicant.id)}}>
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
