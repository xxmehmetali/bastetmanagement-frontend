export class departmentInitialValue {
    name: string;
    description: string;
    departmentResponsible: object;

    constructor(
        name: string = "",
        description: string = "",
        departmentResponsible: object = { id: "" }
    ) {
        this.name = name;
        this.description = description;
        this.departmentResponsible = departmentResponsible;
    }

    toJSON(){
        return {
            name: this.name,
            description: this.description,
            departmentResponsible: this.departmentResponsible
        }
    }
}