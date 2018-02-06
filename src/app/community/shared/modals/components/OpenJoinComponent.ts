import {Component} from "@angular/core";
import {MatDialog} from "@angular/material";
import { Router } from '@angular/router';

const peersviewBrand = require('../../../../../assets/images/peersview-brand.png');

@Component({
    selector: "app-open-join",
    templateUrl: "../templates/open-join.html",
})
export class OpenJoinComponent {
    constructor(private dialog: MatDialog, private router: Router) {
    }
    cancel() {
        this.dialog.closeAll();
    }
    ok() {
        this.router.navigate(['/community/feed']).then( resp =>{
            this.dialog.closeAll();
        });
    }
}
