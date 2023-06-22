import { Employee } from "../../models/base/Employee";

export class socialActivityInitialValue {
    name: string;
    description: string;
    date: Date;
    place: string;
    employees: Employee[];
    expense: object;
    socialActivityType: object;

    constructor(
        name: string = "",
        description: string = "",
        date: Date = new Date(),
        place: string = "",
        employees: Employee[] = [],
        expense: object = { id: "" },
        socialActivityType: object = { id: "" }
    ) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.place = place;
        this.employees = employees;
        this.expense = expense;
        this.socialActivityType = socialActivityType;
    }

    toJSON() {
        return {
            name: this.name,
            description: this.description,
            date: this.date,
            place: this.place,
            employees: this.employees,
            expense: this.expense,
            socialActivityType: this.socialActivityType
        }
    }
}