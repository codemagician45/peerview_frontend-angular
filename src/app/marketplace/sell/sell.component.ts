import {
  Component,
  OnInit
} from '@angular/core';
import {
  CommunityService
} from '../../../services/services';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {
  constructor (
    private communityService: CommunityService,
    private router: Router
  ) {}

  private item = {};

  public ngOnInit (): void {
    if ($(window).width() > 1025) {
      const $sticky = $('.sticky');
      $sticky.css({ position: 'fixed', top: '86px' });
    }
  }

  protected onsubmit (): void {
    this.communityService.createsellerad(1, this.item)
    .subscribe((response: any) => {
      this.item = {};
      this.router.navigate(['marketplace']);
    }, error => {
      console.log(error);
    });
  }
}
