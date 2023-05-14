import { Gender } from "../../models/enums/Gender";

export const employeeInitialValue = {
    name: "",
    surname: "",
    address: "",
    phoneNumber: "",
    nationalId: "",
    gender: Gender.MALE,
    occupation: {
        id: ""
    },
    startDate: new Date(),
    endDate: new Date(),
    branch: {
        id: ""
    },
    department: {
        id: ""
    },
    salaryAmount: "",
    salaryCurrency: {
        id: ""
    }
}