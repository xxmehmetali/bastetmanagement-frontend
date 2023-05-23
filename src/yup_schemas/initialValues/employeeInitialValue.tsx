import { Gender } from "../../models/enums/Gender";

export class employeeInitialValue {
    id: string;
    name: string;
    surname: string;
    address: string;
    phoneNumber: string;
    nationalId: string;
    gender: Gender;
    occupation: object;
    startDate: Date;
    endDate: Date;
    branch: object;
    department: object;
    salaryAmount: number;
    salaryCurrency: object;

    constructor(
        id : string = "",
        name : string =  "",
        surname : string = "",
        address : string = "",
        phoneNumber : string = "",
        nationalId : string = "",
        gender : Gender = Gender.MALE,
        occupation : object = {id : ""},
        startDate : Date = new Date(),
        endDate : Date = new Date(),
        branch : object = {id : ""},
        department : object = {id : ""},
        salaryAmount : number = 0,
        salaryCurrency : object = {id : ""}
    ) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.nationalId = nationalId;
        this.gender = gender;
        this.occupation = occupation;
        this.startDate = startDate;
        this.endDate = endDate;
        this.branch = branch;
        this.department = department;
        this.salaryAmount = salaryAmount;
        this.salaryCurrency = salaryCurrency;
    }
}
