import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { SignUp, SignIn } from "../../../models/models";
import { AuthenticationService,UserService } from "../../../services/services";
declare var swal: any;


@Component({
  selector: 'app-verify-email',
  templateUrl: "./verify-user-email.component.html",
  styleUrls: ["./verify-user-email.component.scss"]
})

export class VerifyUserEmailComponent implements OnInit {
  private sub: any;
  jotToken: string;
  successMessage:string;
  errorMessage:string;
  constructor(private _authenticationService: AuthenticationService,private _userService: UserService,
    private router: Router, private route: ActivatedRoute) {
    /* User authentication verify email function */
     this.sub = this.route.params.subscribe(params => {
      this.jotToken = params['jotToken'];
      this._authenticationService.authenticateUseremail(this.jotToken).subscribe(res => {
        if (res["status"] === 'SUCCESS') {
        setTimeout((router: Router) => {
              const user = res["user"];
              this._userService.setLoggedInUser(user);
              this.router.navigate(["/onboard/1"],{ queryParams: { type: true} });
       },1000);
        }
      },(error) => {
         if(error["error"].body){
           this.errorMessage = ' ' + error["error"].body.status_message;
       }else if(error["error"].status === 'ERROR'){
          this.errorMessage = ' ' + error["error"].status_message;
        }
      });
    })
  }
  ngOnInit() { }


}
