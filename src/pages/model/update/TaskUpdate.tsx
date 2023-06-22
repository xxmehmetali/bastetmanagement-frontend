import { Formik } from 'formik';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';
import * as yup from "yup";
import { Button, Form } from 'react-bootstrap';
import CustomInput from '../../../components/customFormElements/CustomInput';
import CustomSelect from '../../../components/customFormElements/CustomSelect';
import { ToTitleCase } from '../../../functions/ToTitleCase';
import { useAddTaskMutation, useGetTaskByIdQuery } from '../../../features/api/taskApi';
import { TaskSelectElement } from '../../../models/frontdtos/TaskSelectElement';
import { GetTasksSelectElements } from '../../../providers/SelectElementProviders/GetTaskSelectElements';
import { EmployeeSelectElement } from '../../../models/frontdtos/EmployeeSelectElement';
import { GetEmployeeSelectElements } from '../../../providers/SelectElementProviders/GetEmployeeSelectElements';
import { GetContextsSelectElements } from '../../../providers/SelectElementProviders/GetContextSelectElements';
import { ContextSelectElement } from '../../../models/frontdtos/CotextSelectElement';
import { taskInitialValue } from '../../../yup_schemas/initialValues/taskInitialValue';
import { Priority } from '../../../models/enums/Priority';
import { TaskStatus } from '../../../models/enums/TaskStatus';
import { useParams } from 'react-router-dom';
import { DataResult } from '../../../results/DataResult';
import { Task } from '../../../models/base/Task';

