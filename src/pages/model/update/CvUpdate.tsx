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

export default function EmployeeUpdate() {
   return(
    <div></div>
   )
}
