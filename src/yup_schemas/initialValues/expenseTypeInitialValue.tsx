export class expenseTypeInitialValue {
    name: string;
    description: string;

    constructor(
        name: string = "",
        description: string = ""
    ){
        this.name = name;
        this.description = description;
    }

    toJson(){
        return(
            {
                name: this.name,
                description: this.description
            }
        )
    }
}