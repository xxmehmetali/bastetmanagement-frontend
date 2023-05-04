import * as yup from "yup"

export const corporationSchema = yup.object().shape({
    /*
  id: string;
  name: string;
  description: string;
  taxNumber: string;
  foundationDate: Date;
  projects: Project[];
  createdAt: Date;
  updatedAt: Date;
    */

    name : yup.string().matches(/^[aA-zZ\s]+$/, "Only letters are allowed !").required(),
    description : yup.string().matches(/^[aA-zZ\s]+$/, "Only letters are allowed !").required(),
    taxNumber : yup.string().required(),
    foundationDate : yup.date().required()
})