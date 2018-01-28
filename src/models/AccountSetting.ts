export class AccountSetting {
    constructor(public firstname?: String,
                public lastname?: String,
                public email?: String,
                public language?: String,
                public date_birth?: String,
       ) {

    }
    public name: String = `${this.firstname} ${this.lastname}`;
    public password: String;
}
