import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Pagination } from '../../../results/pagination/Pagination';
import PaginationComponent from '../../../components/PaginationComponent';
import { Table } from 'react-bootstrap';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { PagedDataResult } from '../../../results/PagedDataResult';
import { useGetTasksPagedSimplifiedQuery } from '../../../features/api/taskApi';
import { Task } from '../../../models/base/Task';

export default function TaskList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page")

  const { data: pagedDataResultDataForTask, isLoading, error } = useGetTasksPagedSimplifiedQuery(new Pagination(Number(page)));
  const pagedDataResultForTask: PagedDataResult = pagedDataResultDataForTask as PagedDataResult;
  const tasks: Task[] = (pagedDataResultForTask?.data?.content) as Task[];

  const totalPages = pagedDataResultForTask?.data?.totalPages || 1;

  const navigate = useNavigate();
  function handleNavigateToDetail(id: string) {
    navigate(navigationUrlProvider.taskDetailUrl + id)
  }
  return (
    <div>
      <Table striped className='listTable'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>tags</th>
            <th>Task Status</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>

          {tasks &&
            tasks.map((task: Task) => (
              <tr onClick={() => { (handleNavigateToDetail(task.id)) }}>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.tags}</td>
                <td>{task.taskStatus}</td>
                <td>{task.priority}</td>
              </tr>
            ))}

        </tbody>
      </Table>

      <PaginationComponent totalPages={totalPages} currentPage={page} />
    </div>
  );
}
