import {
  Component
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'leisure-component',
  templateUrl: './leisure.component.html',
  styleUrls: ['./leisure.component.scss']
})
export class LeisureComponent {
  constructor (
    private router: Router
  ) {}

  protected jobTitle: string = '';
  protected region: string = '';

  protected searchJobs (): Promise<boolean> {
    return this.router.navigate([`/jobs-search-result`], { queryParams: { q: this.jobTitle, region: this.region } });
  }
}
