import {
  Component
} from '@angular/core';
import { JobApiService } from '../../services/api';
import { JobModel } from '../shared/models';

@Component({
  selector: 'compose-job-component',
  templateUrl: './compose-job.component.html',
  styleUrls: ['./compose-job.component.scss']
})
export class ComposeJobComponent {
  constructor (
    private jobApiService: JobApiService,
  ) {}

  private form: JobModel = new JobModel;

  protected onSave (isValid: boolean): void {
    if (!isValid) {
      return;
    }

    this.jobApiService.promisePostJob(this.form)
      .then((res) => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
