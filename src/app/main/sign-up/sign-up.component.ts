import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { SignUp, SignIn } from "../../../models/models";
import { AuthenticationService, UserService } from "../../../services/services";
declare var swal: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})

export class SignUpComponent implements OnInit {
    isFormVisible = false;
    model = new SignUp("", "", "", "", true);
    submitted = false;
    captchaChecked = false;
    responceError = false;
    public loading = false;

  constructor(private _authenticationService: AuthenticationService,private _userService: UserService,
  private router: Router) {
    this.loading = true;
  }

 /* Sign-up Register User Function */
  onSubmit() {
    const splitnames = this.model.name.split(" ");
    this.model.firstName = splitnames[0];
    this.model.lastName = splitnames[1];
    this._authenticationService.registerCustomer(this.model).subscribe((resp) => {
      if (resp["status"] === 'SUCCESS') {
        this.submitted = true;
        this.router.navigate(["/onBoard"]);
      }
    }, (error) => {
      this.responceError = error["error"].status_message;
    });

  }


  get diagnostic() {
    return JSON.stringify(this.model);
  }
  ngOnInit() { }

  captchaResponse(token, test) {
    if (token) {
      this.captchaChecked = true;
    }
  }

  captchaExpired($event) {
    this.captchaChecked = false;
  }

  showForm($event) {
    this.isFormVisible = true;
  }
}
