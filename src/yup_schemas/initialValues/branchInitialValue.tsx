export class branchInitialValue {
    name: string;
    description: string;
    phoneNumber: string;
    address: string;
    corporation: object;

    constructor(
        name: string = "",
        description: string = "",
        phoneNumber: string = "",
        address: string = "",
        corporation: object = {id : ""}
    ) {
        this.name = name;
        this.description = description;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.corporation = corporation;
    }

    toJSON(){
        return {
            name: this.name,
            description: this.description,
            phoneNumber: this.phoneNumber,
            address: this.address,
            corporation: this.corporation
        }
    }
}
