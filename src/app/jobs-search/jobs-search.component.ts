import {
  Component
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobApiService } from '../../services/api';
import { JobModel, UserModel } from '../shared/models';
import { UserService } from '../../services';

@Component({
  selector: 'jobs-search-component',
  templateUrl: './jobs-search.component.html',
  styleUrls: ['./jobs-search.component.scss']
})
export class JobsSearchComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private jobApiService: JobApiService
  ) {
    this.getJobs();
    this.user = UserService.getUser();
  }

  protected jobs: JobModel[] = [];
  protected user: UserModel = UserService.getUser();

  private getJobs (): void {
    this.jobApiService.promiseGetJobs()
      .then((jobs: JobModel[]) => {
        this.jobs = jobs;
      });
  }
}
