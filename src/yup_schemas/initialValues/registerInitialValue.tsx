export class registerInitialValue {
    username: string;
    email: string;
    password: string;

    constructor(
        username: string = "",
        email: string = "",
        password: string = ""
    ) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    toJSON() {
        return {
            username: this.username,
            email: this.email,
            password: this.password
        };
    }
}