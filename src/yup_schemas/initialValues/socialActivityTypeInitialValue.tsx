export class socialActivityTypeInitialValue {
    name: string;
    description: string;

    constructor(
        name: string = "",
        description: string = ""
    ) {
        this.name = name;
        this.description = description;
    }

    toJSON() {
        return {
            name: this.name,
            description: this.description
        };
    }
}