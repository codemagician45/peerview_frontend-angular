import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  JobApiService
} from '../../../../services/api';
import {
  UserService
} from '../../../../services';
import {
  UserModel,
  JobModel
} from '../../../shared/models';
import { Overlay } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'profile-content-jobs-component',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class ProfileContentJobsComponent implements OnInit {
  constructor (
    private jobApiService: JobApiService,
    private overlay: Overlay,
    private route: ActivatedRoute
  ) { }

  @Input() protected user: UserModel;
  protected jobs: JobModel[] = [];
  protected isUserProfile: boolean = true;
  private otherUserSubscriber: Subscription;
  private routeSubscriber: any;

  public ngOnInit (): void {
    let currentLoginUser = UserService.getUser();
    this.getUserJobs();

    this.otherUserSubscriber = UserService.getOtherUserSubject().subscribe((user: UserModel) => {
      this.user = user;
      this.getUserJobs();
      this.isUserProfile = false;
    });

    if (currentLoginUser.id !== this.user.id) {
      this.isUserProfile = false;
    } else {
      this.isUserProfile = true;
    }
  }

  private getUserJobs (): void {
    this.jobApiService.promiseGetUserJobs(this.user.id, 10, 0)
      .then((jobs: JobModel[]) => {
        this.jobs = jobs;
      })
      .catch(error => {});
  }

  public ngOnDestroy (): void {
    this.otherUserSubscriber.unsubscribe();
  }
}

