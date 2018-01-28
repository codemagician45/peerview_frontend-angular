import {Component, OnInit} from "@angular/core";
import {UserService, AccountSettingService} from "../../../services/services";
import {MatDialog} from "@angular/material";
import {EditInterestModalComponent} from "../edit-interest-modal/edit-interest-modal.component";
import {EditAccomplishmentsModalComponent} from "../edit-accomplishments-modal/edit-accomplishments-modal.component";
import {AboutMeModalComponent} from "../../shared/about-me-modal/about-me-modal.component";
import {ShowImageComponent} from "../../shared/show-image/show-image.component";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {

    public items: any;
    public properties: any;

    constructor(
      private _accountservice: AccountSettingService,
      public dialog: MatDialog
                ) {
        this.items = [1, 2, 3, 4, 5, 6, 7, 8];
        this.properties = {
            items: 1,
            loop: true,
            dots: false,
            nav: true,
            onChange: function () {

            }
        };
    }
    credits = 0;
    stars = 0;
    followers = [];
    following = [];
    user: { 'name':'', 'about_me':'', 'interests':null, 'accomplishments': '' };
    ngOnInit() {
        //console.log(this._userService.loggedInUser);
        this._accountservice.getusercredits().subscribe(resp => {
            this.credits = resp["userCredits"]['totalCredits'];
            if (this.credits > 400) {
                this.stars = 5;
            } else if (this.credits > 300) {
                this.stars = 4;
            } else if (this.credits > 200) {
                this.stars = 3;
            } else if (this.credits > 100) {
                this.stars = 2;
            } else if (this.credits > 0) {
                this.stars = 1;
            }
            }, error => {
                console.log(error);
            });
        this._accountservice.getuserprofile().subscribe(resp => {
            console.log(resp);
            if(resp["error"] === false) {
               this.user = resp["Users"][0]
            }
        }, error => {
            console.log(error);
        })

    }

    openInterest() {
      this.dialog.open(EditInterestModalComponent);
    }

    openAccomplishments() {
      this.dialog.open(EditAccomplishmentsModalComponent);
    }

    openAboutMeModal() {
      this.dialog.open(AboutMeModalComponent);
    }

  openAvatar(){
    this.dialog.open(ShowImageComponent, {
      data: {
        src: '/assets/images/john.jpg'
      },
    });
  }

}
