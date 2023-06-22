export class meetingPlatformInitialValue {
    name: string;
    description: string;
    baseUrl: string;

    constructor(
        name: string = "",
        description: string = "",
        baseUrl: string = ""
    ) {
        this.name = name;
        this.description = description;
        this.baseUrl = baseUrl;
    }

    toJSON() {
        return {
            name: this.name,
            description: this.description,
            baseUrl: this.baseUrl
        };
    }
}