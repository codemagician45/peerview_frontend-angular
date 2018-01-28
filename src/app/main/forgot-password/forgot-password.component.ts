import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {SignIn, ForgotPassword} from "../../../models/models";
import {AuthenticationService, UserService} from "../../../services/services";

@Component({
    selector: 'app-sign-in',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    forgotPassModel = new ForgotPassword('');

    constructor(private _authenticationService: AuthenticationService,
                private _userService: UserService,
                private router: Router) {}

    ngOnInit() {}

   /*
   *  Forgot Password Submit Function 
   */
    forgotPasswordSubmit() {
        this._authenticationService.restorePassword(this.forgotPassModel).subscribe(
            (resp) => {
                if (resp["status"] === 'SUCCESS') {
                 alert('Password reset link has been sent to your email.');
                }
            },
            (error) => {
                if (error["error"].status === "ERROR") {
                    alert(error["error"].status_message);
                }
            }
        );
    }
}
