import {Component, OnInit} from "@angular/core";
import {CommunityService} from "../../../services/services";
import {MatDialog} from "@angular/material";
import {ShareModalComponent} from "../../shared/share-modal/share-modal.component";
import {CreateClubPageComponent} from "../../shared/create-club-page/create-club-page.component";

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
    clubs: any[] = [];
    ngOnInit() {

        this._communityservice.getuserclubs().subscribe(resp => {
            this.clubs = resp["campusSocietyClubs"];
        }, error => {
            console.log(error);
        });
    }

    unfollowclub(clubid: Number) {
        this._communityservice.unfollowclub(clubid).subscribe(resp => {
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
