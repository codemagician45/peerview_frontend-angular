import {Component, OnInit} from "@angular/core";
import {PostDetailComponent} from "../../shared/modal/components/PostDetailComponent";
import {MatDialog} from "@angular/material";
import {NewMessageModalComponent} from '../../shared/new-message-modal/new-message-modal.component';
import * as Ps from 'perfect-scrollbar';
import {PostToComponent} from "../../shared/post-to/post-to.component";
import {ShowImageComponent} from "../../shared/show-image/show-image.component";
import {UnfollowPopupComponent} from "../../shared/unfollow-popup/unfollow-popup.component";
import {ReportModalUserComponent} from "../../shared/report-modal-user/report-modal-user.component";

@Component({
    selector: "app-user-profile",
    templateUrl: "./user-profile.component.html",
    styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit {

    public items: any;
    public properties: any;
    btnText = 'Follow';

    constructor(
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

    ngOnInit() {
    }

    follow() {
      if (this.btnText === 'Following') {
        this.dialog.open(UnfollowPopupComponent, {
          data: {
            name: 'John Smith'
          },
        });
      }


      this.btnText = this.btnText === 'Follow' ? 'Following' : 'Follow';
    }

    openPostDetail() {
      this.dialog.open(PostDetailComponent);
      setTimeout(()=>{
        // const container = document.querySelector('.mat-dialog-container');
        const container = $('.mat-dialog-container')[0];
        //Ps.initialize(container);
      }, 200)
    }
    openMessage() {
      this.dialog.open(NewMessageModalComponent);
    }
    openPostTo() {
      this.dialog.open(PostToComponent);
    }
    openAvatar(){
      this.dialog.open(ShowImageComponent, {
        data: {
          src: '/assets/images/john.jpg'
        },
      });
    }

  report() {
    this.dialog.open(ReportModalUserComponent)
  }

}
