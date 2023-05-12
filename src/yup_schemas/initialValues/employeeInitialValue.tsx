import { Gender } from "../../models/enums/Gender";

export const employeeInitialValue = {
    name: "",
    surname: "",
    address: "",
    phoneNumber: "",
    nationalId: "",
    gender: Gender.MALE,
    occupation: "",
    startDate: new Date(),
    endDate: new Date(),
    branch: "",
    department: ""
}