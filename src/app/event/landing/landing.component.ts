import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  CourseService
} from '../../../services/services';
import * as $ from 'jquery';
import * as _ from 'lodash';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  constructor (
    public router: Router,
    private _courseservice: CourseService
  ) {}

  protected canadiancities: any[] = [];
  protected expanded: false;

  public ngOnInit (): void {
    if ($(window).width() > 1025) {
      const $sticky = $('.sticky');
      $sticky.css({ position: 'fixed', top: '66px' });
    }

    this._courseservice.getCountryCities()
    .subscribe((response: any) => {
      this.canadiancities = _.orderBy(response['cities'], ['name'], ['asc']);
    });
  }

  protected moreCities (): void {
    const txt = $('.more-city').is(':visible') ? 'View More Cities' : 'Hide Cities';
    $('.cities-btn').text(txt);
    $('.more-city').toggle();
  }

  protected toEvent (id: number): void {
    this.router.navigateByUrl(`/events/home?id=${id}`);
  }
}
