import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {SignIn, ForgotPassword} from "../../../models/models";
import {AuthenticationService, UserService} from "../../../services/services";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    model = new SignIn("", "");
    submitted = false;
    isFormVisible = false;
    responceError:any;
    constructor(private _authenticationService: AuthenticationService,
                private _userService: UserService,
                private router: Router) {
    }
    ngOnInit() {}

    onSubmit() {
        let isValid = true;
        if (this.model.password.length < 8) {
            isValid = false;
            alert("Password required at least 8 characters");
        }
        if (isValid && this.model.email.indexOf("@") === -1 ) {
            isValid = false;
            alert("Invalid Email Specified");
        }
        if (isValid && this.model.email && this.model.password ) {
            this._authenticationService.authenticateCustomer(this.model).subscribe(
                (resp) => {
                    if (resp["status"] === 'SUCCESS') {
                        this.submitted = true;
                        const user = resp["user"];
                        this._userService.setLoggedInUser(user);
                        this.router.navigate(["/home"]);
                    }
                },
                (error) => {
                  this.responceError = error["error"].status_message;
                }
            );
        }
    }

    showForm ($event) {
        this.isFormVisible = true;
    }
}