export default function TaskUpdate() {
    let { id } = useParams();

    const { data: taskDataResultDataForTask } = useGetTaskByIdQuery(id || "");
    const taskDataResultForTask: DataResult<Task> = taskDataResultDataForTask as DataResult<Task>;
    const task: Task = (taskDataResultForTask?.data) as Task;


    const [addTask, { data, isLoading }] = useAddTaskMutation();
    async function onSubmit(values: any, actions: any) {
        console.log(values)
        const result = await addTask(values)
        actions.resetForm();
        ResolveResult(result)
    }
    const taskSelectElementList: TaskSelectElement[] = GetTasksSelectElements();
    const assignedFromSelectElementList: EmployeeSelectElement[] = GetEmployeeSelectElements();
    const assignedToSelectElementList: EmployeeSelectElement[] = GetEmployeeSelectElements();
    const reviewerSelectElementList: EmployeeSelectElement[] = GetEmployeeSelectElements();

    const contextSelectElementList: ContextSelectElement[] = GetContextsSelectElements();
    return (
        <>
            {
                <div>
                    <Formik
                        initialValues={new taskInitialValue(
                            task.name,
                            task.description,
                            task.tags,
                            task.taskStatus,
                            task.priority,
                            task.assignedFrom,
                            task.assignedTo,
                            task.reviewer,
                            task.context
                        ).toJSON()}
                        validationSchema={yup.object({

                            name: yup.string().required("Name required!").min(1, "Name is too short!"),
                            description: yup.string().required("Description required!").min(3, "Description is too short!"),
                            tags: yup.string().required("Tags required!"),
                            priority: yup.mixed().oneOf([Priority.HIGH, Priority.LOW, Priority.MEDIUM, Priority.NOT_DECLARED]),
                            taskStatus: yup.mixed().oneOf([TaskStatus.FAIL, TaskStatus.FINISHED, TaskStatus.STARTED, TaskStatus.STOPPED, TaskStatus.TRANSFERRED_TO_NEXT_SPRINT, TaskStatus.WAITING_FOR_INFO]),
                            assignedFrom: yup.object().shape({
                                id: yup.string().required()
                            }),
                            assignedTo: yup.object().shape({
                                id: yup.string().required()
                            }),
                            reviewer: yup.object().shape({
                                id: yup.string().required()
                            }),
                            context: yup.object().shape({
                                id: yup.string().required()
                            })


                        })}
                        onSubmit={onSubmit}
                    >
                        {formik => (
                            <Form
                                onSubmit={formik.handleSubmit}
                            >


                                <CustomInput name="name" placeholder="Enter Name" label={"Name"} />
                                <CustomInput name="description" placeholder="Enter Description" type="text" label={"Description"} />
                                <CustomInput name="tags" placeholder="Enter a tag" type="text" label={"Tags"} />
                                <CustomSelect label="Priority"
                                    name="priority">
                                    <option value={Priority.NOT_DECLARED}>{ToTitleCase(Priority.NOT_DECLARED)}</option>
                                    <option value={Priority.HIGH}>{ToTitleCase(Priority.HIGH)}</option>
                                    <option value={Priority.LOW}>{ToTitleCase(Priority.LOW)}</option>
                                    <option value={Priority.MEDIUM}>{ToTitleCase(Priority.MEDIUM)}</option>
                                </CustomSelect>
                                <CustomSelect label="Task Status"
                                    name="taskStatus">
                                    <option value="">Please select a Task Status</option>
                                    {/* {
           Object.entries(TaskStatus).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
             ))
          } */}
                                    <option value={TaskStatus.STARTED}>{ToTitleCase(TaskStatus.STARTED)}</option>
                                    <option value={TaskStatus.FINISHED}>{ToTitleCase(TaskStatus.FINISHED)}</option>
                                    <option value={TaskStatus.STOPPED}>{ToTitleCase(TaskStatus.STOPPED)}</option>
                                    <option value={TaskStatus.FAIL}>{ToTitleCase(TaskStatus.FAIL)}</option>
                                    <option value={TaskStatus.TRANSFERRED_TO_NEXT_SPRINT}>{ToTitleCase(TaskStatus.TRANSFERRED_TO_NEXT_SPRINT)}</option>
                                    <option value={TaskStatus.WAITING_FOR_INFO}>{ToTitleCase(TaskStatus.WAITING_FOR_INFO)}</option>
                                </CustomSelect>
                                <CustomSelect label="Assigned To"
                                    name="assignedTo.id">
                                    <option value="">Please select the the assigned person</option>
                                    {
                                        assignedToSelectElementList &&
                                        assignedToSelectElementList.map((assignedToSelectElement: EmployeeSelectElement) =>
                                        (
                                            <option value={assignedToSelectElement.id}>{assignedToSelectElement.employeeFullName}</option>
                                        )
                                        )
                                    }
                                </CustomSelect>
                                <CustomSelect label="Assigned From"
                                    name="assignedFrom.id">
                                    <option value="">Please select the the assigned person</option>
                                    {
                                        assignedFromSelectElementList &&
                                        assignedFromSelectElementList.map((assignedFromSelectElement: EmployeeSelectElement) =>
                                        (
                                            <option value={assignedFromSelectElement.id}>{assignedFromSelectElement.employeeFullName}</option>
                                        )
                                        )
                                    }
                                </CustomSelect>
                                <CustomSelect label="Reviewer"
                                    name="reviewer.id">
                                    <option value="">Please select the person who Assigned the task</option>
                                    {
                                        reviewerSelectElementList &&
                                        reviewerSelectElementList.map((reviewerSelectElement: EmployeeSelectElement) =>
                                        (
                                            <option value={reviewerSelectElement.id}>{reviewerSelectElement.employeeFullName}</option>
                                        )
                                        )
                                    }
                                </CustomSelect>
                                <CustomSelect label="Context"
                                    name="context.id">
                                    <option value="">Please select the context</option>
                                    {
                                        contextSelectElementList &&
                                        contextSelectElementList.map((contextSelectElement: ContextSelectElement) =>
                                        (
                                            <option value={contextSelectElement.id}>{contextSelectElement.name}</option>
                                        )
                                        )
                                    }
                                </CustomSelect>

                                <Button type="submit" style={{ marginTop: "1em" }}>
                                    Add Task
                                </Button>


                            </Form>
                        )}
                    </Formik>
                </div>
            }
        </>
    );
}
