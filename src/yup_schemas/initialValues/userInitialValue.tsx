export class userInitialValue {
    email: string;
    password: string;
    username: string;

    constructor(
        email: string = "",
        password: string = "",
        username: string = ""
    ) {
        this.email = email;
        this.password = password;
        this.username = username;
    }

    toJSON(){
        return {
            email: this.email,
            password: this.password,
            username: this.username
        }
    }
}
