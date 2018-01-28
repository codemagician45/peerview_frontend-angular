import {Component, OnInit} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material";
import {PostDetailComponent} from "../../shared/modal/components/PostDetailComponent";
import {ShowImageComponent} from "../../shared/show-image/show-image.component";

@Component({
    selector: "app-business-profile",
    templateUrl: "./business-profile.component.html",
    styleUrls: ["./business-profile.component.scss"]
})
export class BusinessProfileComponent implements OnInit {

    constructor(public dialog: MatDialog) {
    }

    ngOnInit() {

        if ($(window).width() > 1025) {
            const $sticky = $(".sticky");
            $sticky.css({position: "fixed", top: "86px"});
        }

    }

    openPostDetail() {
        this.dialog.open(PostDetailComponent);
    }

    openAvatar(){
      this.dialog.open(ShowImageComponent, {
        data: {
          src: '/assets/images/toranto-uni.png'
        },
      });
    }

}
