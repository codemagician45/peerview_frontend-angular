import {Component, OnInit} from "@angular/core";
import {CommunityService} from "../../../services/services";
import {CreateClubPageComponent} from "../../shared/create-club-page/create-club-page.component";
import {MatDialog} from "@angular/material";
@Component({
    selector: "app-club-list",
    templateUrl: "./club-list.component.html",
    styleUrls: ["./club-list.component.scss"]
})
export class ClubListComponent implements OnInit {

    constructor(
      private _communityservice: CommunityService,
      public dialog: MatDialog
    ) {
    }
    cslist: any[] = [];
    ngOnInit() {
        this._communityservice.getsocietyclubs().subscribe(resp => {
            this.cslist = resp["campusStudentGroups"]
        }, error => {
            console.log(error);
        });
    }
    followclub(clubid: Number) {
        this._communityservice.followclub(clubid).subscribe(resp => {
            console.log(resp);
            if (resp["error"] === false) {
                alert(resp["Message"]);
            } else {
                alert(resp["Message"]);
            }
        }, error => {
            console.log(error);
        });
    }

    createClubPage() {
      this.dialog.open(CreateClubPageComponent);
    }
}
