import {
  Component,
  OnInit
} from '@angular/core';
import {
  MarketPlaceService
} from '../../../services/services';
import * as $ from 'jquery';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  constructor (private marketPlaceService: MarketPlaceService) {}

  protected marketplaceitems: any[] = [];

  public ngOnInit (): void {
    if ($(window).width() > 1025) {
      const $sticky = $('.sticky');
      $sticky.css({ position: 'fixed', top: '86px' });
    }

    this.marketPlaceService.getmarketplace(1).subscribe((response: any) => {
      this.marketplaceitems = response.campusMarketplace;
    }, error => {
      console.log(error);
    });
  }
}
