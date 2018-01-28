import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UserService, AuthenticationService } from "../services/services";

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
    constructor(private userService: UserService, private authenticationservice: AuthenticationService,
              private router: Router){}

 canActivate() {
    let isAuthenticated = this.userService.isAuthenticated();
    if (!isAuthenticated) {
      this.router.navigate(["/sign-in"]);
    }
    else {
      this.authenticationservice.istokenvalid().subscribe((resp) => {
        if(resp["error"] === true) {
          isAuthenticated = false;
          this.router.navigate(["/sign-in"]);
        }
      });

    }
    return isAuthenticated;
  }


 

}
