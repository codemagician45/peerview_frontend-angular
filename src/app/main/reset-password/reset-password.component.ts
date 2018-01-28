import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { SignUp, SignIn,ResetPassword } from "../../../models/models";
import { AuthenticationService } from "../../../services/services";
declare var swal: any;

@Component({
  selector: 'app-reset-password',
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"]
})

export class ResetpasswordComponent implements OnInit {
  private sub: any;
  token: string;
  model = new ResetPassword("", "");
  submitted = false;
  isFormVisible = false;
  responceError:string;
  responceSucess:string;
  errorMessage:string;
  sucessMessage:string;
  constructor(private _authenticationService: AuthenticationService,
    private router: Router, private route: ActivatedRoute) {
      /*Token Verification User Function*/
   this._authenticationService.authenticatetoken().subscribe(res => {
        if (res["status"] === 'SUCCESS') {
         this.sucessMessage = "true";
       }
   },(error) => {
     this.errorMessage = ' ' +  error["error"].status_message;
     setTimeout((router: Router) => {
      this.router.navigate(["/forgot-password"]);
    },5000);//3s
   });
}
  ngOnInit() { }


/*Reset password User function*/
resetPassword() {
      this.sub = this.route.params.subscribe(params => {
       this.token = params['token'];
       this._authenticationService.resetPassword(this.model,this.token).subscribe(res =>{
        if(res["status"] === 'SUCCESS'){
          this.responceSucess = "Password Reset Successfully!!"
          setTimeout((router: Router) => {
           this.router.navigate(["/sign-in"]);
         },3000);//3s
       }
     },(error) => {
          this.responceError = ' ' +  error["error"].status_message;
        });
    });
  }


}
