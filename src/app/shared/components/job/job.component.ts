import {
  Component, EventEmitter,
  Input, Output,
  SimpleChanges
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig
} from '@angular/material';
import {
  Overlay
} from '@angular/cdk/overlay';
import {
  JobModel,
  UserModel
} from '../../models';
import {
  JobApiService,
  CampusApiService,
  UserApiService
} from '../../../../services/api';
import {
  JobEmitter
} from '../../emitter';
import {
  CryptoUtilities
} from '../../../shared/utilities';
import {
  UserService,
} from '../../../../services';
import {
  SharedImagePreviewComponent,
} from '../../modals';

@Component({
  selector: 'shared-job-component',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class SharedJobComponent {
  constructor (
    private jobApiService: JobApiService,
    private campusApiService: CampusApiService,
    private userApiService: UserApiService,
    private router: Router,
    private dialog: MatDialog,
    private overlay: Overlay
  ) {}

  @Input() protected jobs: Array<JobModel> = [];
  @Input() protected route: {
    name: string,
    campusId?: number,
    campusFreshersFeedId?: number,
    campusCourseFeedId?: number,
    campusClassId?: number,
    userId?: number
  } = {name: 'home'};
  @Input() protected user: UserModel;
  @Output() protected loadRecord = new EventEmitter();
  protected btnLoadMoreText = 'Load More';
  protected notJobMessage: string = 'No Job Yet. Be the one to Job';
  private dialogRef: MatDialogRef<SharedImagePreviewComponent>;
  private limit = 5;
  private offset = 0;
  protected userJustVoted: boolean = false;
  protected isLoadingMoreJobs: boolean = false;

  public ngOnInit (): void {
    // this.jobSavedSubcribers();
  }

  public ngOnChanges (changes: SimpleChanges): void {
    if (this.jobs.length === 0 && changes.jobs.previousValue) {
      this.notJobMessage = 'No Job Yet. Be the one to Job';
    }
  }

  private jobSavedSubcribers (): void {
    JobEmitter.jobSave()
      .subscribe((job: JobModel) => {
        this.jobs.unshift(job);
      });
  }

  protected onClickUserProfile (user): Promise<boolean> {
    let userId = CryptoUtilities.cipher(user.id);
    let currentLoginUser = UserService.getUser();

    if (user.id === currentLoginUser.id) {
      return this.router.navigate([`/profile`]);
    }

    return this.router.navigate([`/profile/${userId}`]);
  }

  protected onDeleteJob (jobId: number): void {
    // delete here the job
    this.jobApiService.promiseRemoveJob(jobId)
      .then(() => {
        let index = this.jobs.findIndex(filter => filter.id === jobId);
        this.jobs.splice(index, 1);
      })
      .catch(() => {});
  }

  protected onLoadMoreJob (): void {
    this.isLoadingMoreJobs = true;
    this.offset = this.jobs.length;
    let campusId: any;

    this.jobApiService.promiseGetAllJobs(this.limit, this.offset)
      .then((jobs: JobModel[]) => {
        this.jobs = this.jobs.concat(jobs);
        // this.checkIfThereAreStillJobAvailable(jobs);
        this.isLoadingMoreJobs = false;
      });
  }

  protected onClickPhoto (jobAttachments, imageIndex): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'image-preview-modal';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = { images: jobAttachments, clickIndex: imageIndex, source: 'job' };
    this.dialogRef = this.dialog.open(SharedImagePreviewComponent, dialogConfig);
  }

  protected getPollPercentage (pollOptions): any {
    pollOptions.map(optionData => {
      optionData.sum = parseFloat(optionData.sum) + 1;
      optionData.average = (optionData.count / optionData.sum) * 100;
      optionData.average = optionData.average.toFixed(2);

      return optionData;
    });
  }

  private checkIfThereAreStillJobAvailable (jobs: JobModel[]): void {
    if (jobs.length === 0) {
      this.btnLoadMoreText = 'No More Jobs To Show';
    }
  }

  protected trimStory (message, maxCharacters): string {
    let trimmedString = message.substr(0, maxCharacters);
    return trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))) + '...';
  }

  public ngOnDestroy (): void {
    JobEmitter.removeSubscriber(JobEmitter.getJobSaveName());
    JobEmitter.removeSubscriber(JobEmitter.getJobSaveName());
  }
  protected loadJob (): void {
    this.loadRecord.emit();
  }

  protected updateJob (data: any): void {
    console.log(data);
    // let index = this.jobs.indexOf(data.originJob);
    for (let i = 0; i < this.jobs.length; i ++) {
      if (this.jobs[i].id === data.updatedJob.id) {
        this.jobs[i] = data.updatedJob;
      }
    }
    // this.jobs[index] = data.updatedJob;
  }
}
