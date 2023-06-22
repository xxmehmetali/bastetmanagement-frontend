export class dayoffInitialValue {
    employee: object;
    beginDate: Date;
    endDate: Date;
    reason: string;
    isPaid: boolean;
    description: string;

    constructor(
        employee: object = {id: ""},
        beginDate: Date = new Date(),
        endDate: Date = new Date(),
        reason: string = "",
        isPaid: boolean = false,
        description: string = ""  
    ){
        this.employee = employee;
        this.beginDate = beginDate;
        this.endDate = endDate;
        this.reason = reason;
        this.isPaid = isPaid;
        this.description = description;
    }

    toJSON(){
        return {
            employee: this.employee,
            beginDate: this.beginDate,
            endDate: this.endDate,
            reason: this.reason,
            isPaid: this.isPaid,
            description: this.description
        }
    }
}