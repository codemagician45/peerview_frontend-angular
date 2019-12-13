import {
  Component
} from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { JobApiService } from '../../services/api';
import { JobModel, UserModel } from '../shared/models';
import { UserService } from '../../services';
import { CryptoUtilities } from '../shared/utilities';

@Component({
  selector: 'job-detail-component',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private jobApiService: JobApiService
  ) {
    this.user = UserService.getUser();
    const jobId = parseFloat(CryptoUtilities.decipher(route.snapshot.params.id));
    this.getJob(jobId);
  }

  protected job: JobModel;
  protected user: UserModel = UserService.getUser();

  public ngOnInit (): void {}

  private getJob (id: number): void {
    this.jobApiService.promiseGetJob(id)
      .then((job: JobModel) => {
        this.job = job;
      });
  }

  public ngOnDestroy (): void {}
}
