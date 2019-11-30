import {
  Component
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobApiService } from '../../services/api';
import { JobModel } from '../shared/models';

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
  }

  protected jobs: JobModel[] = [];

  private getJobs (): void {
    this.jobApiService.promiseGetJobs()
      .then((jobs: JobModel[]) => {
        this.jobs = jobs;
      });
  }
}
