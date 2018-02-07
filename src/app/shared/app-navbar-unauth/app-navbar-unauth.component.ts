import {
  Component,
  Input,
  OnInit,
  Output
} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar-unauth',
  templateUrl: './app-navbar-unauth.component.html',
  styleUrls: ['./app-navbar-unauth.component.scss']
})
export class AppNavBarUnauthComponent implements OnInit {
  constructor () {}

  @Input() protected page: string;

  public ngOnInit (): void {
    $('body')
      .removeClass('_bg_gray')
      .addClass('_bg_white');
  }
}
