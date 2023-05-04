import { Form, Formik } from "formik";
import { corporationSchema } from "../../yup_schemas/corportionSchema";
import CustomInput from "../customFormElements/CustomInput";
import CustomSelect from "../customFormElements/CustomSelect";
import CustomCheckbox from "../customFormElements/CustomCheckBox";
import * as yup from "yup"
import { Button } from "react-bootstrap";
import { corporationInitialValue } from "../../yup_schemas/initialValues/corporationInitialValue";


const OnSubmit = async (values : any, actions : any) => {
    console.log("xxx")
    console.log(values)

  actions.resetForm();

  /*
  name: string;
  description: string;
  taxNumber: string;
  foundationDate: Date;
  */
};

const CorporationAddForm = () => {
  return (
    <></>
    // <Formik
    //   initialValues={corporationInitialValue}
    //   validationSchema={yup.object({
    //     name: yup.string().required("Name required!").min(3, "Name is too short!"),
    //     description: yup.string().required("Description required!").min(6, "Description is too short!"),
    //     taxNumber: yup.string().required("Tax Number Required!").min(5).max(14),
    //     foundationDate : yup.date().required()
    //   })}
    //   onSubmit={OnSubmit}
    // >
    //   {formik => (
    //     <Form
    //       onSubmit={formik.handleSubmit}
    //     >
    //      <CustomInput name="name" placeholder="Enter Name" label={"Name"}/>
    //      <CustomInput name="description" placeholder="Enter Description" type="text" label={"Description"}/>
    //      <CustomInput name="taxNumber" placeholder="Enter Tax Number" type="text" label={"Tax Number"}/>
    //      <CustomInput name="foundationDate" placeholder="Enter Foundation Date" type="text" label={"Foundation Date"}/>

    //       <Button type="submit">
    //         Add Corporation
    //       </Button>
    //     </Form>
    //   )}
    // </Formik>
  );
};
export default CorporationAddForm;
