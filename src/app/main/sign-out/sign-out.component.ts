import { Component, OnInit } from "@angular/core";
import {Router} from "@angular/router";
import {UserService} from "../../../services/services";

@Component({
  selector: "app-sign-out",
  template: ""
})
export class SignOutComponent implements OnInit {

  constructor(private _userservice: UserService, private router: Router) { }

  ngOnInit() {
    this._userservice.logoutuser();
    this.router.navigate(["/"]);
  }

}
