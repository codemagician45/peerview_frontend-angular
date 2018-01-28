import {Component, OnInit} from "@angular/core";
import {OpenJoinComponent} from "../shared/modals/components/OpenJoinComponent";
import {OpenInviteComponent} from "../shared/modals/components/OpenInviteComponent";
import {MatDialog} from "@angular/material";

@Component({
    selector: "app-community",
    templateUrl: "./community.component.html",
    styleUrls: ["./community.component.scss"]
})
export class CommunityComponent implements OnInit {

    constructor(public dialog: MatDialog) {

    }

    openJoin() {
        this.dialog.open(OpenJoinComponent);
    }

    openInvite() {
        this.dialog.open(OpenInviteComponent);
    }

    ngOnInit() {
    }

}
