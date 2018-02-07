export class SignUp {
  constructor (
    public name: String,
    public email: String,
    public password: String,
    public confirmPassword: String,
    public hasconsented: boolean
  ) {}

  public firstName: String;
  public lastName: String;
}
