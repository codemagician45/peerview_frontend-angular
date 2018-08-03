import {
  Component
} from '@angular/core';
import {
  ActivatedRoute,
  Params
} from '@angular/router';
import {
  CampusApiService
} from '../../../../../services/api/campus.api.service';
import {
  CryptoUtilities
} from '../../../../shared/utilities';

@Component({
  selector: 'campus-freshers-feed-main-component',
  templateUrl: './freshers-feed-main.component.html',
  styleUrls: ['./freshers-feed-main.component.scss']
})
export class CampusFreshersFeedMainComponent {
  constructor (
    private route: ActivatedRoute,
    private campusApiService: CampusApiService
  ) {}

  protected campusId: number;
  protected freshersFeedId: number;
  protected freshersFeed: Array<any> = [];

  public ngOnInit (): void {
    this.route.parent.parent.params.subscribe((params: Params) => {
      this.campusId = params.id;
    });

    this.route.params.subscribe((params: Params) => {
      this.freshersFeedId = params.id;
    });
  }
}
