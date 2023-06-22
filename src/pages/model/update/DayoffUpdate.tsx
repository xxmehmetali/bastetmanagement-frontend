import { Formik } from 'formik';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';
import * as yup from "yup";
import { Button, Form } from 'react-bootstrap';
import CustomInput from '../../../components/customFormElements/CustomInput';
import CustomSelect from '../../../components/customFormElements/CustomSelect';
import CustomDatePicker from '../../../components/customFormElements/CustomDatePicker';
import { DayoffReason } from '../../../models/enums/DayoffReason';
import { EmployeeSelectElement } from '../../../models/frontdtos/EmployeeSelectElement';
import { dayoffInitialValue } from '../../../yup_schemas/initialValues/dayoffInitialValue';
import { GetEmployeeSelectElements } from '../../../providers/SelectElementProviders/GetEmployeeSelectElements';
import { useAddDayoffMutation, useGetDayoffByIdQuery } from '../../../features/api/dayoffApi';
import { useParams } from 'react-router-dom';
import { DataResult } from '../../../results/DataResult';
import { Dayoff } from '../../../models/base/Dayoff';

export default function DayoffUpdate() {
    let { id } = useParams();

    const { data: dayoffDataResultDataForDayoff } = useGetDayoffByIdQuery(id || "");
    const dayoffDataResultForDayoff: DataResult<Dayoff> = dayoffDataResultDataForDayoff as DataResult<Dayoff>;
    const dayoff: Dayoff = (dayoffDataResultForDayoff?.data) as Dayoff;

    const [addDayoffMeeting, { data, isLoading }] = useAddDayoffMutation();
    async function onSubmit(values: any, actions: any) {
        console.log(values)
        const result = await addDayoffMeeting(values)
        actions.resetForm();
        ResolveResult(result)

    }

    const employeeSelectElementList: EmployeeSelectElement[] = GetEmployeeSelectElements();

    return (
        <>
            {
                dayoff &&
                <div>
                    <Formik
                        initialValues={new dayoffInitialValue(
                            dayoff.employee,
                            dayoff.beginDate,
                            dayoff.endDate,
                            dayoff.reason,
                            dayoff.isPaid,
                            dayoff.description
                        ).toJSON()}
                        validationSchema={yup.object({
                            employee: yup.object().shape({
                                id: yup.string().required("Employee needed!")
                            }),
                            beginDate: yup.date().required(),
                            endDate: yup.date().required(),
                            reason: yup.string().required(),
                            isPaid: yup.boolean().required(),
                            description: yup.string().required().min(15, "Description is too short!")
                        })}
                        onSubmit={onSubmit}
                    >
                        {formik =>
                            <Form
                                onSubmit={formik.handleSubmit}
                            >

                                <CustomSelect label="Employee"
                                    name="employee.id">
                                    <option value="">Please select an Employee</option>
                                    {
                                        employeeSelectElementList &&
                                        employeeSelectElementList.map((employeeSelectElement: EmployeeSelectElement) =>
                                        (
                                            <option value={employeeSelectElement.id}>{employeeSelectElement.employeeFullName}</option>
                                        )
                                        )
                                    }
                                </CustomSelect>

                                <CustomInput name="description" placeholder="Enter Description" type="text" label={"Description"} />

                                <CustomSelect label="Is Paid"
                                    name="isPaid">
                                    <option value="">Please select if it is Paid or not</option>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </CustomSelect>

                                <CustomSelect label="Reason"
                                    name="reason">
                                    <option value="">Please select a Reason</option>
                                    {
                                        Object.entries(DayoffReason).map(([key, value]) => (
                                            <option key={key} value={key}>{value}</option>
                                        ))

                                    }
                                </CustomSelect>

                                <CustomDatePicker label="Begin Date"
                                    name="beginDate" />

                                <CustomDatePicker label="End Date"
                                    name="endDate" />

                                <Button type="submit" style={{ marginTop: "1em" }}>
                                    Add Dayoff
                                </Button>
                            </Form>
                        }
                    </Formik>
                </div>
            }
        </>
    );
}
