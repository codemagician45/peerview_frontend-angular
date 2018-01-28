import {Component, OnInit} from "@angular/core";
import {AuthenticationService, UserService} from "../../../services/services";
import {Router} from "@angular/router";
@Component({
    selector: "app-following",
    templateUrl: "./following.component.html",
    styleUrls: ["./following.component.scss"]
})
export class FollowingComponent implements OnInit {
    following =[];

    constructor(
      private _authservice: AuthenticationService,
      private _userService: UserService,
      private router: Router
    ) {
    }

    ngOnInit() {
      const user = this._userService.getLoggedInUser();

      this._authservice.getfollowingusers(user ? user.id : 0).subscribe(resp => {
            if(resp["error"] === false) {
               this.following = resp["followers"];
            }

           }, error => {
               console.log(error);
           });
    }

  showAll(){
    this.router.navigate(['/my/followers-following', { type: 'following' }]);
  }
}
