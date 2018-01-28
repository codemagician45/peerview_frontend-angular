import {Component} from "@angular/core";
import {MatDialog} from "@angular/material";


@Component({
    selector: "app-open-join",
    templateUrl: "../templates/open-invite.html",
})
export class OpenInviteComponent {
    constructor(private dialog: MatDialog) {
    }
    cancel() {
        this.dialog.closeAll();
    }

}
