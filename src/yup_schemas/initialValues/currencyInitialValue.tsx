export class currencyInitialValue {
    currencyName: string;
    currencySymbol: string;

    constructor(
        currencyName: string = "",
        currencySymbol: string = ""
    ) {
        this.currencyName = currencyName;
        this.currencySymbol = currencySymbol;
    }

    toJSON(){
        return {
            currencyName: this.currencyName,
            currencySymbol: this.currencySymbol
        }
    }
}