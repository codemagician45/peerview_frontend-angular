export class ResetPassword{
    constructor(
        public password: String,
        public confirmPassword: String,
       ) {

    }

    public token: String;
    public jotToken:String;

}
