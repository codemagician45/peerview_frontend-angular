import {Component} from "@angular/core";
import {MatDialog} from "@angular/material";
const peersviewBrand = require('../../../../../assets/images/peersview-brand.png');

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
