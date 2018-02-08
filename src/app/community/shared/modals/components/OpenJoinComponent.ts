import {
  Component
} from '@angular/core';
import {
  MatDialog
} from '@angular/material';
import {
  Router
} from '@angular/router';

const peersviewBrand = require('../../../../../assets/images/peersview-brand.png');

@Component({
  selector: 'app-open-join',
  templateUrl: '../templates/open-join.html',
})
export class OpenJoinComponent {
  constructor (private dialog: MatDialog, private router: Router) {}

  protected cancel (): void {
    this.dialog.closeAll();
  }

  protected ok (): void {
    this.router.navigate(['/community/feed']).then(resp => {
      this.dialog.closeAll();
    });
  }
}
