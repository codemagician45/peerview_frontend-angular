import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-freshers-home',
  templateUrl: './freshers-home.component.html',
  styleUrls: ['./freshers-home.component.scss']
})
export class FreshersHomeComponent implements OnInit {
  constructor () {}

  public ngOnInit (): void {
    if ($(window).width() > 1025) {
      const $sticky = $('.sticky');
      $sticky.css({ position: 'fixed', top: '86px' });
    }
  }
}
