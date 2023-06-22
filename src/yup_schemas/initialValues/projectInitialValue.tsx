export class projectInitialValue {
    name: string;
    corporation: object;

    constructor(
        name:string = "",
        corporation: object = {id: ""},
    ){
        this.name = name;
        this.corporation = corporation;
    }

    toJSON(){
        return {
            name: this.name,
            corporation: this.corporation
        };
    }
}