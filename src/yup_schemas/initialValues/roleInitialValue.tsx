export class corporationInitialValue {
    name: string;
    description: string;
    taxNumber: string;
    foundationDate: Date;

    constructor(
        name: string = "",
        description: string = "",
        taxNumber: string = "",
        foundationDate: Date = new Date()
    ){
        this.name = name;
        this.description = description;
        this.taxNumber = taxNumber;
        this.foundationDate = foundationDate;
    }
}