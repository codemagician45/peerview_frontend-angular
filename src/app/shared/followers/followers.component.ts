import {Component, OnInit} from "@angular/core";
import {AuthenticationService, UserService} from "../../../services/services";
import {Router} from "@angular/router";
@Component({
    selector: "app-followers",
    templateUrl: "./followers.component.html",
    styleUrls: ["./followers.component.scss"]
})
export class FollowersComponent implements OnInit {

    constructor(
      private _authservice:AuthenticationService,
      private _userService: UserService,
      private router: Router
    ) {

    }
    followers = [];

    ngOnInit() {
      const user = this._userService.getLoggedInUser();
        this._authservice.getfollowers(user ? user.id : 0).subscribe(resp => {
            if(resp["error"] === false) {
               this.followers = resp["followers"];
            }

           }, error => {
               console.log(error);
           });

    }

    showAll(){
      this.router.navigate(['/my/followers-following', { type: 'followers' }]);
    }

}
