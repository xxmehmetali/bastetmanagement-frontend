export class expenseInitialValue {
    name: string;
    description: string;
    spendedBy: object;
    voucherNo: string;
    expenseType: object;
    expenseAmount: number;
    spentDateTime: Date;
    expenseCurrencyType: object;
    socialActivity: object;

    constructor(
        name: string = "",
        description: string = "",
        spendedBy: object = {id: ""},
        voucherNo: string = "",
        expenseType: object = {id: ""},
        expenseAmount: number = 0,
        spentDateTime: Date = new Date(),
        expenseCurrencyType: object = {id: ""},
        socialActivity: object = {id: ""}
    ){
        this.name = name;
        this.description = description;
        this.spendedBy = spendedBy;
        this.voucherNo = voucherNo;
        this.expenseType = expenseType;
        this.expenseAmount = expenseAmount;
        this.spentDateTime = spentDateTime;
        this.expenseCurrencyType = expenseCurrencyType;
        this.socialActivity = socialActivity;
    }

    toJSON() {
        return {
            name: this.name,
            description: this.description,
            spendedBy: this.spendedBy,
            voucherNo: this.voucherNo,
            expenseType: this.expenseType,
            expenseAmount: this.expenseAmount,
            spentDateTime: this.spentDateTime,
            expenseCurrencyType: this.expenseCurrencyType,
            socialActivity: this.socialActivity
        };
    }
}