import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Pagination } from '../../../results/pagination/Pagination';
import PaginationComponent from '../../../components/PaginationComponent';
import { Button, Table } from 'react-bootstrap';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { useGetTasksPagedSimplifiedQuery } from '../../../features/api/taskApi';
import { Task } from '../../../models/base/Task';
import AddModelButtonComponent from '../../../components/AddModelButtonComponent';
import { useDeleteSocialActivityTypeByIdMutation } from '../../../features/api/socialActivityTypeApi';

export default function TaskList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page")

  const { data: pagedDataResultDataForTask, isLoading, error } = useGetTasksPagedSimplifiedQuery(new Pagination(Number(page)));
  const pagedDataResultForTask: PagedDataResult = pagedDataResultDataForTask as PagedDataResult;
  const tasks: Task[] = (pagedDataResultForTask?.data?.content) as Task[];

  const totalPages = pagedDataResultForTask?.data?.totalPages || 1;
  const [deleteTask, { data }] = useDeleteSocialActivityTypeByIdMutation();
  
  async function handleDelete(id: any) {
    const result = await deleteTask(id);
    //ResolveResult(result)
  }
  const navigate = useNavigate();
  function handleNavigateToDetail(id: string) {
    navigate(navigationUrlProvider.taskDetailUrl + id)
  }
  function handleNavigateToUpdate(id: string) {
    navigate(navigationUrlProvider.taskUpdateUrl + id)
  }
  return (
    <div>
      <AddModelButtonComponent buttonName={"Add Task"} redirectionUrl={navigationUrlProvider.taskAddUrl}/>
      <Table striped className='listTable'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>tags</th>
            <th>Task Status</th>
            <th>Priority</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>

          {tasks &&
            tasks.map((task: Task) => (
              <tr >
                <td onClick={() => { (handleNavigateToDetail(task.id)) }}>{task.name}</td>
                <td onClick={() => { (handleNavigateToDetail(task.id)) }}>{task.description}</td>
                <td onClick={() => { (handleNavigateToDetail(task.id)) }}>{task.tags}</td>
                <td onClick={() => { (handleNavigateToDetail(task.id)) }}>{task.taskStatus}</td>
                <td onClick={() => { (handleNavigateToDetail(task.id)) }}>{task.priority}</td>
                <td>
                  
                  <Button variant="warning" onClick={() => {handleNavigateToUpdate(task.id) }}>Update</Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => {handleDelete(task.id)}}>
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
