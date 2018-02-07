import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MAT_DIALOG_DATA
} from '@angular/material';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.scss']
})
export class ShowImageComponent implements OnInit {
  constructor (
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {}

  public ngOnInit (): void {}

  protected accountPage (): void {
    this.router.navigate(['account-settings']);
  }
}
