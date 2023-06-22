export class occupationInitialValue {
    occupation: string;
    detail: string;

    constructor(
        occupation: string = "",
        detail: string = ""
    ) {
        this.occupation = occupation;
        this.detail = detail;
    }

    toJSON() {
        return {
            occupation: this.occupation,
            detail: this.detail
        };
    }
}