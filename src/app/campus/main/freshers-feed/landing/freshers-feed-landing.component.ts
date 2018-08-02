import {
  Component
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  Params
} from '@angular/router';
import {
  CampusApiService
} from '../../../../../services/api';
import {
  CryptoUtilities
} from '../../../../shared/utilities';

@Component({
  selector: 'campus-freshers-feed-landing-component',
  templateUrl: './freshers-feed-landing.component.html',
  styleUrls: ['./freshers-feed-landing.component.scss']
})
export class CampusFreshersFeedLandingComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private campusApiService: CampusApiService
  ) {}

  protected idParams: number;
  protected freshersFeed: Array<any> = [];

  public ngOnInit (): void {
    console.log(this.route);
    this.route.parent.parent.params.subscribe((params: Params) => {
      this.idParams = params.id;

      this.getAllFreshersFeed();
    });
  }

  private getAllFreshersFeed (): void {
    this.idParams = parseInt(CryptoUtilities.decipher(this.idParams), 10);
    this.campusApiService.getAllFreshersFeed(this.idParams)
      .then((response: any) => {
        this.freshersFeed = response.campusFreshersFeed;
      })
      .catch((error) => {

      });
  }

  protected onClickNavigate (freshersFeedId): void {
    // this.campusApiService
    const encryptedFreshersFeedId = CryptoUtilities.cipher(freshersFeedId);
    this.router.navigate([`../${encryptedFreshersFeedId}`], {relativeTo: this.route});
  }
}
