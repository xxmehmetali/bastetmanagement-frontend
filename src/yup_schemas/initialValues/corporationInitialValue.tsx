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
    ) {
        this.name = name;
        this.description = description;
        this.taxNumber = taxNumber;
        this.foundationDate = foundationDate;
    }

    toJSON(){
        return {
            name: this.name,
            description: this.description,
            taxNumber: this.taxNumber,
            foundationDate: this.foundationDate
        }
    }
}
