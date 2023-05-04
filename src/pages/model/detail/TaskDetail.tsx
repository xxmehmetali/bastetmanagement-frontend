
import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetTaskByIdQuery } from '../../../features/api/taskApi';
import { Task } from '../../../models/base/Task';
import { DataResult } from '../../../results/DataResult';
import { Table } from 'react-bootstrap';
import EmployeeTableComponent from '../../../components/tablecomponents/EmployeeTableComponent';
import { EmployeeStatus } from '../../../models/enums/EmployeeStatus';
import ContextTableComponent from '../../../components/tablecomponents/ContextTableComponent';
//OK
export default function TaskDetail() {
  let { id } = useParams();

  const { data: taskDataResultDataForTask, isLoading, error } = useGetTaskByIdQuery(id || "");
  const taskDataResultForTask: DataResult<Task> = taskDataResultDataForTask as DataResult<Task>;
  const task: Task = (taskDataResultForTask?.data) as Task;

  if(error){
    return(
      <div>Error</div>
    )
  }

  return (
    <div>
      {task &&
        <Table striped className='detailTable'>
          <thead>
            <tr>
              <th>id</th>
              <th>{task.id}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{task.name}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{task.description}</td>
            </tr>
            <tr>
              <td>Task Status</td>
              <td>{task.taskStatus}</td>
            </tr>
            <tr>
              <td>Priority</td>
              <td>{task.priority}</td>
            </tr>
            <tr>
              <td>Tags</td>
              <td>{task.tags}</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <EmployeeTableComponent employee={task.assignedFrom} accordionTitle={EmployeeStatus.ASSIGNED_FROM}/>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <EmployeeTableComponent employee={task.assignedTo} accordionTitle={EmployeeStatus.ASSIGNED_TO}/>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <EmployeeTableComponent employee={task.reviewer} accordionTitle={EmployeeStatus.REVIEWER}/>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <ContextTableComponent context={task.context} />
              </td>
            </tr>
          </tbody>
        </Table>}
    </div>
  );
}
    