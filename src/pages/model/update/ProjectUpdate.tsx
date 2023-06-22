import { Formik } from 'formik';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';
import * as yup from "yup";
import { Button, Form } from 'react-bootstrap';
import CustomInput from '../../../components/customFormElements/CustomInput';
import CustomSelect from '../../../components/customFormElements/CustomSelect';
import { EmployeeSelectElement } from '../../../models/frontdtos/EmployeeSelectElement';
import { CorporationSelectElement } from '../../../models/frontdtos/CorporationSelectElement';
import { projectInitialValue } from '../../../yup_schemas/initialValues/projectInitialValue';
import { GetEmployeeSelectElements } from '../../../providers/SelectElementProviders/GetEmployeeSelectElements';
import { GetCorporationSelectElements } from '../../../providers/SelectElementProviders/GetCorporationSelectElements';
import { useAddProjectMutation, useGetProjectByIdQuery } from '../../../features/api/projectApi';
import { useParams } from 'react-router-dom';
import { Project } from '../../../models/base/Project';
import { DataResult } from '../../../results/DataResult';

export default function ProjectUpdate() {
    let { id } = useParams();

    const { data: projectDataResultDataForProject } = useGetProjectByIdQuery(id || "");
    const projectDataResultForProject: DataResult<Project> = projectDataResultDataForProject as DataResult<Project>;
    const project: Project = (projectDataResultForProject?.data) as Project;


    const [addProject, { data, isLoading }] = useAddProjectMutation();
    async function onSubmit(values: any, actions: any) {
        console.log("add");
        const result = await addProject(values);
        actions.resetForm();
        ResolveResult(result);
    }

    const corporationSelectElementList: CorporationSelectElement[] =
        GetCorporationSelectElements();
    const employeesSelectElementList: EmployeeSelectElement[] =
        GetEmployeeSelectElements();

    return (
        <>
            {
                project &&
                <div>
                    <Formik
                        initialValues={new projectInitialValue(
                            project.name,
                            project.corporation
                        ).toJSON()}
                        validationSchema={yup.object({
                            name: yup
                                .string()
                                .required("Name required!")
                            ,
                            corporation: yup.object().shape({
                                id: yup
                                    .string()
                                    .required(),
                            }),
                            employee: yup.object().shape({
                                id: yup.string().required()
                            })
                        })}
                        onSubmit={onSubmit}
                    >
                        {formik =>
                            <Form onSubmit={formik.handleSubmit}>
                                <CustomInput name="name" placeholder="Enter Name" label={"Name"} />
                                <CustomSelect label="Corporation" name="corporation.id">
                                    <option value="">Please select a Corporation</option>
                                    {corporationSelectElementList &&
                                        corporationSelectElementList.map((corporation: CorporationSelectElement) => (
                                            <option value={corporation.id}>{corporation.name}</option>
                                        ))}
                                </CustomSelect>

                                <CustomSelect label="Employees" name="employee.id">
                                    <option value="">Please select Employees</option>
                                    {employeesSelectElementList &&
                                        employeesSelectElementList.map(
                                            (employeesSelectElement: EmployeeSelectElement) => (
                                                <option value={employeesSelectElement.id}>
                                                    {employeesSelectElement.employeeFullName}
                                                </option>
                                            )
                                        )}
                                </CustomSelect>
                                <Button type="submit" style={{ marginTop: "1em" }}>
                                    Add Branch
                                </Button>
                            </Form>
                        }
                    </Formik>
                </div>
            }
        </>
    );
}
