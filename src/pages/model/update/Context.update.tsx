import React from 'react'
import { Formik } from 'formik';
import { OccupationSelectElement } from '../../../models/frontdtos/OccupationSelectElement';
import { GetOccupationSelectElements } from '../../../providers/SelectElementProviders/GetOccupationSelectElements';
import { GetBranchSelectElements } from '../../../providers/SelectElementProviders/GetBranchSelectElements';
import { GetDepartmentSelectElements } from '../../../providers/SelectElementProviders/GetDepartmentSelectElements';
import { GetCurrencySelectElements } from '../../../providers/SelectElementProviders/GetCurrencySelectElements';
import { BranchSelectElement } from '../../../models/frontdtos/BranchSelectElement';
import { DepartmentSelectElement } from '../../../models/frontdtos/DepartmentSelectElement';
import { CurrencySelectElement } from '../../../models/frontdtos/CurrencySelectElement';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';
import { employeeInitialValue } from '../../../yup_schemas/initialValues/employeeInitialValue';
import * as yup from "yup";
import { Gender } from '../../../models/enums/Gender';
import { Button, Form } from 'react-bootstrap';
import CustomInput from '../../../components/customFormElements/CustomInput';
import CustomSelect from '../../../components/customFormElements/CustomSelect';
import { ToTitleCase } from '../../../functions/ToTitleCase';
import { useGetEmployeeByIdQuery, useUpdateEmployeeMutation } from '../../../features/api/employeeApi';
import { useParams } from 'react-router-dom';
import { Employee } from '../../../models/base/Employee';
import { DataResult } from '../../../results/DataResult';
import { useAddContextMutation, useGetContextByIdQuery } from '../../../features/api/contextApi';
import { contextInitialValue } from '../../../yup_schemas/initialValues/contextInitialValue';
import { Context } from '../../../models/base/Context';

export default function ContextUpdate() {
    let { id } = useParams();

    const { data: contextDataResultDataForContext } = useGetContextByIdQuery(id || "");
    const contextDataResultForContext: DataResult<Context> = contextDataResultDataForContext as DataResult<Context>;
    const context: Context = (contextDataResultForContext?.data) as Context;

    const [addContext, { isLoading }] = useAddContextMutation();
    function onSubmit(values: any, actions: any) {
        addContext(values)
        actions.resetForm();
    }

    return (
        <>
            {
                context &&
                <div>
                    {/* <CorporationAddForm/> */}
                    {/* <Calendar value={dateTime24h} onChange={(e) => setDateTime24h(e.value as Date)} showTime hourFormat="24" /> */}
                    <Formik
                        initialValues={new contextInitialValue(
                            context.name,
                            context.description
                        ).toJSON()}
                        validationSchema={yup.object({
                            name: yup.string().required("Name required!").min(3, "Name is too short!"),
                            description: yup.string().required("Description required!").min(6, "Description is too short!")
                        })}
                        onSubmit={onSubmit}
                    >
                        {formik => (
                            <Form
                                onSubmit={formik.handleSubmit}
                            >
                                <CustomInput name="name" placeholder="Enter Name" type="text" label={"Name"} />
                                <CustomInput name="description" placeholder="Enter Description" type="text" label={"Description"} />

                                <Button type="submit" style={{ marginTop: "1em" }}>
                                    Add Context
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            }
        </>
    );
}
